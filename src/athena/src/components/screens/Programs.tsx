import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useUserProgramsQuery } from '../../lib/graphql';
import { Header } from '../containers/Header';
import { ProgramCard } from '../containers/ProgramCard';
import { ScreenView } from '../containers/ScreenView';
import { Heading } from '../elements';
import { MyProgramsParamList } from '../navigation/MyProgramsNavigator';

type ProgramsProps = NativeStackScreenProps<MyProgramsParamList, 'MyPrograms'>;

export const Programs: React.FC<ProgramsProps> = ({ navigation }) => {
  const { data } = useUserProgramsQuery({
    fetchPolicy: 'no-cache',
  });

  const navigateToProgram = (programId: string) => {
    navigation.navigate('ProgramNavigator', { programId, back: true });
  };

  return (
    <ScreenView>
      <Header>
        <Heading>My Programs</Heading>
      </Header>
      {data?.userPrograms.map((program) => (
        <ProgramCard
          userOwned
          key={program.id}
          onPress={() => navigateToProgram(program.id)}
          program={program}
          style={{ marginBottom: 8 }}
        />
      ))}
    </ScreenView>
  );
};
