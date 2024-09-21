import jwt from "jsonwebtoken";

export default class JWTHelper {
  private secretKey: string = "mi_clave_secreta"; // Clave secreta para firmar el token

  constructor(secretKey?: string) {
    if (secretKey) {
      this.secretKey = secretKey;
    }
  }

  public sign(
    payload: string | object | Buffer,
    options: jwt.SignOptions | undefined
  ) {
    const token = jwt.sign(payload, this.secretKey, options);
    return token;
  }

  public verify(
    token: string,
    callback: jwt.VerifyCallback<jwt.JwtPayload | string>
  ): void {
    return jwt.verify(token, this.secretKey, callback);
  }
}
