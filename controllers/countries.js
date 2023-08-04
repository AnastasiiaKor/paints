const { Country } = require("../models/country");
const { Category } = require("../models/category");
const { HttpError, ctrlWrapper } = require("../helpers");
const cloudinary = require("cloudinary").v2;

const addCountry = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "files",
    resource_type: "image",
    public_id: req.file.originalname,
  });
  const countryUrl = result.secure_url;

  const country = await Country.create({
    url: countryUrl,
    name: req.body.name,
  });

  res.status(201).json(country);
};

const getAllCountries = async (req, res) => {
  const countries = await Country.find().populate("categories");
  res.status(201).json(countries);
};

const addCategory = async (req, res) => {
  const { countryId } = req.params;
  const { categoryId } = req.body;
  const country = await Country.findById(countryId).populate("categories");
  const category = await Category.findById(categoryId);
  if (!country || !category) {
    throw HttpError(404, "Not found");
  }
  const result = country.categories.find(
    (category) => category.id === categoryId
  );
  if (result) {
    throw HttpError(400, "Category is already added");
  }
  country.categories.push(category);
  await country.save();

  res.status(200).json(country);
};

module.exports = {
  addCountry: ctrlWrapper(addCountry),
  getAllCountries: ctrlWrapper(getAllCountries),
  addCategory: ctrlWrapper(addCategory),
};
