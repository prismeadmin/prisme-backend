import { UserProfile, securityId } from "@loopback/security";
import { promisify } from 'util'
import { HttpErrors } from "@loopback/rest";
import { inject } from "@loopback/core";
import { TokenServiceBindings } from "../keys";
const jwt = require('jsonwebtoken')
const signAsync = promisify(jwt.sign)

export class JWTService {
  @inject(TokenServiceBindings.TOKEN_SECRET)
  public readonly jwtSecret: string;
  @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
  public readonly jwtExpiresIn: string;

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorizeed(
        'Error while genrating token: user profile is null'
      )
    }
    let token = '';
    try {
      token = await signAsync(userProfile, this.jwtSecret, { expiresIn: this.jwtExpiresIn })
    } catch (err) {
      throw new HttpErrors.Unauthorized(`error generating token ${err}`)
    }
    return token
  }

  async verifyToken(token: string): Promise<UserProfile> {
    return Promise.resolve({ name: 'Haider', [securityId]: '2' })
  }
}
