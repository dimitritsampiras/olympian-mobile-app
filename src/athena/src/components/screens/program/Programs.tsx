import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUserProgramsQuery } from '../../../lib/graphql';
import { ScreenView } from '../../containers/ScreenView';
import { Heading } from '../../elements';
import { TabParamList } from '../../navigation';

type ProgramsProps = NativeStackScreenProps<TabParamList, 'Programs'>;

export const Programs: React.FC<ProgramsProps> = ({ route }) => {
  const navigation = useNavigation();

  const { data } = useUserProgramsQuery();

  return (
    <ScreenView>
      <Heading>{route.name}</Heading>
      {data?.userPrograms.map((program) => {
        return (
          <TouchableOpacity
            // onPress={() =>
            //   navigation.navigate('Program', { screen: 'Program', programId: program.id })
            // }
            key={program.id}
            style={{ backgroundColor: 'white', marginVertical: 15, paddingVertical: 15 }}>
            <Text>{program.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScreenView>
  );
};
