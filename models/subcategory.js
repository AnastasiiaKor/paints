const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");
const Joi = require("joi");

const subcategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    url: {
      type: String,
      required: [true, "Url is required"],
    },
    colors: [{ type: Schema.Types.ObjectId, ref: "color" }],
  },
  { versionKey: false, timestamps: false }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
});

const addColorSchema = Joi.object({
  colorId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const schemas = {
  addSchema,
  addColorSchema,
};

subcategorySchema.post("save", HandleMongooseError);

const Subcategory = model("subcategory", subcategorySchema);

module.exports = { Subcategory, schemas };
