import { model, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    title: { type: String, required: true },
    arrangement: { type: String, required: true },
    fullTime: { type: String, required: true },
    salary: { type: Number, required: true },
    experience: { type: Number, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    companyIcon: { type: String, required: true },
    contactPhoto: { type: String, required: true },
    contactName: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Job = model("Job", jobSchema);

export default Job;
