import { Request, Response, NextFunction } from 'express';
import Joi from 'joi'

exports.validationSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
      _id: Joi.string().alphanum(),
      fullName: Joi.string().alphanum().min(3).max(25).trim(true).required(),
      phone: Joi.string().required(),
      email: Joi.string().email().trim(true).required(),
      activo: Joi.bool().default(false)
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
      next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
  } else {
      req.body = value;
      next();
  }
}
