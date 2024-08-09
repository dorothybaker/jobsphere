import { Router } from "express";
import { protectRoute } from "../utils/protectRoute.js";
import {
  createCompany,
  getUserCompanies,
} from "../controllers/company.contoller.js";

const companyRouter = Router();

companyRouter.get("/companies", protectRoute, getUserCompanies);
companyRouter.post("/create", protectRoute, createCompany);

export default companyRouter;
