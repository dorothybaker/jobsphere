import { Router } from "express";
import { protectRoute } from "../utils/protectRoute.js";
import { getTokenForImageKit } from "../controllers/imagekit.controller.js";

const imagekitRouter = Router();

imagekitRouter.get("/", protectRoute, getTokenForImageKit);

export default imagekitRouter;
