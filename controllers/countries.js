const { Country } = require("../models/country");
const { HttpError, ctrlWrapper } = require("../helpers");
const cloudinary = require("cloudinary").v2;

const addCountry = async (req, res) => {
  let countryUrl;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "files",
      resource_type: "image",
      public_id: req.file.originalname,
    });
    countryUrl = result.secure_url;
  }

  const country = await Country.create({
    ...req.body,
    url: countryUrl || null,
  });

  res.status(201).json(country);
};

const getAllCountries = async (req, res) => {
  const countries = await Country.find();
  res.status(201).json(countries);
};

module.exports = {
  addCountry: ctrlWrapper(addCountry),
  getAllCountries: ctrlWrapper(getAllCountries),
};
