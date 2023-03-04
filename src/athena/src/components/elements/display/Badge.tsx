import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { ThemeColor } from '../../../lib/types';
import theme from '../../../theme';

interface BadgeProps extends ViewProps {
  colorScheme: ThemeColor;
}

export const Badge: React.FC<BadgeProps> = ({
  colorScheme,
  style,

  children,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          // @ts-ignore
          backgroundColor: theme.colors[colorScheme][50],
        },
        style,
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: theme.colors[colorScheme][700],
          },
        ]}>
        {children}
      </Text>
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
    borderRadius: theme.radius.full,
  },
  text: {
    fontWeight: '500',
    fontSize: 11,
  },
});
