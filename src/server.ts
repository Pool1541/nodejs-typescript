import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './routes/user.router';

class ServerBoostrap {
  public app: express.Application = express();
  private port: number = 8000;

  constructor() {
    this.middlewares();
    this.listen();
  }

  routers(): Array<express.Router> {
    return [new UserRouter().router];
  }

  public middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use('/api', this.routers());
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log('Server listening on port ', this.port);
    });
  }
}

new ServerBoostrap();
