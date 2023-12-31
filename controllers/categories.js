const { Category } = require("../models/category");
const { Product } = require("../models/product");
const { HttpError, ctrlWrapper } = require("../helpers");

const addCategory = async (req, res) => {
  const category = await Category.create({
    url: req.file.path,
    name: req.body.name,
  });

  res.status(201).json(category);
};

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  const result = await Category.findByIdAndDelete(categoryId);
  if (!result) {
    throw HttpError(404, "Category not found");
  } else {
    await Product.deleteMany({ category: categoryId });
  }

  res.status(200).json({ message: "Category deleted" });
};

const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category) {
    throw HttpError(404, "Category not found");
  }
  const { name } = req.body;
  let newUrl;
  if (req.file) {
    newUrl = req.file.path;
  }
  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    {
      name: name || category.name,
      url: newUrl || category.url,
    },
    { new: true }
  );

  res.status(200).json(updatedCategory);
};

const getById = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category) {
    throw HttpError(404, "Category not found");
  }

  res.status(200).json(category);
};

module.exports = {
  addCategory: ctrlWrapper(addCategory),
  getAllCategories: ctrlWrapper(getAllCategories),
  getById: ctrlWrapper(getById),
  deleteCategory: ctrlWrapper(deleteCategory),
  updateCategory: ctrlWrapper(updateCategory),
};
