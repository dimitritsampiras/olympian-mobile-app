import React from 'react';
import { Text, View } from 'react-native';
import theme from '../../../theme';

interface ExerciseOrderProps {
  order: number;
}

export const ExerciseOrder: React.FC<ExerciseOrderProps> = ({ order }) => {
  return (
    <View
      style={{
        backgroundColor: exerciseOrderToColor[(order % 7) as 1 | 2][50],
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginRight: 14,
      }}>
      <Text
        style={{
          color: exerciseOrderToColor[(order % 7) as 1][500],
          fontWeight: '600',
        }}>
        {order}
      </Text>
    </View>
  );
};

const exerciseOrderToColor = {
  0: theme.colors.purple,
  1: theme.colors.violet,
  2: theme.colors.rose,
  3: theme.colors.orange,
  4: theme.colors.lime,
  5: theme.colors.teal,
  6: theme.colors.blue,
  7: theme.colors.purple,
} as const;
