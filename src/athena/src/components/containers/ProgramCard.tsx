import React from 'react';
import { Text, View } from 'react-native';
import { HeartIcon, GiftIcon } from 'react-native-heroicons/solid';
import { Program } from '../../lib/graphql';
import theme from '../../theme';
import { ProgramImage } from '../elements/display/ProgramImage';
import { Card } from './Card';

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  // TODO : Replace with Program props
  const likes = 32;
  const programName = program.name;
  const icon = <ProgramImage size={'small'}></ProgramImage>;
  // END TODO
  return (
    <Card
      style={{
        width: 150,
        height: 150,
        borderRadius: 25,
        marginHorizontal: 5,
      }}>
      {/* Icon */}
      {icon}

      {/* Title */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '900', fontSize: 16 }}>{programName}</Text>
      </View>

      {/* Hearts */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <HeartIcon width={20} fill={theme.colors.rose[300]} />
        <Text>{likes}</Text>
      </View>
    </Card>
  );
};
