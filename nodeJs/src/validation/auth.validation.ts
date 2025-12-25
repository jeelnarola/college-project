import Joi from "joi";

export const loginValidation = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const changePasswordValidation = Joi.object({
  body: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  }),
});

export const resetPasswordMailValidation = Joi.object({
  body : Joi.object({
    email: Joi.string().required().trim()
  })
})

export const optMatchValidation = Joi.object({
  body : Joi.object({
    email: Joi.string().required(),
    otp: Joi.number().required()
  })
})

export const resetPasswordValidation = Joi.object({
  body: Joi.object({
    email: Joi.string().required(),
    newPassword: Joi.number().required().min(6),
    confirmPassword: Joi.number().required().min(6),
  })
})
