import { Response } from "express";
import { IUserAuthRequest } from "../../types/appType";

class GetCurrent{
  getCurrentHandler = async (req:IUserAuthRequest, res:Response) => {
    const { username, email } = req.user;
  
    res.json({
      user: {
        username,
        email,
      },
    });
  };
}

const getCurrent = new GetCurrent().getCurrentHandler;

export default getCurrent;
