import User from "../../models/user.model.js";
import ApiError from "../../utils/apiError.js";

const getUserProfile = async (userId: string) => {
 
    try {
        return await User.findById(userId).select("-password");
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch user profile");
    }
}

const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "User not found");
        }

        const isPasswordValid = await user.comparePassword(oldPassword);
        if (!isPasswordValid) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Invalid old password");
        }

        user.password = newPassword;
        await user.save();

        return user;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to change password");
    }
}

export default {
    getUserProfile,
    changePassword
};