import { IResult, IToken, ITokenPayload, IUser } from '@domain/models';

export interface TokenService {
  generate(user: IUser): IToken;
  validate(token: string): IResult<ITokenPayload>;
}
