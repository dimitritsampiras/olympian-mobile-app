import { objectType } from 'nexus';
import { Profile } from 'nexus-prisma';

export const ProfileType = objectType({
  name: Profile.$name,
  description: Profile.$description,
  definition(t) {
    t.field(Profile.id);
    t.field(Profile.user);
    t.field(Profile.programs);
  },
});
