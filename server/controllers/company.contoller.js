import Company from "../models/company.model.js";

export const createCompany = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  try {
    const newCompany = new Company({ name, owner: userId });

    if (newCompany) {
      await newCompany.save();

      res.status(201).json("Company created successfully!");
    } else {
      res.status(400).json("Invalid company data entered!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getUserCompanies = async (req, res) => {
  const userId = req.user._id;

  try {
    const companies = await Company.find({ owner: userId }).sort({
      createdAt: -1,
    });

    if (companies) {
      res.status(200).json(companies);
    } else {
      res.status(400).json("Error while fetching user companies");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};
