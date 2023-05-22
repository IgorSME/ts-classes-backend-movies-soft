import { Movies } from "../../models";
import { IMovieSchema, IUserAuthRequest } from "../../types/appType";
import { Response } from "express";

class GetAll{
  getAllHandler = async (req:IUserAuthRequest, res:Response):Promise<void> => {
    const { _id } = req.user;
    const { page = '1', limit = '10' } = req.query;
    const skip:number = (parseInt(page as string,10) - 1) * parseInt(limit as string,10);
  
    const movies:IMovieSchema[] = await Movies.find({ owner: _id }, "", {
      skip,
      limit:parseInt(limit as string),
    }).populate("owner", "_id email");
  
    res.status(200).json({
      status: "success",
      code: 200,
      data: { movies },
    });
  };
} 
const getAll = new GetAll().getAllHandler;

export default getAll;
