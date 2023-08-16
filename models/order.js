const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");
const Joi = require("joi");

const productSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const quantitySchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
});

const buyerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    products: [productSchema],
    quantity: [quantitySchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    buyer: buyerSchema,
    done: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: false }
);

const joiProductSchema = Joi.object({
  brand: Joi.string().required(),
  date: Joi.string().required(),
  productId: Joi.string().required(),
  price: Joi.number().required(),
  name: Joi.string().required(),
  color: Joi.string().required(),
});

const joiQuantitySchema = Joi.object({
  productId: Joi.string().required(),
  productQuantity: Joi.number().required(),
});

const joiBuyerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
});

const addOrderSchema = Joi.object({
  products: Joi.array().items(joiProductSchema).required(),
  quantity: Joi.array().items(joiQuantitySchema).required(),
  totalPrice: Joi.number().required(),
  buyer: joiBuyerSchema.required(),
});

const statusSchema = Joi.object({
  done: Joi.boolean().required(),
});

const Schemas = {
  addOrderSchema,
  statusSchema,
};

orderSchema.post("save", HandleMongooseError);

const Order = model("order", orderSchema);

module.exports = { Order, Schemas };
