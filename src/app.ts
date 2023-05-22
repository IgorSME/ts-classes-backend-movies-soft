import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response, Express} from "express";
import { IError } from "./types/appType";

dotenv.config();

import AuthRouter from "./routes/api/auth";
import MoviesRouter from "./routes/api/movies";

// const app:express.Application = express();

// app.use(logger("dev"));
// app.use(express.json());
// app.use(cors());

// app.use("/api/auth", authRouter);
// app.use("/api/movies", moviesRouter);

// app.use((_req:Request, res:Response) => res.status(404).json({ message: "Not Found" }));
// app.use((err:IError, _req:Request, res:Response) => {
//   const { status = 500} = err;
//   res.status(status).json({ message: err.message });
// });

class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandlers();
  }

  private setupMiddleware(): void {
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setupRoutes(): void {
    this.app.use("/api/auth", new AuthRouter().getRouter());
    this.app.use("/api/movies", new MoviesRouter().getRouter());
  }

  private setupErrorHandlers(): void {
    this.app.use((_req: Request, res: Response) => res.status(404).json({ message: "Not Found" }));
    this.app.use((err: IError, _req: Request, res: Response) => {
      const { status = 500 } = err;
      res.status(status).json({ message: err.message });
    });
  }

  public getApp(): Express {
    return this.app;
  }
}

export default App;


