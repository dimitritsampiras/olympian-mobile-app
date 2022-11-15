import { enumType, objectType } from 'nexus';
import { Exercise, Program, Publicity, Specificity, TrainingLevel, Workout } from 'nexus-prisma';


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
    t.field(Program.workouts);
  }
});


// Session object type from prisma
export const WorkoutType = objectType({
  name: Workout.$name,
  definition(t) {
    t.field(Workout.id);
    t.field(Workout.name);
    // t.field(Workout.duration);
    t.field(Workout.specificity);
    t.field(Workout.tags);
    t.field(Workout.trainingLevel);
    // t.field(Workout.exercises);
  }
});

export const ExerciseType = objectType({
  name: Exercise.$name,
  definition(t) {
    t.field(Exercise.id);
    t.field(Exercise.reps);
    t.field(Exercise.sets);
    t.field(Exercise.rpe);
    t.field(Exercise.description);
  },
})

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


