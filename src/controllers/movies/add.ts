import { Movies } from "../../models";
import { Response } from "express";
import { IUserAuthRequest } from "../../types/appType";

class Add{
  addHandler = async (req:IUserAuthRequest, res:Response):Promise<void> => {
    const { _id } = req.user;
    const result = await Movies.create({ ...req.body, owner: _id });
  
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  };
}

const add = new Add().addHandler;

export default add;
