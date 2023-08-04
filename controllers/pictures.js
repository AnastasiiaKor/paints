const { Picture } = require("../models/picture");
const { HttpError, ctrlWrapper } = require("../helpers");
const cloudinary = require("cloudinary").v2;

const addPicture = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "No attached file");
  }
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "pictures",
    resource_type: "image",
    public_id: req.file.originalname,
  });
  const url = result.secure_url;
  const publicId = result.public_id;
  const picture = await Picture.create({ url, publicId });

  res.status(201).json(picture);
};

const deletePicture = async (req, res) => {
  const { pictureId } = req.params;
  const picture = await Picture.findById(pictureId);
  if (!picture) {
    throw HttpError(404, "No picture found");
  }
  const { publicId } = picture;

  await Picture.findByIdAndDelete(pictureId);
  await cloudinary.uploader.destroy(publicId);

  res.status(200).json({ message: "Picture deleted" });
};

const getAllPictures = async (req, res) => {
  const pictures = await Picture.find();
  res.status(201).json(pictures);
};

module.exports = {
  addPicture: ctrlWrapper(addPicture),
  deletePicture: ctrlWrapper(deletePicture),
  getAllPictures: ctrlWrapper(getAllPictures),
};
