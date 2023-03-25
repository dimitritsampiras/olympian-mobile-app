import React from 'react';
import { Text, View, ViewProps } from 'react-native';

import _, { sample } from 'lodash';

import { Profile, ProgramFragment } from '../../lib/graphql';
import { Heading } from '../elements';
import { ProgramImage } from '../elements/display/ProgramImage';
import { Card } from './Card';
import { ProfileName } from '../elements/display/ProfileName';

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
        {userOwned ? <></> : <ProfileName profile={program.authors[0] as Profile} />}
      </View>
    </Card>
  );
};
