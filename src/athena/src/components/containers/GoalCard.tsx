import React from 'react';
import { SubHeading } from '../../components/elements';
import { View, Text } from 'react-native';
import { Card, CardProps } from '../containers/Card';
import { TrophyIcon } from 'react-native-heroicons/solid';
import theme from '../../theme';
export interface GoalCardProps {
  exercise: string;
  target: number;
  unit: 'kg' | 'lb';
}

export const GoalCard: React.FC<GoalCardProps> = ({ exercise, target, unit }) => {
  return (
    <Card
      onPress={() => {}}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        height: 80,
      }}>
      <TrophyIcon size={30} style={{ marginRight: 20 }} />
      <Text style={{ fontSize: 18 }}>{exercise}</Text>
      <Text style={{ fontWeight: 'bold' }}>
        {target} {unit}
      </Text>
    </Card>
  );
};
