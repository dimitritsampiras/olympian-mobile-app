import { objectType } from 'nexus';
import { Program } from 'nexus-prisma';

// Session object type from prisma
export const ProgramType = objectType({
  name: Program.$name,
  definition(t) {
    t.field(Program.id);
  }
});
