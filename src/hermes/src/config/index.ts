/**
 * Enviroment variables
 *
 * @remarks
 * Requires .env in root directory
 */
import dotenv from 'dotenv';

// load env vars
const config = dotenv.config();

if (config.error) throw new Error("Couldn't find .env file");

export default {
  port: process.env.PORT || '',
  jwtSecret: process.env.JWT_SECRET || ''
};
