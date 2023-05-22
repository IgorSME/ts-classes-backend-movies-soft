import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { RequestError, createToken } from '../../helpers';
import { User } from '../../models';


const { SECRET_KEY_REFRESH = "" } = process.env;

class Refresh{
  refreshHandler = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const { id } = jwt.verify(refreshToken, SECRET_KEY_REFRESH)as JwtPayload & { id: string };
      const user = await User.findById(id);
      if (!user || user.refreshToken !== refreshToken) {
        throw new RequestError(401, "Token expired");
      }
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        createToken(id);
  
      await User.findByIdAndUpdate(id, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
  
      res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(new RequestError(401, error.message));
    }
  };
}
const refresh = new Refresh().refreshHandler;

export default refresh;
