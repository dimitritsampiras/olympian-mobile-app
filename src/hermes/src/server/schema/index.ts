import { makeSchema } from 'nexus';
import path from 'path';

import * as UserSchema from './User';
import * as ErrorSchema from './Error';
import * as ProgramSchema from './Program';

// graphql nexus schema
export default makeSchema({
  // types and resolvers
  types: [UserSchema, ErrorSchema, ProgramSchema],
  // output paths of schema
  outputs: {
    schema: path.join(__dirname, '../../../schema.graphql'),
    typegen: path.join(__dirname, '../../lib/types/nexus.ts')
  },

  // assumes all types are not null
  nonNullDefaults: {
    input: true,
    output: true
  },
  // app context
  contextType: {
    module: require.resolve('../context'),
    export: 'AppContext',
    alias: 'ctx'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma'
      }
    ]
  }
});
