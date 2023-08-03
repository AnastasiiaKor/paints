const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");
const Joi = require("joi");

const adminSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

const updateSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8).max(64),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
};

adminSchema.post("save", HandleMongooseError);

const Admin = model("admin", adminSchema);

module.exports = { Admin, schemas };
