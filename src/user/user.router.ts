import { UserController } from './controllers/user.controller';
import { BaseRouter } from '../shared/routes/router';
import { UserMiddleware } from './middlewares/user.middleware';

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware);
  }

  routes(): void {
    this.router.get('/users', (req, res) => this.controller.getUser(req, res));
    this.router.get('/user/:id', (req, res) => this.controller.getUserById(req, res));
    this.router.get('/userWithRelation/:id', (req, res) =>
      this.controller.getUserWithRelation(req, res)
    );
    this.router.post(
      '/user',
      (req, res, next) => [this.middleware?.userValidator(req, res, next)],
      (req, res) => this.controller.createUser(req, res)
    );
    this.router.put('/user/:id', (req, res) => this.controller.updateUser(req, res));
    this.router.delete(
      '/user/:id',
      this.middleware?.passAuth('jwt'),
      (req, res, next) => [this.middleware?.checkAdminRole(req, res, next)],
      (req, res) => this.controller.deleteUser(req, res)
    );
  }
}
