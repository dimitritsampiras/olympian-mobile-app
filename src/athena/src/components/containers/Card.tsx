import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, ViewStyle, ViewProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../theme';

export interface CardProps extends ViewProps {
  square?: boolean;
  children: ReactNode | ReactNode[];
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ style, square, onPress, children }) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, square && { width: 150, height: 150 }, style]}>
      {Array.isArray(children) ? children : <Text>{children}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 18,
  },
});
