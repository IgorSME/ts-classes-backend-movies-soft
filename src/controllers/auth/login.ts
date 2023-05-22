import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { RequestError, createToken } from "../../helpers";
import { User } from "../../models";
import { IUserSchema } from "../../types/appType";

class Login{
  loginHandler = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const user:IUserSchema | null = await User.findOne({ email });
    if (!user) {
      throw new RequestError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new RequestError(401, "Email or password is wrong");
    }
    const { accessToken, refreshToken } = createToken(user.id);
    await User.findByIdAndUpdate(user.id, { accessToken, refreshToken });
  
    res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
  };
}
const login = new Login().loginHandler;

export default login;
