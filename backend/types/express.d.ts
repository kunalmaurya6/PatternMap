import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      // Change 'any' to your actual User interface/type if you have one
      user?: any; 
    }
  }
}
