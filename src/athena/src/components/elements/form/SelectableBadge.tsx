import React from 'react';
import { StyleSheet, Text, TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeColor } from '../../../lib/types';
import theme from '../../../theme';

interface SelectableBadgeProps extends TouchableOpacityProps {
  colorScheme: ThemeColor;
  selected?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

export const SelectableBadge: React.FC<SelectableBadgeProps> = ({
  colorScheme,
  style,
  selected,
  disabled,
  onSelect,
  children,
}) => {
  const handleOnPress = () => {
    onSelect();
  };

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      disabled={disabled}
      style={[
        styles.container,
        {
          backgroundColor:
            // @ts-ignore
            selected && !disabled ? theme.colors[colorScheme][50] : theme.colors.gray[50],
        },
        style,
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: !disabled
              ? selected
                ? theme.colors[colorScheme][700]
                : theme.colors.gray[700]
              : theme.colors.gray[300],
          },
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
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
  },
});
