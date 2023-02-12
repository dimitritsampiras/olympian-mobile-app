import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { useUserProgramsQuery } from '../../../lib/graphql';
import { ScreenView } from '../../containers/ScreenView';
import { Heading } from '../../elements';
import { TabParamList } from '../../navigation';

type ProgramsProps = NativeStackScreenProps<TabParamList, 'Programs'>;

export const Programs: React.FC<ProgramsProps> = ({ route }) => {
  const { data } = useUserProgramsQuery();

  return (
    <ScreenView>
      <Heading>{route.name}</Heading>
      {data?.userPrograms.map((program) => {
        return (
          <View
            key={program.id}
            style={{ backgroundColor: 'white', marginVertical: 15, paddingVertical: 15 }}>
            <Text>{program.name}</Text>
          </View>
        );
      })}
    </ScreenView>
  );
};
