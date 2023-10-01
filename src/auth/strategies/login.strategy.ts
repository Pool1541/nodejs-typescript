import { UserEntity } from '../../user/entities/user.entity';
import { AuthService } from '../services/auth.service';
import { PassportUse } from '../utils/passport.use';
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';

const authService: AuthService = new AuthService();

export class LoginStrategy {
  async validate(username: string, password: string, done: any): Promise<UserEntity> {
    const user = await authService.validateUser(username, password);

    if (!user) {
      return done(null, false, { message: 'invalid username or password.' });
    } else {
      return done(null, user);
    }
  }

  get use() {
    return PassportUse<LocalStrategy, Object, VerifyFunction>(
      'login',
      LocalStrategy,
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      this.validate
    );
  }
}
