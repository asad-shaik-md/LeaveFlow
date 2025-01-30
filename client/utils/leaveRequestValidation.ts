import Joi from 'joi';

export const errorMessages = {
  "any.base": "This field should be a type of text",
  "date.base": "Please enter a valid date",
  "string.empty": "This field cannot be an empty field",
  "date.empty": "This field cannot be an empty field",
  "any.required": "This field is required",
  "date.greater": "The date must be today or in the future",
  "date.min": "The End Date must be greater than or equals to Start Date",
};

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const schema = Joi.object({
  leaveType: Joi.string().min(2).required().messages(errorMessages),
  startDate: Joi.date()
    .greater(yesterday.toISOString())
    .required()
    .messages(errorMessages),
  endDate: Joi.date()
    .min(Joi.ref('startDate'))
    .required()
    .messages(errorMessages),
  reason: Joi.string().allow(""),
});