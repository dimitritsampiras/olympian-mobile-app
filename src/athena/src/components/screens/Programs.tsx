import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUserProgramsQuery } from '../../lib/graphql';
import { Header } from '../containers/Header';
import { ProgramCard } from '../containers/ProgramCard';
import { ScreenView } from '../containers/ScreenView';
import { Heading } from '../elements';
import { TabParamList } from '../navigation';
import { MyProgramsParamList } from '../navigation/MyProgramsNavigator';

type ProgramsProps = NativeStackScreenProps<MyProgramsParamList, 'MyPrograms'>;

export const Programs: React.FC<ProgramsProps> = ({ route, navigation }) => {
  const { data } = useUserProgramsQuery();

  const navigateToProgram = (programId: string) => {
    // navigation.navigate('Program', { programId });
  };

  return (
    <ScreenView>
      <Header>
        <Heading>{route.name}</Heading>
      </Header>
      {data?.userPrograms.map((program) => (
        <ProgramCard
          key={program.name}
          onPress={() => navigateToProgram(program.id)}
          program={program}
          style={{ marginBottom: 8 }}
        />
      ))}
    </ScreenView>
  );
};
