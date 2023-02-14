import React from 'react';
import { StyleSheet, Pressable, ViewStyle, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import theme from '../../theme';
import { Exercise } from '../../lib/graphql';
import { UIMuscleSlugs } from '../screens/staticExercise/StaticExercise';
import { View } from 'react-native';
import { Heading } from './typography/Heading';
import Body from 'react-native-body-highlighter';

interface ExerciseCardProps {
  // container styles
  style?: ViewStyle;
  exercise: Exercise & { muscles: UIMuscleSlugs[]; name: string };
  //card press
  onPress?: (exerciseId: string) => void;
}

/**
 * Exercise Card Element
 * @param ExerciseCardProps properties of an Exercise Card element
 * @returns JSX element
 */
export const ExerciseCard: React.FC<ExerciseCardProps> = ({ style, onPress, ...props }) => {
  const { exercise } = props;
  const { id, name, muscles, reps, rpe, sets } = exercise;

  const bodyData = muscles.map((muscle) => {
    return {
      slug: muscle,
      intensity: 2,
      color: 'blue',
    };
  });

  const handlePress = () => {
    if (onPress) {
      onPress(id);
    }
  };

  return (
    <Pressable style={[{ ...style }, styles.pressable]} onPress={handlePress} {...props}>
      {({ pressed }) => (
        <Animated.View style={[styles.card]}>
          <View style={[styles.body]} pointerEvents="none">
            <Body
              data={bodyData}
              scale={0.4}
              frontOnly
              colors={[theme.colors.blue[600], theme.colors.blue[300]]}
            />
          </View>
          <Heading style={[styles.heading]}>{name}</Heading>
          <Text style={[styles.subheading]}>
            {reps}x{sets} @ {rpe} RPE
          </Text>
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    height: 181,
    width: 181,
  },
  card: {
    height: 181,
    width: 181,
    borderRadius: 30,
    padding: 22,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: { fontWeight: '700', fontSize: 16, lineHeight: 19, flex: 1 },
  subheading: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 15,
    color: theme.colors.gray[400],
    flex: 1,
  },
  body: { flex: 3, display: 'flex', justifyContent: 'flex-end' },
});
