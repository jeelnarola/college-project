import express from "express";
import userController from "../controllers/user/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

const route = express.Router();

route.get("/profile", auth, userController.userProfile);

route.patch("/change-password", auth, userController.changePassword);


export default route;
