import express from "express";
import authController from "../controllers/auth/auth.controller.js";
import validate from "../middlewares/validate.js";
import { loginValidation } from "../validation/auth.validation.js";
const route = express.Router();

route.post("/login",validate(loginValidation) ,authController.loginUser);

export default route;