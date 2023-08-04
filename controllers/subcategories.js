const { Subcategory } = require("../models/subcategory");
const { HttpError, ctrlWrapper } = require("../helpers");
const cloudinary = require("cloudinary").v2;

const addSubcategory = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "files",
    resource_type: "image",
    public_id: req.file.originalname,
  });
  const subcategoryUrl = result.secure_url;

  const subcategory = await Subcategory.create({
    url: subcategoryUrl,
    name: req.body.name,
  });

  res.status(201).json(subcategory);
};

const getAllSubcategories = async (req, res) => {
  const subcategories = await Subcategory.find();
  res.status(200).json(categories);
};

module.exports = {
  addSubcategory: ctrlWrapper(addSubcategory),
  getAllSubcategories: ctrlWrapper(getAllSubcategories),
};
