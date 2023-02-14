import { rule, shield } from 'graphql-shield';
import { AppContext } from './context';
import { isUndefined } from 'lodash';

const rules = {
  isAuthenticatedUser: rule()((_, __, { userId }: AppContext) => {
    return !isUndefined(userId);
  }),
};

export const permissions = shield(
  {
    // Queries with rules go here.
  },
  {
    debug: true,
  }
);
