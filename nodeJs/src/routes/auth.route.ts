import express from "express";
import authController from "../controllers/auth/auth.controller.js";
const route = express.Router();

route.post("/login", authController.loginUser);



export default route;
