import jwt from 'jsonwebtoken';
import { IUser, IToken, IResult, ITokenPayload, Result } from '@domain/models';
import { TokenService } from '@domain/ports/TokenService';
import { Environments } from '@infrastructure/config/Enviroments';

export class JwtTokenService implements TokenService {
  generate(user: IUser): IToken {
    const { expiresAt, expiresHours } = this._getExpiresAt();
    const token = jwt.sign({ id: user.id }, Environments.getJwtSecret(), {
      expiresIn: `${expiresHours}h`,
    });

    return {
      accessToken: token,
      expires: expiresAt,
    };
  }

  validate(token: string): IResult<ITokenPayload> {
    try {
      const decode = jwt.verify(
        token,
        Environments.getJwtSecret()
      ) as ITokenPayload;

      return Result.success(decode);
    } catch (error) {
      console.error('Error on validate token', error);
      return Result.failure('Authteication failed, invalid token!');
    }
  }

  private _getExpiresAt() {
    const expiresHours = Environments.get('JWT_EXPIRES_IN_HOURS', '4');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + Number(expiresHours));
    return { expiresHours, expiresAt: expiresAt.getTime() };
  }
}
