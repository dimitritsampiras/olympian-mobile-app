import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import { Card, CardProps } from './Card';
import { HeroIcon } from '../../lib/types';
import { ViewProps } from 'react-native';
import theme from '../../theme';

interface SettingsCardProps extends CardProps {
  Icon: HeroIcon;
  iconProps?: React.ComponentProps<HeroIcon>;
  iconStyle?: ViewProps['style'];
  excludeChevron?: boolean;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
  Icon,
  iconProps = { size: 26, fill: theme.colors.blue[500] },
  iconStyle = { marginRight: 10 },
  children,
  excludeChevron,
  ...props
}) => {
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2%',
      }}
      isLink={true}
      {...props}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={iconProps.size} fill={iconProps.fill} style={iconStyle} />
        {children}
      </View>
      {!excludeChevron && <ChevronRightIcon size={iconProps.size}></ChevronRightIcon>}
    </Card>
  );
};
