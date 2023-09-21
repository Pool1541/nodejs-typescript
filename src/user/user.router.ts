import { UserController } from './controllers/user.controller';
import { BaseRouter } from '../shared/routes/router';

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get('/users', (req, res) => this.controller.getUser(req, res));
    this.router.get('/user/:id', (req, res) => this.controller.getUserById(req, res));
    this.router.post('/user', (req, res) => this.controller.createUser(req, res));
    this.router.put('/user/:id', (req, res) => this.controller.updateUser(req, res));
    this.router.delete('/user/:id', (req, res) => this.controller.deleteUser(req, res));
  }
}
