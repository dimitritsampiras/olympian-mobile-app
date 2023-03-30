import { objectType } from 'nexus';
import { User } from 'nexus-prisma';

export const UserType = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.email);
    t.field(User.password);
    t.field(User.profile);
  },
});
