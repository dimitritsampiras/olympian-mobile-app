import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';

import { schema } from './schema/makeSchema';
import { AppContext } from './context';
import { permissions } from './permissions';
import { authenticateUserFromRequest } from '../utils/auth';

type ApolloServerConfig = Omit<AppContext, 'req' | 'res' | 'user'>;

const schemaWithMiddleware = applyMiddleware(schema, permissions);

/**
 *
 * Apollo server init function
 *
 * @param server Http server instance
 * @returns Apollo server instance
 */
export const createApolloServer = ({ prisma }: ApolloServerConfig) => {
  // Apollo server object
  return new ApolloServer({
    schema: schemaWithMiddleware,
    context: ({ req, res }): AppContext => {
      return {
        req,
        res,
        prisma,
        userId: authenticateUserFromRequest(req.headers.authorization),
      };
    },
  });
};
