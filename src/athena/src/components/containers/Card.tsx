import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import theme from '../../theme';

interface CardProps {
  style?: ViewStyle;
  square?: boolean;
  children: ReactNode | ReactNode[];
}

export const Card: React.FC<CardProps> = ({ style, square, children }) => {
  return (
    <View style={[styles.container, style, square && { width: 150, height: 150 }]}>
      {Array.isArray(children) ? children : <Text>{children}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    borderColor: theme.colors.gray[100],
    borderWidth: 1,
    padding: 18,
  },
});
