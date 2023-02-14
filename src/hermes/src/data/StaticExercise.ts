import { StaticExercise, Equipment } from '@prisma/client';

export const mockStaticExerciseData: StaticExercise[] = [
  {
    id: 'id1',
    name: 'Bicep Curls',
    movement: 'isolation',
    equipment: Equipment.dumbell,
  },
  {
    id: 'id2',
    name: 'Barbell Curls',
    movement: 'isolation',
    equipment: Equipment.barbell,
  },
  {
    id: 'id3',
    name: 'Ball Squats',
    movement: 'isolation',
    equipment: Equipment.ball,
  },
  {
    id: 'id4',
    name: 'Rubber Band Curls',
    movement: 'isolation',
    equipment: Equipment.band,
  },
  {
    id: 'id5',
    name: 'Sholder Dumbell Curls',
    movement: 'isolation',
    equipment: Equipment.dumbell,
  },
  {
    id: 'id6',
    name: 'Preacher Curls',
    movement: 'isolation',
    equipment: Equipment.barbell,
  },
  {
    id: 'id7',
    name: 'Leg Press',
    movement: 'isolation',
    equipment: Equipment.machine,
  },
  {
    id: 'id8',
    name: 'Peck Crusher',
    movement: 'isolation',
    equipment: Equipment.machine,
  },
  {
    id: 'id9',
    name: 'Cable Rows',
    movement: 'isolation',
    equipment: Equipment.machine,
  },
  {
    id: 'id10',
    name: 'Barbell Rows',
    movement: 'isolation',
    equipment: Equipment.barbell,
  },
];
