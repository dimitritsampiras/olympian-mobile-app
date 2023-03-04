import { enumType, objectType } from 'nexus';
import {
  Equipment,
  Exercise,
  Movement,
  Muscle,
  Program,
  Publicity,
  Specificity,
  StaticExercise,
  TrainingLevel,
  Workout,
} from 'nexus-prisma';

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
    t.field(Program.profile);
  },
});

// Session object type from prisma
export const WorkoutType = objectType({
  name: Workout.$name,
  definition(t) {
    t.field(Workout.id);
    t.field(Workout.name);
    t.field(Workout.duration);
    t.field(Workout.specificity);
    t.field(Workout.tags);
    t.field(Workout.trainingLevel);
    t.field(Workout.exercises);
    t.field(Workout.programId);
  },
});

export const ExerciseType = objectType({
  name: Exercise.$name,
  definition(t) {
    t.field(Exercise.id);
    t.field(Exercise.reps);
    t.field(Exercise.sets);
    t.field(Exercise.rpe);
    t.field(Exercise.authorNotes);
    t.field(Exercise.number);
    t.field(Exercise.staticExercise);
  },
});

export const StaticExerciseType = objectType({
  name: StaticExercise.$name,
  definition(t) {
    t.field(StaticExercise.id);
    t.field(StaticExercise.name);
    t.field(StaticExercise.createdAt);
    t.field(StaticExercise.equipment);
    t.field(StaticExercise.exercise);
    t.field(StaticExercise.movement);
    t.field(StaticExercise.description);
    t.field(StaticExercise.primaryTargetMuscle);
    t.field(StaticExercise.secondaryTargetMuscle);
    t.field(StaticExercise.tertiaryTargetMuscle);
    t.field(StaticExercise.updatedAt);
  },
});

export const MovementEnum = enumType({
  name: Movement.name,
  members: Movement.members,
});

export const EquipmentEnum = enumType({
  name: Equipment.name,
  members: Equipment.members,
});

export const MuscleEnum = enumType({
  name: Muscle.name,
  members: Muscle.members,
});

export const PublicityEnum = enumType({
  name: Publicity.name,
  members: Publicity.members,
});

export const SpecificityEnum = enumType({
  name: Specificity.name,
  members: Specificity.members,
});

export const TrainingLevelEnum = enumType({
  name: TrainingLevel.name,
  members: TrainingLevel.members,
});
