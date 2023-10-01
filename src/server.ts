import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './user/user.router';
import { ConfigServer } from './config/config';
import { ProductRouter } from './product/Product.router';
import { CategoryRouter } from './category/Category.router';
import { CustomerRouter } from './customer/customer.router';
import { PurchaseRouter } from './purchase/purchase.router';
import { PurchaseProductRouter } from './purchase/purchase-product.router';
import { DataSource } from 'typeorm';
import { LoginStrategy } from './auth/strategies/login.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthRouter } from './auth/auth.router';

class ServerBoostrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT');

  constructor() {
    super();
    this.dbConnect();
    this.middlewares();
    this.listen();
    this.passportUse();
  }

  routers(): Array<express.Router> {
    return [
      new UserRouter().router,
      new ProductRouter().router,
      new CategoryRouter().router,
      new CustomerRouter().router,
      new PurchaseRouter().router,
      new PurchaseProductRouter().router,
      new AuthRouter().router,
    ];
  }

  public middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use('/api', this.routers());
  }

  passportUse() {
    return [new LoginStrategy().use, new JwtStrategy().use];
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect
      .then(() => console.log('Connected to database'))
      .catch((err) => console.error(err));
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log('Server listening on port ', this.port);
    });
  }
}

new ServerBoostrap();
