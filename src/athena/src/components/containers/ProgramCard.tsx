import React from 'react';
import { Text, View } from 'react-native';
import { HeartIcon, GiftIcon } from 'react-native-heroicons/solid';
import theme from '../../theme';
import { Card } from './Card';

interface ProgramCardProps {
  Program: undefined;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ Program }) => {
  // TODO : Replace with Program props
  const likes = 32;
  const programName = 'Push Pull No Legs';
  const icon = <GiftIcon width={40} height={40}></GiftIcon>;
  // END TODO
  return (
    <Card
      style={{
        width: 160,
        height: 160,
        borderRadius: 25,
        marginHorizontal: 5,
      }}>
      {/* Icon */}
      <View
        style={{
          width: 50,
          height: 50,
          borderWidth: 1,
          borderColor: theme.gray[200],
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 10,
        }}>
        {icon}
      </View>

      {/* Title */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '900', fontSize: 16 }}>{programName}</Text>
      </View>

      {/* Hearts */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <HeartIcon width={20} fill={theme.rose[300]} />
        <Text>{likes}</Text>
      </View>
    </Card>
  );
};
