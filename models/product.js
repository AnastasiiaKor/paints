const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");
const Joi = require("joi");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Already existed"],
    },
    fullName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: [true, "Url is required"],
    },
    pdfUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    packingType: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    chemicalFormula: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: false }
);

const addProductSchema = Joi.object({
  name: Joi.string().required(),
  fullName: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  packingType: Joi.string().required(),
  brand: Joi.string().required(),
  type: Joi.string().required(),
  weight: Joi.number().required(),
  dosage: Joi.string().required(),
  chemicalFormula: Joi.string().required(),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  country: Joi.string().required(),
  color: Joi.string().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string(),
  fullName: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
  packingType: Joi.string(),
  brand: Joi.string(),
  type: Joi.string(),
  weight: Joi.number(),
  dosage: Joi.string(),
  chemicalFormula: Joi.string(),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    ,
  country: Joi.string(),
  color: Joi.string(),
});

const updateStatusSchema=Joi.object({
  inStock: Joi.boolean().required()
});

const schemas = {
  addProductSchema,
  updateProductSchema,
  updateStatusSchema
};

productSchema.post("save", HandleMongooseError);

const Product = model("product", productSchema);

module.exports = { Product, schemas };
