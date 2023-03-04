import React from 'react';
import { View, ViewProps } from 'react-native';
import { ThemeColor } from '../../../lib/types';
import theme from '../../../theme';
import { Card } from '../../containers/Card';
import { Heading } from '../typography/Heading';
import { Emoji } from './Emoji';

interface FitnessCategoryProps extends ViewProps {
  category: string;
  color: ThemeColor;
  emojiHex: string;
}

export const FitnessCategory: React.FC<FitnessCategoryProps> = ({
  category,
  color,
  emojiHex,
  style,
  ...props
}) => {
  return (
    <Card
      style={[
        {
          backgroundColor: theme.colors[color][500],
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}>
      <Heading as="h3" noMargin style={{ color: 'white', width: 80 }}>
        {category}
      </Heading>
      <View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme.radius.md,
        }}>
        <Emoji unicode={emojiHex} style={{ fontSize: 30 }} />
      </View>
    </Card>
  );
};
