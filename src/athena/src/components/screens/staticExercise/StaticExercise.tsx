import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ScreenView } from '../../containers/ScreenView';
import { DynamicButton, Heading } from '../../elements';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import theme from '../../../theme';
import Body from 'react-native-body-highlighter';
import { HorizontalCardScroller } from '../../containers/HorizontalCardScroller';

interface StaticExerciseProps {}

interface IStaticExerciseData {
  name: string;
  description: string;
  muscleSlugs: UIMuscleSlugs[];
}
const dummyStaticExerciseData: IStaticExerciseData = {
  name: 'BB Bench Press',
  description: 'This is the description',
  muscleSlugs: ['chest', 'head', 'forearm', 'triceps', 'neck'],
};

export const StaticExercise: React.FC<StaticExerciseProps> = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<UIMuscleSlugs>(
    dummyStaticExerciseData.muscleSlugs[0] || 'chest'
  );

  const bodyData = [
    {
      slug: selectedMuscle,
      intensity: 2,
      color: 'blue',
    },
  ];

  return (
    <ScreenView>
      <View
        style={{
          paddingTop: 25,
          paddingBottom: 25,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <Heading noMargin>{dummyStaticExerciseData.name}</Heading>
          <DynamicButton style={{ width: 50, backgroundColor: 'transparent' }}>
            <PlusCircleIcon width={18} fill={theme.colors.gray[500]}></PlusCircleIcon>
          </DynamicButton>
        </View>
        <View
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 60,
          }}>
          <Body
            data={bodyData}
            scale={1}
            frontOnly
            colors={[theme.colors.blue[600], theme.colors.blue[300]]}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <HorizontalCardScroller>
            {dummyStaticExerciseData.muscleSlugs.map((muscle) => (
              <DynamicButton
                key={muscle}
                onPress={() => setSelectedMuscle(muscle)}
                style={{
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 18,
                  paddingRight: 18,
                  borderRadius: 8,
                  marginRight: 10,
                  backgroundColor:
                    selectedMuscle === muscle ? theme.colors.blue[400] : theme.colors.blue[200],
                }}>
                <Text style={{ color: 'white', fontSize: 8 }}>{muscle.toUpperCase()}</Text>
              </DynamicButton>
            ))}
          </HorizontalCardScroller>
        </View>
        <View style={{ marginTop: 28 }}>
          <Text style={{ fontSize: 13, color: theme.colors.black, fontWeight: '700' }}>
            Description
          </Text>
          <Text style={{ fontSize: 12, color: theme.colors.gray[500], fontWeight: '500' }}>
            {dummyStaticExerciseData.description}
          </Text>
        </View>
      </View>
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
