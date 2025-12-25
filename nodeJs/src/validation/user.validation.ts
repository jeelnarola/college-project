import Joi from "joi";

export const getUserValidation = Joi.object({
  params: Joi.object({
    userId: Joi.string().required(),
  }),
});
