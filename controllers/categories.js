const { Category } = require("../models/category");
const { HttpError, ctrlWrapper } = require("../helpers");
const cloudinary = require("cloudinary").v2;

const addCategory = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "files",
    resource_type: "image",
    public_id: req.file.originalname,
  });
  const categoryUrl = result.secure_url;

  const category = await Category.create({
    url: categoryUrl,
    name: req.body.name,
  });

  res.status(201).json(category);
};

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

module.exports = {
  addCategory: ctrlWrapper(addCategory),
  getAllCategories: ctrlWrapper(getAllCategories),
};
