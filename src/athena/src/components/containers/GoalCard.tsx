import React from 'react';
import { SubHeading } from '../../components/elements';
import { View, Text } from 'react-native';
import { Card, CardProps } from '../containers/Card';
import { TrophyIcon } from 'react-native-heroicons/solid';
import theme from '../../theme';
export interface GoalCardProps {
  exercise: string;
  weight: number;
  reps: number;
  unit: 'kg' | 'lb';
}

export const GoalCard: React.FC<GoalCardProps> = ({ exercise, weight, reps, unit }) => {
  return (
    <Card
      onPress={() => {}}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        height: 80,
      }}>
      <TrophyIcon size={30} fill={theme.colors.amber[400]} style={{ marginRight: 20 }} />
      <View>
        <Text style={{ fontSize: 18 }}>{exercise}</Text>
        <Text style={{ fontWeight: 'bold' }}>
          {reps} x {weight} lb
        </Text>
      </View>
    </Card>
  );
};
