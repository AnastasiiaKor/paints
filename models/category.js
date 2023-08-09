const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");
const Joi = require("joi");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Already existed"],
    },
    url: {
      type: String,
      required: [true, "Url is required"],
    },
  },
  { versionKey: false, timestamps: false }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
});

const schemas = {
  addSchema,
};

categorySchema.post("save", HandleMongooseError);

const Category = model("category", categorySchema);

module.exports = { Category, schemas };
