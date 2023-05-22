import jwt from "jsonwebtoken";
import { User } from "../models";
import { RequestError } from "../helpers";
import {  Response, NextFunction,RequestHandler } from "express";
import {  IJwtPayload, IUserAuthRequest, IUserSchema } from "../types/appType";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";


class AuthToken{
  private SECRET_KEY_ACCESS:string;

  constructor(){
    this.SECRET_KEY_ACCESS = process.env.SECRET_KEY_ACCESS || '';
  }

   authTokenHandler:RequestHandler<ParamsDictionary, IUserAuthRequest | undefined, undefined, ParsedQs> = async (req, _res:Response, next:NextFunction)=> {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
  
    try {
      if (bearer != "Bearer") {
        throw new RequestError(401, "Not authorized");
      }
      const { id } = jwt.verify(token, this.SECRET_KEY_ACCESS) as IJwtPayload;
  
      const user:IUserSchema | null = await User.findById(id);
  
      if (!user) {
        throw new RequestError(401, "Not authorized");
      }
      if (!user.accessToken) {
        throw new RequestError(401, "Token expired");
      }
      (req as IUserAuthRequest).user = user || null;
      next();
    } catch (error) {
      if (
        error.message === "invalid signature" ||
        error.message === "invalid token"
      ) {
        error.status = 401;
      }
      //accessToken expired
      if (error.message === "jwt expired") {
        (error.status = 412), (error.message = "Your token expired");
      }
    }
  };
}
const authToken = new AuthToken().authTokenHandler;

export default authToken;


