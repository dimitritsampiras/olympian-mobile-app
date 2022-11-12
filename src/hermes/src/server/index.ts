import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import { AppContext } from './context';
import { authenticateUser } from './schema/User/helpers/authentication';
// import { authenticateUser } from './schema/User';

type ApolloServerConfig = Omit<AppContext, 'req' | 'res' | 'user'>;

/**
 *
 * Apollo server init function
 *
 * @param server Http server instance
 * @returns Apollo server
 */
export const createApolloServer = ({ prisma }: ApolloServerConfig) => {
  // Apollo server object
  return new ApolloServer({
    schema,
    context: ({ req, res }): AppContext => {
      return {
        req,
        res,
        prisma,
        user: authenticateUser(req.headers.authorization)
      };
    }
  });
};
