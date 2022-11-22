import { enumType, objectType } from 'nexus';
import { Equipment, Movement, Muscle, MuscleRank, StaticExercise } from 'nexus-prisma';

export const StaticExerciseType = objectType({
  name: StaticExercise.$name,
  definition(t) {
    t.field(StaticExercise.id);
    t.field(StaticExercise.name);
    t.field(StaticExercise.equipment);
    t.field(StaticExercise.movement);
    t.field(StaticExercise.targetMuscles);
  },
});

export const TargetMusclesType = objectType({
  name: Muscle.$name,
  definition(t) {
    t.field(Muscle.id);
    t.field(Muscle.name);
    t.field(Muscle.rank);
  },
});

export const StaticExerciseEquipmentEnum = enumType({
  name: Equipment.name,
  members: Equipment.members,
});

export const StaticExerciseMovementEnum = enumType({
  name: Movement.name,
  members: Movement.members,
});

export const MuscleRankEnum = enumType({
  name: MuscleRank.name,
  members: MuscleRank.members,
});
