import { Router } from 'express';

export class BaseRouter<T, U = any> {
  public router: Router;
  public controller: T;
  public middleware?: U;

  constructor(TController: { new (): T }, UMiddleware?: { new (): U }) {
    this.router = Router();
    this.controller = new TController();
    if (UMiddleware) this.middleware = new UMiddleware();
    this.routes();
  }

  routes() {}
}
