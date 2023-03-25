import { Prisma } from '@prisma/client';
import { extendType, inputObjectType, list, nullable } from 'nexus';
import { getRandomColor } from '../../../lib/utils/getRandomColor';

// All mutations for User graphql object type
export const ProgramMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     *
     * mutation for creating a program
     * connects as profile/users authored program
     */
    t.field('createProgram', {
      type: nullable('Program'),
      args: { input: 'CreateProgramInput' },
      resolve: async (_root, { input }, { prisma }) => {
        const { name, publicity, trainingType, userId } = input;
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
            trainingType,
            programImageDefaultColor: getRandomColor(),
            authors: { connect: { userId } },
          },
        });
        return createdProgram;
      },
    });
    /**
     *
     * updates the icon of a program
     */
    t.field('updateProgramIcon', {
      type: nullable('Program'),
      args: { programId: 'String', programImageDefaultEmoji: 'String' },
      resolve: async (_root, { programId, programImageDefaultEmoji }, { prisma }) => {
        return await prisma.program.update({
          where: { id: programId },
          data: { programImageDefaultEmoji },
        });
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
            trainingLevel: program.trainingLevel,
            programId,
          },
        });

        return createdWorkout;
      },
    });
    /**
     * update workout name mutation
     */
    t.field('updateWorkoutName', {
      type: nullable('Workout'),
      args: { name: 'String', workoutId: 'String' },
      resolve: async (_root, { workoutId, name }, { prisma }) => {
        const workout = await prisma.workout.update({
          where: { id: workoutId },
          data: { name },
        });
        return workout;
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
    t.field('updateCompletionStatus', {
      type: nullable('PerformedSet'),
      args: { performedSetId: 'String', currentStatus: 'Boolean' },
      resolve: async (_root, { performedSetId, currentStatus }, { prisma }) => {
        return await prisma.performedSet.update({
          where: { id: performedSetId },
          data: { completed: !currentStatus },
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
    /**
     *
     * when the user starts a workout
     */
    t.field('startWorkout', {
      type: nullable('PerformedWorkout'),
      args: { workoutId: 'String' },
      resolve: async (_root, { workoutId }, { prisma, userId }) => {
        await prisma.performedWorkout.updateMany({
          where: { profile: { userId }, workoutId },
          data: { active: false },
        });
        const workout = await prisma.workout.findUnique({
          where: { id: workoutId },
          include: { exercises: { include: { sets: true } } },
        });

        if (!workout?.programId) return null;

        return await prisma.performedWorkout.create({
          data: {
            active: true,
            profile: { connect: { userId } },
            notes: '',
            duration: 0,
            workout: { connect: { id: workoutId } },
            program: { connect: { id: workout.programId } },
            performedExercises: {
              create: workout.exercises.map((exercise) => ({
                exerciseId: exercise.id,
                notes: '',
                performedSets: {
                  create: exercise.sets.map<Prisma.PerformedSetCreateWithoutPerformedExerciseInput>(
                    (set) => ({
                      set: { connect: { id: set.id } },
                      reps: set.reps,
                      weight: 50,
                    })
                  ),
                },
              })),
            },
          },
        });
      },
    });
    /**
     *
     * when the user starts a workout
     */
    t.field('finishWorkout', {
      type: nullable('PerformedWorkout'),
      args: { performedWorkoutId: 'String' },
      resolve: async (_root, { performedWorkoutId }, { prisma }) => {
        const performedWorkout = await prisma.performedWorkout.update({
          where: { id: performedWorkoutId },
          data: { active: false },
        });
        return performedWorkout;
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
