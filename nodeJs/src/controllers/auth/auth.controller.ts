import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../utils/apiError.js";
import authService from "../../service/auth/auth.service.js";
import generateToken from "../../utils/generateToken.js";

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email and password are required");
    }

    const user = await authService.getUserByEmail(email);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid password");
    }

    const token = await generateToken(user._id.toString());

    res.status(httpStatus.OK).json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
};

export default {
    loginUser
};
