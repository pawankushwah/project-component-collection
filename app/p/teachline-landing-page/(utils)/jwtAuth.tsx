import { jwtVerify, SignJWT } from "jose";

interface userJwtPayload {
      jti: string,
      iat: number
}

export function getJwtSecretKey() {
      const secret = process.env.JWT_ACCESS_TOKEN_SECRET;

      if(!secret || secret.length === 0){
            throw new Error("The environment variable JWT_SECRET_TOKEN_SECRET is not set");
      }

      return secret;
}

export async function verifyAuth(token: string) {
      try {
            const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
            return verified.payload as userJwtPayload
      } catch (error) {
            throw new Error("Token is Expired")
      }
}