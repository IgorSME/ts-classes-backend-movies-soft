
import { Document,Schema } from "mongoose";
import { Request, Response,NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ValidationError } from "joi";

export interface IError extends Error {
    status?: number;
    
  }

 export interface IUserSchema extends Document {
    _id:string,
    username: string;
    email: string;
    password: string;
    accessToken: string | null;
    refreshToken: string | null;
  }
  export interface IMovieSchema extends Document {
    date: Date;
    owner: Schema.Types.ObjectId;
    title: string;
    director: string;
  }

  export interface IUserAuthRequest extends Request {
    user: {
      _id: string,
        email: string,
      username:string
    };
  }

  export interface IJwtPayload extends JwtPayload {
    id: string;
  }
 export interface IValidationError extends ValidationError {
    status?: number;
  }
  export type TValidation = ((req: Request, res: Response, next: NextFunction) => void)
  
  export type ICtrlWrapper = (req: IUserAuthRequest, res: Response, next: NextFunction) => Promise<void>;
  