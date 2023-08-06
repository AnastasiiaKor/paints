const { Color } = require("../models/color");
const { HttpError, ctrlWrapper } = require("../helpers");
const cloudinary = require("cloudinary").v2;

const addColor = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "files",
    resource_type: "image",
    public_id: req.file.originalname,
  });
  const colorUrl = result.secure_url;

  const color = await Color.create({
    url: colorUrl,
    name: req.body.name,
  });

  res.status(201).json(color);
};

const getAllColors = async (req, res) => {
  const colors = await Color.find();
  res.status(200).json(colors);
};

const deleteColor = async (req, res) => {
  const { colorId } = req.params;
  const result = await Color.findByIdAndDelete(colorId);
  if (!result) {
    throw HttpError(404, "Color not found");
  }

  res.status(200).json({ message: "Color deleted" });
};

const updateColor = async (req, res) => {
  const { colorId } = req.params;
  const color = await Color.findById(colorId);
  if (!color) {
    throw HttpError(404, "Color not found");
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
  const updatedColor = await Color.findByIdAndUpdate(
    colorId,
    {
      name: name || color.name,
      url: newUrl || color.url,
    },
    { new: true }
  );

  res.status(200).json(updatedColor);
};

const getById = async (req, res) => {
  const { colorId } = req.params;
  const color = await Color.findById(colorId);
  if (!color) {
    throw HttpError(404, "Color not found");
  }

  res.status(200).json(color);
};

module.exports = {
  addColor: ctrlWrapper(addColor),
  getAllColors: ctrlWrapper(getAllColors),
  getById: ctrlWrapper(getById),
  deleteColor: ctrlWrapper(deleteColor),
  updateColor: ctrlWrapper(updateColor),
};
