const Joi = require("joi")

const registerSchema = Joi.object({
  // name : Joi.string(),
  pseudo: Joi.string(),
  password: Joi.string(),
  passwordRepeat: Joi.string(),
  email: Joi.string(),
  location: Joi.string().allow(""),
  instruments: Joi.array().default([]),
  description: Joi.string().allow(""),
  avatar: Joi.string().allow(""),
  role_id: Joi.number()
})
  .required()
  .min(6);

const updateUser = Joi.object({
  // name: Joi.string(),
  pseudo: Joi.string(),
  password: Joi.string().min(8),
  email: Joi.string(),
  location: Joi.string(),
  instruments: Joi.array(),
  description: Joi.string().allow(""),
  avatar: Joi.string(),
  role_id: Joi.number()
})
  .required()
  .min(1)

  const isntrumentSchema = Joi.object({
    instrument_id: Joi.number(),
    name: Joi.string(),
  })
    .required()
    .min(1);
const createAnnouncementSchema = Joi.object({
  user_id: Joi.number(),
  user_type: Joi.number(),
  research_type: Joi.number(),
  title: Joi.string(),
  styles: Joi.array(),
  instruments: Joi.array().allow(null),
  description: Joi.string().allow(""),
})
  .required()
  .min(4);

const updateAnnouncementSchema = Joi.object({
  user_id: Joi.number(),
  user_type: Joi.number(),
  research_type: Joi.number(),
  title: Joi.string(),
  styles: Joi.array(),
  instruments: Joi.array(),
  description: Joi.string().allow(""),
})
  .required()
  .min(1)
  .max(5);


const typeSchema = Joi.object({
  name: Joi.string(),
})
  .required()
  .min(1);

const roleSchema = Joi.object({
  name: Joi.string(),
})
  .required()
  .min(1);


const createStyleSchema = Joi.object({
  name: Joi.string(),
  image: Joi.string()
})
  .required()
  .min(2);

const updateStyleSchema = Joi.object({
  name: Joi.string(),
  image: Joi.string()
})
  .required()
  .min(1)
  .max(2);


module.exports = {
  registerSchema,
  updateUser,
  roleSchema,
  typeSchema,
  isntrumentSchema,
  createStyleSchema,
  updateStyleSchema,
  createAnnouncementSchema,
  updateAnnouncementSchema
};