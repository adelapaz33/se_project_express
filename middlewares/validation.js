const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "username" field is 2',
      "string.max": 'The maximum length of the "username" field is 30',
      "string.empty": 'The "username" field must be filled in',
    }),
    userAvatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "userAvatar" field must be filled in',
      "string.uri": 'The "userAvatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
itemId: Joi.string().length(24).hex().required(),
  })
})

// router.post(
//   "/posts",
//   celebrate({
//     body: Joi.object().keys({
//       title: Joi.string().required().min(2).max(30),
//       text: Joi.string().required().min(2),
//     }),
//   }),
//   createPost
// );

// router.delete(
//   "/:postId",
//   celebrate({
//     // validate parameters
//     params: Joi.object().keys({
//       postId: Joi.string().alphanum().length(24),
//     }),
//     headers: Joi.object().keys({
//       // validate headers
//     }),
//     query: Joi.object().keys({
//       // validate query
//     }),
//   }),
//   deletePost
// );
