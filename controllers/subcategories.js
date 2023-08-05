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
  res.status(200).json(subcategories);
};

const getById = async (req, res) => {
  const { subcategoryId } = req.params;
  const subcategory = await Subcategory.findById(subcategoryId);
  if (!subcategory) {
    throw HttpError(404, "Category not found");
  }

  res.status(200).json(subcategory);
};

const deleteSubcategory = async (req, res) => {
  const { subcategoryId } = req.params;
  const result = await Subcategory.findByIdAndDelete(subcategoryId);
  if (!result) {
    throw HttpError(404, "Subcategory not found");
  }

  res.status(200).json({ message: "Subcategory deleted" });
};

const updateSubcategory = async (req, res) => {
  const { subcategoryId } = req.params;
  const subcategory = await Subcategory.findById(subcategoryId);
  if (!subcategory) {
    throw HttpError(404, "Сategory not found");
  }
  const { name } = req.body;
  let newUrl;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "files",
      resource_type: "image",
      public_id: req.file.originalname,
    });
    newUrl = result.secure_url;
  }
  const updatedSubcategory = await Subcategory.findByIdAndUpdate(
    subcategoryId,
    {
      name: name || subcategory.name,
      url: newUrl || subcategory.url,
    },
    { new: true }
  );

  res.status(200).json(updatedSubcategory);
};

module.exports = {
  addSubcategory: ctrlWrapper(addSubcategory),
  getAllSubcategories: ctrlWrapper(getAllSubcategories),
  deleteSubcategory: ctrlWrapper(deleteSubcategory),
  getById: ctrlWrapper(getById),
  updateSubcategory: ctrlWrapper(updateSubcategory),
};
