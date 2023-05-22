import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { IError } from '../types/appType';

class IsValidId{
  public isValidIdHandler = (req:Request, _res:Response, next:NextFunction) => {
    const { idParam } = req.params;
    if (!isValidObjectId(idParam)) {
      const error:IError = new Error(`${idParam} is not correct`);
      error.status = 400;
      next(error);
    }
    next();
  };
}

const isValidId = new IsValidId().isValidIdHandler;
export default isValidId;
