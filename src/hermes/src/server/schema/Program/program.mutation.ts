import { DateTime } from 'luxon';
import { extendType, inputObjectType, list, nullable } from 'nexus';

// All mutations for User graphql object type
export const ProgramMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     *
     * create program mutation
     */
    t.field('createProgram', {
      type: nullable('Program'),
      args: { input: 'CreateProgramInput' },
      resolve: async (_root, { input }, { prisma }) => {
        const { name, publicity, tags, trainingType, userId } = input;
        // check if the profile exists
        const profile = await prisma.profile.findUnique({
          where: { userId },
        });

        // TODO: handle error
        if (!profile) return null;

        const createdProgram = await prisma.program.create({
          data: {
            name,
            publicity,
            tags,
            trainingType,
            profile: { connect: { userId } },
          },
        });

        return createdProgram;
      },
    });
    /**
     *
     * create program mutation
     */
    t.field('createWorkout', {
      type: nullable('Workout'),
      args: { programId: 'String' },
      resolve: async (_root, { programId }, { prisma }) => {
        // check if the profile exists
        const program = await prisma.program.findUnique({
          where: { id: programId },
          include: { workouts: true },
        });
        // TODO: handle error
        if (!program) return null;

        const createdWorkout = await prisma.workout.create({
          data: {
            name: `Workout #${program.workouts.length + 1}`,
            duration: DateTime.fromSeconds(0).toJSDate(),
            trainingLevel: program.trainingLevel,
            programId,
          },
        });

        return createdWorkout;
      },
    });
    /**
     *
     * create exercise mutation
     */
    t.field('createExercise', {
      type: nullable('Exercise'),
      args: { workoutId: 'String', staticExerciseId: 'String' },
      resolve: async (_root, { workoutId, staticExerciseId }, { prisma }) => {
        // check if the profile exists
        const workout = await prisma.workout.findUnique({
          where: { id: workoutId },
          include: { exercises: true },
        });
        const staticExercise = await prisma.staticExercise.findUnique({
          where: { id: staticExerciseId },
        });

        // TODO: handle error
        if (!workout || !staticExercise) return null;

        return await prisma.exercise.create({
          data: {
            workoutId,
            staticExerciseId,
            order: workout.exercises.length + 1,
            sets: {
              create: {
                number: 1,
                reps: 0,
                rpe: 1,
              },
            },
          },
        });
      },
    });
    /**
     *
     * create exercise mutation
     */
    t.field('createSet', {
      type: nullable('Set'),
      args: { exerciseId: 'String' },
      resolve: async (_root, { exerciseId }, { prisma }) => {
        // check if the profile exists
        const exercise = await prisma.exercise.findUnique({
          where: { id: exerciseId },
          include: { sets: true },
        });

        if (!exercise) return null;

        return await prisma.set.create({
          data: {
            exerciseId,
            number: exercise.sets.length + 1,
            reps: exercise.sets[exercise.sets.length - 1]?.reps || 0,
            rpe: exercise.sets[exercise.sets.length - 1]?.rpe || 0,
          },
        });
      },
    });
    /**
     *
     * updates the reps of a set
     */
    t.field('updateSetReps', {
      type: nullable('Set'),
      args: { setId: 'String', reps: 'Int' },
      resolve: async (_root, { setId, reps }, { prisma }) => {
        return await prisma.set.update({
          where: { id: setId },
          data: { reps },
        });
      },
    });
    /**
     *
     * updates the reps of a set
     */
    t.field('updateSetRpe', {
      type: nullable('Set'),
      args: { setId: 'String', rpe: 'Int' },
      resolve: async (_root, { setId, rpe }, { prisma }) => {
        return await prisma.set.update({
          where: { id: setId },
          data: { rpe },
        });
      },
    });
  },
});

export const CreateProgramInput = inputObjectType({
  name: 'CreateProgramInput',
  definition(t) {
    t.field('name', { type: 'String' });
    t.field('publicity', { type: 'Publicity' });
    t.field('tags', { type: list('String') });
    t.field('trainingType', { type: list('TrainingType') });
    t.field('userId', { type: 'String' });
  },
});
