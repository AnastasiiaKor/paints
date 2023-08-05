const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");
const Joi = require("joi");

const colorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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

colorSchema.post("save", HandleMongooseError);

const Color = model("color", colorSchema);

module.exports = { Color, schemas };
