import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import theme from '../../../theme';
import _ from 'lodash';
import { Emoji } from './Emoji';

interface ProgramImageProps extends ViewProps {
  size?: 'sm' | 'md' | 'lg';
  emojiCode?: string;
  bgColor?: string;
}

const SM_SIZE = 32;
const MD_SIZE = 48;
const LG_SIZE = 64;

/**
 *
 *
 */
export const ProgramImage: React.FC<ProgramImageProps> = ({
  size = 'md',
  emojiCode = '1F93D',
  bgColor = theme.colors.violet[100],
  style,
}) => {
  const dimension = size === 'sm' ? SM_SIZE : size === 'md' ? MD_SIZE : LG_SIZE;
  return (
    <View
      style={[
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension * 0.35,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: bgColor,
        },
        style,
      ]}>
      <Emoji style={{ fontSize: dimension / 2.2, textAlign: 'center' }} unicode={emojiCode} />
    </View>
  );
};
