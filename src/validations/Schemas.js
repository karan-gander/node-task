import Joi from "joi";

export const taskSchema = Joi.object({
  title: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().optional(),
  category: Joi.string().trim().min(2).max(50).messages({
    "string.empty": "Category is required",
  }),
  status: Joi.string().trim().required().messages({
    "any.required": "Status is required",
    "string.empty": "Status cannot be empty",
  }),

  dueDate: Joi.date().optional(),
});

export const userValidationSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),

  fullName: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Full name is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

export const updateSchema = Joi.object({
  title: Joi.string().trim().min(2).max(50).messages({
    "string.empty": "Title is required",
  }),
  task_id: Joi.string().required().messages({
    "string.empty": "Task Id required",
  }),
  description: Joi.string().optional(),
  status: Joi.string().trim().messages({
    "any.required": "Status is required",
    "string.empty": "Status cannot be empty",
  }),
});
