import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface BadgeProps extends ViewProps {}

export const Badge: React.FC<BadgeProps> = ({ style }) => {
  return <View style={[styles.container, style]}></View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6200EE',
    padding: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
