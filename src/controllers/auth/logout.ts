import {  Response } from 'express';
import { User } from '../../models';
import { IUserAuthRequest } from '../../types/appType';

class Logout{
  logoutHandler = async (req:IUserAuthRequest, res:Response):Promise<void> => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });
    res.status(204).send();
  };
}
const logout = new Logout().logoutHandler;

export default logout;
