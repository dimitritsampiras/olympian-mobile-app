import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import theme from '../../../theme';
import { BodyText } from '../typography';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from 'react-native-heroicons/solid';

interface AlertIconTextProps extends ViewProps {
  status?: 'error' | 'success' | 'warning' | 'info';
}

export const AlertIconText: React.FC<AlertIconTextProps> = ({ status, children, style }) => {
  let colour;
  let icon;
  const iconSize = 40;
  switch (status) {
    case 'error':
      colour = theme.colors.red[100];
      icon = (
        <ExclamationCircleIcon
          width={iconSize}
          fill={theme.colors.red[600]}></ExclamationCircleIcon>
      );
      break;
    case 'success':
      colour = theme.colors.green[100];
      icon = <CheckCircleIcon width={iconSize} fill={theme.colors.green[600]}></CheckCircleIcon>;
      break;
    case 'warning':
      colour = theme.colors.yellow[100];
      icon = (
        <ExclamationTriangleIcon
          width={iconSize}
          fill={theme.colors.yellow[600]}></ExclamationTriangleIcon>
      );
      break;
    case 'info':
      colour = theme.colors.blue[100];
      icon = (
        <InformationCircleIcon
          width={iconSize}
          fill={theme.colors.blue[600]}></InformationCircleIcon>
      );
      break;
  }
  return (
    <View
      style={[
        styles.infoContainer,
        {
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexDirection: 'row',
          backgroundColor: colour,
        },
        style,
      ]}>
      {icon}
      <BodyText style={{ textAlignVertical: 'center' }}>{children}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: theme.radius.md,
    marginBottom: 24,
  },
});
