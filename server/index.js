import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";

import { connectToDB } from "./utils/connectToDB.js";
import authRouter from "./routes/auth.route.js";
import companyRouter from "./routes/company.route.js";
import imagekitRouter from "./routes/imagekit.route.js";
import jobRouter from "./routes/job.route.js";

config();

const app = express();
const port = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/companies", companyRouter);
app.use("/api/imagekit", imagekitRouter);
app.use("/api/jobs", jobRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  connectToDB();
  console.log(`Server running on port ${port}`);
});
