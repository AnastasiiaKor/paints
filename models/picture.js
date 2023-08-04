const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");
const Joi = require("joi");

const pictureSchema = new Schema(
  {
    url: {
      type: String,
      required: [true, "Url is required"],
    },
    publicId: {
      type: String,
      required: [true, "PublicId is required"],
    },
  },
  { versionKey: false, timestamps: false }
);

pictureSchema.post("save", HandleMongooseError);

const Picture = model("picture", pictureSchema);

module.exports = { Picture };
