import { enumType, objectType } from 'nexus';
import {
  Equipment,
  Exercise,
  Movement,
  Muscle,
  Program,
  Publicity,
  StaticExercise,
  TrainingLevel,
  Workout,
  TrainingType,
  Set,
  PerformedWorkout,
  PerformedExercise,
  PerformedSet,
} from 'nexus-prisma';

// Session object type from prisma
export const ProgramType = objectType({
  name: Program.$name,
  definition(t) {
    t.field(Program.id);
    t.field(Program.name);
    t.field(Program.complimentary);
    t.field(Program.publicity);
    t.field(Program.trainingType);
    t.field(Program.trainingLevel);
    t.field(Program.workouts);
    t.field(Program.authors);
    t.field(Program.inLibraryOf);
    t.field(Program.performedWorkouts);
    t.field(Program.likes);
    t.field(Program.defaultImageColor);
    t.field(Program.defaultEmojiHex);
  },
});

// Session object type from prisma
export const WorkoutType = objectType({
  name: Workout.$name,
  definition(t) {
    t.field(Workout.id);
    t.field(Workout.name);
    t.field(Workout.trainingType);
    t.field(Workout.trainingLevel);
    t.field(Workout.exercises);
    t.field(Workout.program);
    t.field(Workout.programId);
  },
});

export const ExerciseType = objectType({
  name: Exercise.$name,
  definition(t) {
    t.field(Exercise.id);
    t.field(Exercise.sets);
    t.field(Exercise.authorNotes);
    t.field(Exercise.order);
    t.field(Exercise.supersetOrder);
    t.field(Exercise.staticExercise);
  },
});

export const SetType = objectType({
  name: Set.$name,
  definition(t) {
    t.field(Set.id);
    t.field(Set.reps);
    t.field(Set.rpe);
    t.field(Set.number);
    t.field(Set.exercise);
  },
});

// Session object type from prisma
export const PerformedWorkoutType = objectType({
  name: PerformedWorkout.$name,
  definition(t) {
    t.field(PerformedWorkout.id);
    t.field(PerformedWorkout.active);
    t.field(PerformedWorkout.createdAt);
    t.field(PerformedWorkout.duration);
    t.field(PerformedWorkout.notes);
    t.field(PerformedWorkout.tonnage);
    t.field(PerformedWorkout.performedExercises);
    t.field(PerformedWorkout.program);
    t.field(PerformedWorkout.workout);
    t.field(PerformedWorkout.profile);
  },
});

export const PerformedExerciseType = objectType({
  name: PerformedExercise.$name,
  definition(t) {
    t.field(PerformedExercise.id);
    t.field(PerformedExercise.exercise);
    t.field(PerformedExercise.notes);
    t.field(PerformedExercise.performedWorkout);
    t.field(PerformedExercise.performedSets);
    t.field(PerformedExercise.exercise);
  },
});

export const PerformedSetType = objectType({
  name: PerformedSet.$name,
  definition(t) {
    t.field(PerformedSet.id);
    t.field(PerformedSet.completedAt);
    t.field(PerformedSet.completed);
    t.field(PerformedSet.duration);
    t.field(PerformedSet.weight);
    t.field(PerformedSet.reps);
    t.field(PerformedSet.set);
    t.field(PerformedSet.performedExercise);
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

export const TrainingTypeEnum = enumType({
  name: TrainingType.name,
  members: TrainingType.members,
});

export const TrainingLevelEnum = enumType({
  name: TrainingLevel.name,
  members: TrainingLevel.members,
});
