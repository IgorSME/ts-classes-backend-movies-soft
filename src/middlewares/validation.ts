import { Request, Response, NextFunction } from 'express';
import { Schema} from 'joi';
import { IValidationError, TValidation } from '../types/appType';

class Validation{
  public validationHandler = (schema:Schema):TValidation => {
    return (req:Request, _res:Response, next:NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        const validationError = error as IValidationError;
        validationError.status = 400;
        next(validationError);
        return;
      }
      next();
    };
  };
}

const validation = new Validation().validationHandler;
export default validation;
