import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../contollers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser);

export default userRouter;