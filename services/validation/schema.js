const Joi = require("joi")

const registerSchema = Joi.object({
    name : Joi.string(),
    pseudo: Joi.string(),
    password: Joi.string().min(8),
    email: Joi.string(),
    location: Joi.string(),
    description: Joi.string().allow(""),
    avatar: Joi.string(),
    role_id: Joi.number()
  })
    .required()
    .min(8);

const patchUserSchema = Joi.object({
  name: Joi.string(),
  pseudo: Joi.string(),
  password: Joi.string().min(8),
  email: Joi.string(),
  location: Joi.string(),
  description: Joi.string().allow(""),
  avatar: Joi.string(),
  role_id: Joi.number()
})
  .required()
  .min(1)
  .max(8);

  const createAnnouncementSchema = Joi.object({
    user_id : Joi.number(),
    user_type: Joi.number(),
    research_type: Joi.number(),
    title: Joi.string(),
    description: Joi.string().allow(""),
  })
    .required()
    .min(4);

    const updateAnnouncementSchema = Joi.object({
      user_id : Joi.string(),
      user_type: Joi.string(),
      research_type: Joi.string().min(8),
      title: Joi.string(),
      description: Joi.string().allow(""),
    })
      .required()
      .min(1)
      .max(4);

  
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

    const isntrumentSchema = Joi.object({
      name: Joi.string(),
    })
      .required()
      .min(1);

  const createStyleSchema = Joi.object({
    name: Joi.string(),
    image:Joi.string()
  })
    .required()
    .min(2);

    const updateStyleSchema = Joi.object({
      name: Joi.string(),
      image:Joi.string()
    })
      .required()
      .min(1)
      .max(2);

  
module.exports = {
  registerSchema,
  patchUserSchema,
  roleSchema,
  typeSchema,
  isntrumentSchema,
  createStyleSchema,
  updateStyleSchema,
  createAnnouncementSchema,
  updateAnnouncementSchema
  };