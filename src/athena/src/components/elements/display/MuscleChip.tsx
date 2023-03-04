import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import theme from '../../../theme';

interface MuscleChipProps extends ViewProps {
  intensity: 1 | 2;
}

export const MuscleChip: React.FC<MuscleChipProps> = ({ intensity, style, children }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: intensity === 1 ? theme.colors.blue[500] : theme.colors.blue[300],
        },
        style,
      ]}>
      <Text style={[styles.text]}>{children?.toString().replace('-', ' ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: theme.radius.sm,
  },
  text: {
    fontWeight: '500',
    fontSize: 10,
    textTransform: 'uppercase',
    color: 'white',
  },
});
