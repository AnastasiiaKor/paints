const { Product } = require("../models/product");
const { Category } = require("../models/category");
const { Subcategory } = require("../models/subcategory");
const { Color } = require("../models/color");
const { HttpError, ctrlWrapper } = require("../helpers");
const cloudinary = require("cloudinary").v2;

const addProduct = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "files",
    resource_type: "image",
    public_id: req.file.originalname,
  });
  const productUrl = result.secure_url;

  const product = await Product.create({ ...req.body, url: productUrl });

  res.status(201).json(product);
};

const getProducts = async (req, res) => {
  const { country, category, subcategory, color } = req.query;
  let result;
  if (!country && !category && !subcategory && !color) {
    result = await Product.find();
  } else if (country && !category && !subcategory && !color) {
    const products = await Product.find({ country });
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category.toString())),
    ];
    const categoryItems = await Category.find({
      _id: { $in: uniqueCategories },
    });
    result = categoryItems;
  } else if (country && category && !subcategory && !color) {
    const products = await Product.find({ country, category });
    const uniqueSubcategories = [
      ...new Set(products.map((product) => product.subcategory.toString())),
    ];
    const subcategoryItems = await Subcategory.find({
      _id: { $in: uniqueSubcategories },
    });
    result = subcategoryItems;
  } else if (country && category && subcategory && !color) {
    const products = await Product.find({ country, category, subcategory });
    const uniqueColors = [
      ...new Set(products.map((product) => product.color.toString())),
    ];
    const colorItems = await Color.find({
      _id: { $in: uniqueColors },
    });
    result = colorItems;
  } else if (country && category && subcategory && color) {
    const products = await Product.find({
      country,
      category,
      subcategory,
      color,
    });
    result = products;
  }
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    throw HttpError(404, "Product not found");
  }
  res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const result = await Product.findByIdAndDelete(productId);
  if (!result) {
    throw HttpError(404, "Product not found");
  }

  res.status(200).json({ message: "Product deleted" });
};

module.exports = {
  addProduct: ctrlWrapper(addProduct),
  getProducts: ctrlWrapper(getProducts),
  getById: ctrlWrapper(getById),
  deleteProduct: ctrlWrapper(deleteProduct),
};
