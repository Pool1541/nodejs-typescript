import { SharedMiddleware } from '../shared/middlewares/shared.middleware';
import { BaseRouter } from '../shared/routes/router';
import { AuthController } from './controllers/auth.controller';

export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
  constructor() {
    super(AuthController, SharedMiddleware);
  }

  routes(): void {
    this.router.post('/login', this.middleware?.passAuth('login'), (req, res) =>
      this.controller.login(req, res)
    );
    // this.router.post('/register', this.controller.register);
    // this.router.post('/logout', this.controller.logout);
    // this.router.get('/me', this.controller.me);
    // this.router.post('/refresh-token', this.controller.refreshToken);
    // this.router.post('/forgot-password', this.controller.forgotPassword);
    // this.router.post('/reset-password', this.controller.resetPassword);
    // this.router.post('/change-password', this.controller.changePassword);
    // this.router.post('/change-email', this.controller.changeEmail);
    // this.router.post('/verify-email', this.controller.verifyEmail);
    // this.router.post('/verify-phone', this.controller.verifyPhone);
    // this.router.post('/verify-phone-code', this.controller.verifyPhoneCode);
    // this.router.post('/verify-phone-code-again', this.controller.verifyPhoneCodeAgain);
  }
}
