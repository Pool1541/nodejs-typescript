import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './routes/user.router';
import { ConfigServer } from './config/config';

class ServerBoostrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT');

  constructor() {
    super();
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
