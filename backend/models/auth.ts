import mongoose,{Schema,model} from "mongoose";

const userScema=new Schema({
    username: {
    type: String,
    required: true, // Validation: item must be present
    trim: true      // Sanitization: cuts off accidental leading/trailing spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,   // Indexes: ensures values are unique in the collection
    lowercase: true // Sanitization: automatically forces lowercase
  },
  password:{
    type:String,
    required:true,
  }
})

export const User=model('User',userScema);