import jwt from 'jsonwebtoken';
import config from '../../config';

/**
 * Function that returns payload fron authorization string.
 *
 * @description
 * Server requests will contain a property "Authorization" whose value is "Bearer <token>".
 * The token is a jwt that can be used to authenticate and identify the user for each request.
 * The function takes that token and extracts the user object with jwt.verify
 *
 * @param authorization Authorization string from request headers.
 * @returns Payload object.
 */
export const authenticateUserFromRequest = (
  authorization: string | undefined
): string | undefined => {
  try {
    const bearerLength = 'Bearer '.length;
    if (!authorization || !(authorization.length > bearerLength)) return;
    const reqToken = authorization.slice(bearerLength);

    const payload = jwt.verify(reqToken, config.jwtSecret) as {
      userId: string;
      iat: number;
      exp: number;
    };

    return payload.userId;
  } catch (e) {
    // TODO: log error
    return;
  }
};
