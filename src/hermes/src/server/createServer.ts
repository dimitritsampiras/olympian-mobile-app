import { ApolloServer } from 'apollo-server-express';

import { schema } from './schema/makeSchema';
import { AppContext } from './context';
import { authenticateUser } from './schema/User/helpers/authentication';
import { permissions } from './permissions'
import {applyMiddleware} from 'graphql-middleware';
// import { authenticateUser } from './schema/User';

type ApolloServerConfig = Omit<AppContext, 'req' | 'res' | 'user'>;

const schemaWithMiddleware = applyMiddleware(schema, permissions);

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
    schema : schemaWithMiddleware,
    context: ({ req, res }): AppContext => {
      return {
        req,
        res,
        prisma,
        user: authenticateUser(req.headers.authorization),
      };
    }
  });
};
