import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../../models";
import { RequestError, createToken } from "../../helpers";
import { IUserSchema } from "../../types/appType";

class Register{
  registerHandler = async (req:Request, res:Response) => {
    const { username, email, password } = req.body;
    const user:IUserSchema | null = await User.findOne({ email });
  
    if (user) {
      throw new RequestError(401, `User with email:${email} already exist`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser:IUserSchema | null = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const { accessToken, refreshToken } = createToken(newUser.id);
    await User.findByIdAndUpdate(newUser._id, { accessToken, refreshToken });
  
    res.status(201).json({
      user: {
        username,
        email,
      },
      accessToken,
      refreshToken,
    });
  };
}
const register = new Register().registerHandler;

export default register;
