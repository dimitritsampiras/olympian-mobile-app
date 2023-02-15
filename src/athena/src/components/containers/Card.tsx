import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import theme from '../../theme';

export interface CardProps {
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    borderColor: theme.colors.gray[100],
    borderWidth: 1,
    padding: 18,
  },
});
