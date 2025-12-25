import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../utils/apiError.js";
import userService from "../../service/user/user.service.js";
const userProfile = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if(!userId) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }

    const userProfile = await userService.getUserProfile(userId); // Assume this function fetches user profile from DB
    res.status(httpStatus.OK).json({
        id: userId,
        message: "User profile fetched successfully"
    });
};


const changePassword = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if(!userId) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }

    // Logic to change password goes here
    const { oldPassword, newPassword } = req.body;

    await userService.changePassword(userId, oldPassword, newPassword);
    // Implement password change logic here
    res.status(httpStatus.OK).json({
        message: "Password changed successfully"
    });
}

export default {
    userProfile,
    changePassword
};