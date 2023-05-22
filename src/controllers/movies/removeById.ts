import { RequestError } from "../../helpers";
import { Movies } from "../../models";
import { Request, Response } from "express";
import { IMovieSchema } from "../../types/appType";

class RemoveById{
  removeByIdHandler = async (req:Request, res:Response):Promise<void> => {
    const { idParam } = req.params;
    const result:IMovieSchema | null = await Movies.findByIdAndRemove(idParam);
    if (!result) {
      throw new RequestError(404,`Movie with id=${idParam} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      },
    });
  };
} 
const removeById = new RemoveById().removeByIdHandler;

export default removeById;
