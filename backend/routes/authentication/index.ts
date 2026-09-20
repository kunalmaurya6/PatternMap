import { User } from "../../models/auth.js";
import secretToken from "./SecretToken.js";
import bcrypt from "bcrypt";
import express from 'express';
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";

const authRoute = express.Router();


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  
  console.log("token",token);
  

  if (!token) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_KEY!
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};


const { APP_URL, GOOGLE_ID, GOOGLE_SECRET, STATE_SECRET } = process.env;

const REDIRECT_URI = `${APP_URL}/api/google/callback`;

const googleClient = new OAuth2Client({
  clientId: GOOGLE_ID!,
  clientSecret: GOOGLE_SECRET!,
  redirectUri: REDIRECT_URI!,
});

authRoute.get("/google-login", (_, res) => {
  console.log("google-login");
  
  const params = new URLSearchParams({
    client_id: GOOGLE_ID!,
    redirect_uri: REDIRECT_URI!,
    response_type: "code",
    scope: "openid email profile",
    prompt: "select_account",
    state: makeState(),
  });

  const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  return res.redirect(GOOGLE_URL);
});

function makeState() {
  const payload = {
    nonce: crypto.randomBytes(16).toString("hex"),
    iat: Date.now(),
  };

  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");

  const sig = crypto
    .createHmac("sha256", STATE_SECRET!)
    .update(encoded)
    .digest("base64url");

  return `${encoded}.${sig}`;
}

authRoute.get("/google/callback", async (req, res, next) => {
  const { code, state } = req.query;

  if (!code || !state) return next(new Error("Missing Google credential"));
  

  const isValid = validateState(state);

  if (!isValid) return next(new Error("Invalid state"));

  try {
    const { tokens } = await googleClient.getToken(String(code));

    if (!tokens.id_token) throw new Error("Error with Google Login`");

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_ID!,
    });

    const payload = ticket.getPayload();

    const { email, name, picture } = payload!;

    console.log("picture",picture);
    

    let user = await User.findOne({email:email!});
    if (!user) {
      user = await User.create({ email:email!, password: "google-login", username:name! });
    }

    const token = secretToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
    });
    
    return res.redirect("http://localhost:5173");
  } catch (error) {
    return next(error);
  }
});

function validateState(state) {
  const [encoded, sig] = state.split(".");

  const expectedSig = crypto
    .createHmac("sha256", STATE_SECRET!)
    .update(encoded)
    .digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
    return false;
  }

  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());

  const FIVE_MINUTES = 5 * 60 * 1000;
  if (Date.now() - payload.iat > FIVE_MINUTES) {
    return false;
  }

  return true;
}

// const buildAuthResponse = (user, token) => ({
//     token,
//     user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         role: isAdminUser(user) ? "admin" : "user",
//     },
// });

authRoute.post('/signup', async (req, res) => {
    try {
        const value=req.body;
        // const { error, value } = userValidationSchema.validate(req.body);
        // if (error) {
        //     return res.status(400).json({
        //         error: error.details.map(err => err.message)
        //     });
        // }
        const { password } = value;
        const email = value.email.trim().toLowerCase();
        const username = value.username.trim();
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({ message: "Email or username already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashPassword, username });
        const token = secretToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
        });
        res
            .status(201)
            .json({ message: "User signed up successfully", success: true, });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message ?? "Signup failed" });
    }
}
);

authRoute.post('/login', async (req, res) => {
    try {
        console.log("login");
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Incorrect password or email' })
        }

        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.status(401).json({ message: 'Incorrect password or email' })
        }
        const token = secretToken(user._id);
        
        console.log("token 1",token);
        
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
        });
        res
            .status(200)
            .json({ message: "User logged in successfully", success: true, });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message ?? "Login failed" });
    }
}
);

authRoute.post('/', (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY!, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await User.findById(data.id)
            if (user) return res.json({ status: true, user: user.username })
            else return res.json({ status: false })
        }
    })
}
);

authRoute.get('/me',authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id)
    .select("-password");
    
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json({
    user,
  });
});

authRoute.post('/logout', (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

export default authRoute;