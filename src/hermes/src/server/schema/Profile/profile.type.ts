import { enumType, objectType } from 'nexus';
import { Gender, Profile, Goal } from 'nexus-prisma';

export const ProfileType = objectType({
  name: Profile.$name,
  description: Profile.$description,
  definition(t) {
    t.field(Profile.id);
    t.field(Profile.name);
    t.field(Profile.username);
    t.field(Profile.createdAt);
    t.field(Profile.dateOfBirth);
    t.field(Profile.gender);
    t.field(Profile.height);
    t.field(Profile.performedWorkouts);
    t.field(Profile.programLibrary);
    t.field(Profile.trainingAge);
    t.field(Profile.updatedAt);
    t.field(Profile.weight);
    t.field(Profile.goals);
    t.field(Profile.user);
    t.field(Profile.followedBy);
    t.field(Profile.following);
    t.field(Profile.authoredPrograms);
    t.field(Profile.profileInitialsDefaultColor);
  },
});

export const GoalType = objectType({
  name: Goal.$name,
  definition(t) {
    t.field(Goal.id);
    t.field(Goal.profile);
    t.field(Goal.profileId);
    t.field(Goal.staticExercise);
    t.field(Goal.staticExerciseId);
    t.field(Goal.reps);
    t.field(Goal.weight);
  },
});

export const GenderEnumType = enumType({
  name: Gender.name,
  members: Gender.members,
});
