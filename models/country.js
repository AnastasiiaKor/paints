const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");
const Joi = require("joi");

const countrySchema = new Schema(
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
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
      },
    ],
  },
  { versionKey: false, timestamps: false }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
});

// const updateSchema = Joi.object({
//   title: Joi.string().required(),
//   description: Joi.string().required(),
//   deadline: Joi.string().required(),
//   priority: Joi.string().valid("low", "medium", "high", "none").required(),
//   column: Joi.string()
//     .regex(/^[0-9a-fA-F]{24}$/)
//     .required(),
// });

const addCategorySchema = Joi.object({
  categoryId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const Schemas = {
  addSchema,
  addCategorySchema,
};

countrySchema.post("save", HandleMongooseError);

const Country = model("country", countrySchema);

module.exports = { Country, Schemas };
