import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { useCreateSetMutation, useExerciseFromIdQuery } from '../../../lib/graphql';
import theme from '../../../theme';
import { Header } from '../../containers/Header';
import { ScreenView } from '../../containers/ScreenView';
import { SetCard } from '../../containers/SetCard';
import { Button, Heading, SubHeading } from '../../elements';
import { ProgramParamList } from '../../navigation/ProgramNavigator';

type ExerciseProps = NativeStackScreenProps<ProgramParamList, 'Exercise'>;

export const Exercise: React.FC<ExerciseProps> = ({ navigation, route }) => {
  const { exerciseId } = route.params;

  const { data, refetch } = useExerciseFromIdQuery({
    variables: { exerciseId },
  });

  const [appendSet] = useCreateSetMutation();

  const handleAddSet = async () => {
    await appendSet({ variables: { exerciseId } });
    await refetch();
  };

  return (
    <ScreenView>
      {data?.exercise && (
        <>
          <Header navigation={navigation} style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: exerciseOrderToColor[(data.exercise.order % 7) as 1 | 2][50],
                  height: 30,
                  width: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 7,
                  marginRight: 14,
                }}>
                <Text
                  style={{
                    color: exerciseOrderToColor[(data.exercise.order % 7) as 1][500],
                    fontWeight: '600',
                  }}>
                  {data.exercise.order}
                </Text>
              </View>
              <View>
                <Heading as="h2" style={{ marginBottom: 3, width: 220 }}>
                  {data.exercise.staticExercise.name}
                </Heading>
                <SubHeading as="h3" style={{ marginBottom: 0 }}>
                  {data.exercise.order} of 5
                </SubHeading>
              </View>
            </View>
          </Header>
          <View>
            {[...data.exercise.sets]
              .sort((a, b) => a.number - b.number)
              .map((set) => {
                return <SetCard key={set.id} set={set} style={{ marginBottom: 8 }} />;
              })}

            <Button
              variant="flat"
              colorScheme="info"
              style={{ marginTop: 4 }}
              onPress={handleAddSet}>
              Add Set
            </Button>
          </View>
        </>
      )}
    </ScreenView>
  );
};

const exerciseOrderToColor = {
  0: theme.colors.purple,
  1: theme.colors.violet,
  2: theme.colors.rose,
  3: theme.colors.orange,
  4: theme.colors.lime,
  5: theme.colors.teal,
  6: theme.colors.blue,
  7: theme.colors.purple,
} as const;
