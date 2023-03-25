import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { HeartIcon } from 'react-native-heroicons/solid';

import _, { sample } from 'lodash';

import { ProgramFragment } from '../../lib/graphql';
import theme from '../../theme';
import { Heading } from '../elements';
import { ProgramImage } from '../elements/display/ProgramImage';
import { Card } from './Card';

interface ProgramCardProps extends ViewProps {
  program: ProgramFragment;
  userOwned?: boolean;
  square?: boolean;
  to?: string;
  onPress?: () => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  square = false,
  userOwned = false,
  style,
  onPress,
  ...props
}) => {
  return (
    <Card
      square={square}
      onPress={onPress}
      style={[{ justifyContent: 'space-between' }, style]}
      {...props}>
      <View>
        <ProgramImage
          bgColor={program.programImageDefaultColor}
          emojiCode={program.programImageDefaultEmoji}
          size="md"
          style={{ marginBottom: 8 }}
        />
        <Heading as={square ? 'h4' : 'h3'}>{_.truncate(program.name, { length: 25 })}</Heading>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!userOwned ? (
          <>
            <HeartIcon width={16} fill={theme.colors.rose[600]} />
            <Text style={{ marginLeft: 5 }}>{sample([4, 15, 65, 23, 45, 26, 23, 12])}</Text>
          </>
        ) : (
          <>
            {/* {program.specificity.map((spec) => {
              return (
                <Badge key={spec} colorScheme={specificityColor(spec)} style={{ marginRight: 6 }}>
                  {spec}
                </Badge>
              );
            })} */}
          </>
        )}
      </View>
    </Card>
  );
};
