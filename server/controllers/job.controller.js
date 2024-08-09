import Job from "../models/job.model.js";

export const createJob = async (req, res) => {
  const { company } = req.params;
  const userId = req.user._id;

  try {
    const newJob = new Job({ owner: userId, companyId: company, ...req.body });

    if (newJob) {
      await newJob.save();

      res.status(201).json("New job created successfully!");
    } else {
      res.status(400).json("Invalid job data entered!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("companyId")
      .populate({ path: "owner", select: "-password" })
      .sort({ createdAt: -1 });

    if (jobs) {
      res.status(200).json(jobs);
    } else {
      res.status(400).json("Error while fetching jobs!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getAllJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id)
      .populate("companyId")
      .populate({ path: "owner", select: "-password" })
      .sort({ createdAt: -1 });

    if (job) {
      res.status(200).json(job);
    } else {
      res.status(400).json("Error while fetching jobs!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};
