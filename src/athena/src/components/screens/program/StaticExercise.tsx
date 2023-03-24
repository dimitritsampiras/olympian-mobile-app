import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScreenView } from '../../containers/ScreenView';
import { Heading } from '../../elements';
import { PlusCircleIcon } from 'react-native-heroicons/outline';
import theme from '../../../theme';
import Body from 'react-native-body-highlighter';
import { Header } from '../../containers/Header';
import { useCreateExerciseMutation, useStaticExerciseFromIdQuery } from '../../../lib/graphql';
import { MuscleChip } from '../../elements/display/MuscleChip';
import { BodyText } from '../../elements/typography/BodyText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProgramParamList } from '../../navigation/ProgramNavigator';

type StaticExerciseProps = NativeStackScreenProps<ProgramParamList, 'StaticExercise'>;

export const StaticExercise: React.FC<StaticExerciseProps> = ({ route, navigation }) => {
  const { staticExerciseId, workoutId } = route.params;
  const [muscles, setMuscles] = useState<{ muscle: UIMuscleSlugs; intensity: 1 | 2 }[]>([]);

  const { data } = useStaticExerciseFromIdQuery({
    variables: { staticExerciseId },
  });

  const [createExercise] = useCreateExerciseMutation();

  const handleAddExercise = async () => {
    await createExercise({
      variables: {
        staticExerciseId,
        workoutId,
      },
    }).then(({ data }) => {
      if (data?.createExercise) {
        navigation.goBack();
        navigation.goBack();
        navigation.navigate('Exercise', { exerciseId: data?.createExercise?.id });
      }
    });
  };

  useEffect(() => {
    const primary = data?.staticExercise?.primaryTargetMuscle;
    const secondary = data?.staticExercise?.secondaryTargetMuscle;
    const tertiary = data?.staticExercise?.tertiaryTargetMuscle;
    setMuscles([]);
    if (primary)
      setMuscles((prev) => [
        ...prev,
        { muscle: primary.replace('_', '-') as UIMuscleSlugs, intensity: 1 },
      ]);
    if (secondary)
      setMuscles((prev) => [
        ...prev,
        { muscle: secondary.replace('_', '-') as UIMuscleSlugs, intensity: 2 },
      ]);
    if (tertiary)
      setMuscles((prev) => [
        ...prev,
        { muscle: tertiary.replace('_', '-') as UIMuscleSlugs, intensity: 2 },
      ]);
  }, [data]);

  return (
    <ScreenView>
      {data?.staticExercise && (
        <>
          <Header row navigation={navigation} style={{ paddingBottom: 44 }}>
            <Heading noMargin style={{ width: 250 }}>
              {data?.staticExercise?.name}
            </Heading>
            <TouchableOpacity onPress={handleAddExercise}>
              <PlusCircleIcon width={22} style={{ marginTop: 4 }}></PlusCircleIcon>
            </TouchableOpacity>
          </Header>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 60,
            }}>
            <Body
              data={muscles.map((m) => ({
                slug: m.muscle,
                intensity: m.intensity,
                color: theme.colors.blue[500],
              }))}
              scale={1}
              frontOnly
              colors={[theme.colors.blue[600], theme.colors.blue[300]]}
            />
            <Body
              data={[]}
              scale={1}
              frontOnly
              colors={[theme.colors.blue[600], theme.colors.blue[300]]}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            {muscles.map(({ muscle, intensity }) => (
              <MuscleChip key={muscle} intensity={intensity} style={{ marginRight: 4 }}>
                {muscle}
              </MuscleChip>
            ))}
          </View>
          <View style={{ marginTop: 28, marginBottom: 208 }}>
            <Heading as="h3">Description</Heading>
            <BodyText>{data.staticExercise.description}</BodyText>
          </View>
        </>
      )}
    </ScreenView>
  );
};

export type UIMuscleSlugs =
  | 'trapezius'
  | 'upper-back'
  | 'lower-back'
  | 'chest'
  | 'biceps'
  | 'triceps'
  | 'forearm'
  | 'back-deltoids'
  | 'front-deltoids'
  | 'abs'
  | 'obliques'
  | 'adductor'
  | 'hamstring'
  | 'quadriceps'
  | 'abductors'
  | 'calves'
  | 'gluteal'
  | 'head'
  | 'neck';
