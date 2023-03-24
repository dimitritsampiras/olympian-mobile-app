import React from 'react';
import { GlobeAltIcon, UserGroupIcon, UserIcon } from 'react-native-heroicons/solid';
import {
  GlobeAltIcon as GlobeAltIconOutLine,
  UserGroupIcon as UserGroupIconOutline,
  UserIcon as UserIconOutline,
} from 'react-native-heroicons/outline';

import { NumberProp } from 'react-native-svg';
import { Publicity } from '../../../lib/graphql';
import theme from '../../../theme';

interface PublicityIconProps {
  publicity: Publicity;
  fill?: string;
  fontSize?: NumberProp;
  outline?: boolean;
}

export const PublicityIcon: React.FC<PublicityIconProps> = ({
  publicity,
  fill = theme.colors.gray[400],
  outline = false,
  ...props
}) => {
  if (!outline) {
    if (publicity === Publicity.Friends) return <UserGroupIcon size="18" fill={fill} {...props} />;
    if (publicity === Publicity.Private) return <UserIcon size="18" fill={fill} {...props} />;
    return <GlobeAltIcon size="18" fill={fill} {...props} />;
  }

  if (publicity === Publicity.Friends)
    return <UserGroupIconOutline size="18" stroke={fill} {...props} />;
  if (publicity === Publicity.Private)
    return <UserIconOutline size="18" stroke={fill} {...props} />;
  return <GlobeAltIconOutLine size="18" stroke={fill} {...props} />;
};
