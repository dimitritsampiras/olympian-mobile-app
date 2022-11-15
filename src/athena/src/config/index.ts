/**
 * Enviroment variables
 * Requires .env in root directory
 */
import dotenv from 'dotenv';

// load env vars
const config = dotenv.config();

// throw error if no env file
if (config.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: process.env.PORT || '',
  ip_address: process.env.IP_ADDRESS || '',
};
