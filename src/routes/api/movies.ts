import {Router} from 'express';
import {
  validation,
  ctrlWrapper,
  authToken,
  isValidId,
}  from "../../middlewares";
import { joiMoviesSchema } from "../../models";
import { movies as ctrl } from "../../controllers";

// const router:Router = express.Router();

// router.get("/", authToken, ctrlWrapper(ctrl.getAll));
// router.get("/:idParam", authToken, isValidId, ctrlWrapper(ctrl.getById));

// router.post("/", authToken, validation(joiMoviesSchema), ctrlWrapper(ctrl.add));
// router.patch(
//   "/:idParam",
//   authToken,
//   isValidId,
//   validation(joiMoviesSchema),
//   ctrlWrapper(ctrl.updateById)
// );
// router.delete(
//   "/:idParam",
//   authToken,
//   validation(joiMoviesSchema),
//   ctrlWrapper(ctrl.removeById)
// );

class MoviesRouter{
  private router:Router;

  constructor (){
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes():void{
    this.router.get('/',authToken, ctrlWrapper(ctrl.getAll));
    this.router.get(':idParam', authToken,isValidId, ctrlWrapper(ctrl.getById));
    this.router.post('/',authToken,validation(joiMoviesSchema), ctrlWrapper(ctrl.add));
    this.router.patch('/:idParam', authToken,isValidId, validation(joiMoviesSchema), ctrlWrapper(ctrl.updateById));
    this.router.delete('/:idParam', authToken,validation(joiMoviesSchema), ctrlWrapper(ctrl.removeById))
  }

  getRouter():Router{
    return this.router
  }
}

export default MoviesRouter;
