import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import ApiError from "../../utils/apiError.js";
import userService from "../../service/user/user.service.js";
import mailService from "../../utils/mailSend.js";
import User from "../../models/user.model.js";
import OTP from "../../models/otp.model.js";
const userProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const userProfile = await userService.getUserProfile(userId); // Assume this function fetches user profile from DB
  res.status(httpStatus.OK).json({
    id: userId,
    message: "User profile fetched successfully",
  });
};

const changePassword = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  // Logic to change password goes here
  const { oldPassword, newPassword } = req.body;

  await userService.changePassword(userId, oldPassword, newPassword);
  // Implement password change logic here
  res.status(httpStatus.OK).json({
    message: "Password changed successfully",
  });
};

const resetPasswordMail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
  }

  let otp = await userService.generateOtp();

  await OTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
  });

  await mailService.transporter.sendMail({
    from: `"Support Team" <${process.env.SEND_MAIL_USER}>`,
    to: email,
    subject: "Reset Password OTP",
    html: `
      <div style="font-family: Arial, sans-serif; padding:20px;">
    <h2 style="color:#333;">Password Reset Request</h2>
    <p>Your OTP for password reset is:</p>

    <div style="
      font-size: 28px;
      font-weight: bold;
      background: #f4f4f4;
      padding: 12px;
      width: fit-content;
      letter-spacing: 6px;
    ">
      ${otp}
    </div>

    <p>This OTP is valid for <b>5 minutes</b>.</p>
    <p>If you didn’t request this, ignore this email.</p>

    <br/>
    <p>Thanks,<br/>Your App Team</p>
  </div>
      `,
  });
  res.status(httpStatus.OK).json({
    message: "OTP sent to email successfully",
  });
};

const otpMatch = async (req: Request, res: Response) => {
  const { otp, email } = req.body;
  const otpData = await OTP.findOne(email);
  if (!otpData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }
  if (otp !== otpData.otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP Not Match");
  }

  res.status(httpStatus.OK).json({ message: "OTP Match successfully" });
};

const resetPassword = async (req: Request, res: Response) => {
  const { newPassword, confirmPassword, email } = req.body;

  if (newPassword !== confirmPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Passwords do not match");
  }
  let user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  res.status(httpStatus.OK).json({
    message: "Password reset successful",
  });
};

export default {
  userProfile,
  changePassword,
  resetPasswordMail,
  otpMatch,
  resetPassword
};
