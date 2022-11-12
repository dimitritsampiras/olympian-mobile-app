import { objectType } from 'nexus';

export const AppError = objectType({
  name: 'AppError',
  definition(t) {
    t.string('name');
    t.string('message');
    t.string('createdAt'); // iso
  }
});
