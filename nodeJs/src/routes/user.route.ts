import express from "express";
import userController from "../controllers/user/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.js";
import { getUserValidation } from "../validation/user.validation.js";
import { changePasswordValidation, optMatchValidation, resetPasswordMailValidation, resetPasswordValidation } from "../validation/auth.validation.js";

const route = express.Router();

route.get("/profile", auth,validate(getUserValidation), userController.userProfile);

route
    .patch("/change-password", auth, validate(changePasswordValidation), userController.changePassword)
    .patch("/reset-password",validate(resetPasswordValidation))
route
    .post("/reset-passwordmail",validate(resetPasswordMailValidation),userController.resetPasswordMail)
    .post("/otp-match",validate(optMatchValidation),userController.otpMatch)
    




export default route;
