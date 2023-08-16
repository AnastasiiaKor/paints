const { Product } = require("../models/product");
const { Category } = require("../models/category");
const { HttpError, ctrlWrapper } = require("../helpers");
const cloudinary = require("cloudinary").v2;

const addProduct = async (req, res) => {
  const file = req.files["file"][0].path;
  const pdf = req.files["pdf"][0].path;

  const product = await Product.create({
    ...req.body,
    url: file,
    pdfUrl: pdf,
  });

  res.status(201).json(product);
};

const getProducts = async (req, res) => {
  const { country, category, color } = req.query;
  let result;
  let query = {};
  if (!country && !category && !color) {
    const products = await Product.find();
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category.toString())),
    ];
    const categoryItems = await Category.find({
      _id: { $in: uniqueCategories },
    });
    result = categoryItems;
  } else if (!country && category && !color) {
    const products = await Product.find({ category }).populate(
      "category",
      "name"
    );
    const uniqueCountries = [
      ...new Set(products.map((product) => product.country)),
    ];
    const uniqueColors = [...new Set(products.map((product) => product.color))];

    result = {
      countries: uniqueCountries,
      colors: uniqueColors,
      products: products,
    };
  } else {
    if (category) {
      query.category = category;
    }
    if (color) {
      query.color = color;
    }
    if (country) {
      query.country = country;
    }

    const products = await Product.find(query).populate("category", "name");

    result = products;
  }

  res.status(200).json(result);
};

const getAll = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    country,
    category,
    color,
    name,
    minPrice,
    maxPrice,
  } = req.query;
  const skip = (page - 1) * limit;

  let query = {};

  if (country) query.country = country;
  if (category) query.category = category;
  if (name) query.name = name;
  if (color) query.color = color;
  if (minPrice && maxPrice) query.price = { $gte: minPrice, $lte: maxPrice };

  const totalProductsCount = await Product.countDocuments(query);
  const products = await Product.find(query)
    .populate("category", "name")
    .skip(parseInt(skip))
    .limit(parseInt(limit));
  const allProducts = await Product.find();
  const uniqueCountries = [
    ...new Set(allProducts.map((product) => product.country)),
  ];
  const uniqueColors = [
    ...new Set(allProducts.map((product) => product.color)),
  ];
  const uniqueCategories = [
    ...new Set(allProducts.map((product) => product.category.toString())),
  ];
  const categoryItems = await Category.find({
    _id: { $in: uniqueCategories },
  });
  res.status(200).json({
    categories: categoryItems,
    countries: uniqueCountries,
    colors: uniqueColors,
    total: totalProductsCount,
    products: products,
  });
};

const getById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId).populate(
    "category",
    "name"
  );
  if (!product) {
    throw HttpError(404, "Product not found");
  }
  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    throw HttpError(404, "Product not found");
  }
  let newUrl;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "files",
      resource_type: "image",
      public_id: req.file.originalname,
    });
    newUrl = result.secure_url;
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      ...(req.body || product),
      url: newUrl || product.url,
    },
    { new: true }
  )
    .populate("category", "name")
    .populate("subcategory", "name")
    .populate("country", "name")
    .populate("color", "name");

  res.status(200).json(updatedProduct);
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
  updateProduct: ctrlWrapper(updateProduct),
  getProducts: ctrlWrapper(getProducts),
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  deleteProduct: ctrlWrapper(deleteProduct),
};
