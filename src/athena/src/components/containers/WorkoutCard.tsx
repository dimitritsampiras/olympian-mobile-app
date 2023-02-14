import React from 'react';
import { Text, View } from 'react-native';
import { Workout } from '../../lib/graphql';
import { WorkoutImage } from '../elements/display/WorkoutImage';
import { Card } from './Card';

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  // TODO : Replace with Program props
  const numExercises = 6;
  const workoutName = workout.name;
  const icon = <WorkoutImage size={'medium'}></WorkoutImage>;
  // END TODO
  return (
    <Card
      style={{
        width: 150,
        height: 150,
        borderRadius: 25,
        marginHorizontal: 5,
      }}>
      {/* Icon */}
      {icon}

      {/* Title */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '900', fontSize: 16 }}>{workoutName}</Text>
      </View>

      {/* Hearts */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{numExercises} exercises</Text>
      </View>
    </Card>
  );
};
