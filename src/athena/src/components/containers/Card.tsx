import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import theme from '../../theme';

export interface CardProps {
  style?: ViewStyle;
  isLink?: boolean;
  onPress?: () => void;
  children: ReactNode | ReactNode[];
}

export const Card: React.FC<CardProps> = ({ style, isLink, onPress, children }) => {
  if (isLink) {
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        {Array.isArray(children) ? children : <Text>{children}</Text>}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]}>
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
    borderRadius: 18,
    borderColor: theme.colors.gray[100],
    borderWidth: 1,
    padding: 22,
  },
});
