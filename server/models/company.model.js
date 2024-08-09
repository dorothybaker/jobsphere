import { model, Schema } from "mongoose";

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Company = model("Company", companySchema);

export default Company;
