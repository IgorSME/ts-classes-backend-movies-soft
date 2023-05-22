import { RequestError } from "../../helpers";
import { Movies } from "../../models";
import { IMovieSchema, IUserAuthRequest } from "../../types/appType";
import { Response } from "express";

class GetById{
  getByIdHandler = async (req:IUserAuthRequest, res:Response):Promise<void> => {
    const { idParam } = req.params;
  
    const result:IMovieSchema | null = await Movies.findById(idParam);
    if (!result) {
      throw new RequestError(404,`Movie with id=${idParam} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  };
} 
const getById = new GetById().getByIdHandler;

export default getById;
