import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import theme from '../../../theme';
import _ from 'lodash';

interface WorkoutImageProps extends ViewProps {
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
}

const colors = Object.entries(theme.colors).reduce<string[]>((accum, current) => {
  const value = current[1];
  if (typeof value === 'string') return accum;
  return [...accum, value[200]];
}, []);

/**
 *
 *
 */
export const WorkoutImage: React.FC<WorkoutImageProps> = ({
  size = 'medium',
  placeholder = '🏋🏻‍♀️',
  style,
}) => {
  const dimension = size === 'small' ? 32 : size === 'medium' ? 64 : 128;
  return (
    <View
      style={[
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension * 0.35,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: _.sample(colors),
        },
        style,
      ]}>
      <Text style={{ fontSize: dimension / 2.2, textAlign: 'center' }}>{placeholder}</Text>
    </View>
  );
};
