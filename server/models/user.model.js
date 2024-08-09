import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // savedJobs: { type: Schema.Types.ObjectId, ref: "Job" },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
