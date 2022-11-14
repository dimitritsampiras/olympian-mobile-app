import { enumType, objectType } from 'nexus';
import { Program, Publicity, Specificity, TrainingLevel } from 'nexus-prisma';

// Session object type from prisma
export const ProgramType = objectType({
  name: Program.$name,
  definition(t) {
    t.field(Program.id);
    t.field(Program.name);
    t.field(Program.complimentary);
    t.field(Program.publicity);
    t.field(Program.specificity);
    t.field(Program.tags);
    t.field(Program.trainingLevel);
  }
});



// Session object type from prisma
export const PublicityEnum = enumType({
  name: Publicity.name,
  members: Publicity.members
});

export const SpecificityEnum = enumType({
  name: Specificity.name,
  members: Specificity.members
})


export const TrainingLevelEnum = enumType({
  name: TrainingLevel.name,
  members: TrainingLevel.members
})
