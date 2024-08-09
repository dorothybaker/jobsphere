import { Router } from "express";
import { protectRoute } from "../utils/protectRoute.js";
import {
  createJob,
  getAllJob,
  getAllJobs,
} from "../controllers/job.controller.js";

const jobRouter = Router();

jobRouter.get("/", getAllJobs);

jobRouter.get("/:id", getAllJob);

jobRouter.post("/create/:company", protectRoute, createJob);

export default jobRouter;
