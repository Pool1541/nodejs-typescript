import { PayloadToken } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { PassportUse } from '../utils/passport.use';
import { ExtractJwt, Strategy as JwtStr, StrategyOptions } from 'passport-jwt';

export class JwtStrategy extends AuthService {
  constructor() {
    super();
  }

  async validate(payload: PayloadToken, done: any) {
    return done(null, payload);
  }

  get use() {
    return PassportUse<
      JwtStr,
      StrategyOptions,
      (PayloadToken: PayloadToken, done: any) => Promise<PayloadToken>
    >(
      'jwt',
      JwtStr,
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.getEnviroment('JWT_SECRET'),
      },
      this.validate
    );
  }
}
