import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import theme from '../../theme';

interface CardProps {
  style?: ViewStyle;
  children: ReactNode | ReactNode[];
}

export const Card: React.FC<CardProps> = ({ style, children }) => {
  return (
    <View style={[styles.container, style]}>
      {Array.isArray(children) ? children : <Text>{children}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 18,
    borderColor: theme.colors.gray[100],
    borderWidth: 1,
    padding: 22,
  },
});
