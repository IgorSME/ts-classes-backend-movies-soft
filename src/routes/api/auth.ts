import {Router} from 'express';
import { authToken, validation, ctrlWrapper } from "../../middlewares";
import {
  joiRegisterSchema,
  joiLoginSchema,
  joiRefreshTokenSchema,
} from "../../models";

import { auth as ctrl }from "../../controllers";

class AuthRouter{
  private router:Router;

  constructor(){
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes():void {
    this.router.post('/register', validation(joiRegisterSchema), ctrlWrapper(ctrl.register));
    this.router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
    this.router.post('/logout', authToken, ctrlWrapper(ctrl.logout));
    this.router.post('/refresh', validation(joiRefreshTokenSchema), ctrlWrapper(ctrl.refresh));
    this.router.get('/current', authToken, ctrlWrapper(ctrl.getCurrent))
  }

  getRouter():Router{
    return this.router
  }
}

export default AuthRouter;
