import { PrismaClient } from '@prisma/client';
import express from 'express';

import config from './config';
import { seedStaticExercises } from './database/seedStaticExercises';
import { createApolloServer } from './server/createServer';

const prisma = new PrismaClient();

/**
 * entry point to the app
 */
const main = async () => {
  // main
  // express app
  const app = express();

  const server = createApolloServer({
    prisma,
  });

  // express middleware
  app.use(express.json({ limit: '500mb' }));

  // needed by apollo server
  await server.start();

  server.applyMiddleware({ app });

  //seedStaticExercises(prisma)
  app.listen({ port: config.port }, () => {
    console.log(`🚀 Server ready at port http://localhost:${config.port}${server.graphqlPath}`);
  });
};

// catch errors and log to console
main().catch((e) => {
  console.log(e);
});
