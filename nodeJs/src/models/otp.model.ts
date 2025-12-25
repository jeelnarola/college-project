import mongoose, { Document } from "mongoose";

export interface IOtp extends Document{
    email?:string,
    otp:number,
    expiresAt: Date;
  createdAt: Date;
}

const otpSchema = new mongoose.Schema<IOtp>(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    otp: {
      type: Number,
      required: true
    },

    expiresAt: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const OTP = mongoose.model<IOtp>('OTP',otpSchema)

export default OTP
