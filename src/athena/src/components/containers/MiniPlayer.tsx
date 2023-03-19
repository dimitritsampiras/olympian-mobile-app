import React from 'react';
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/mini';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { ActiveWorkoutQuery } from '../../lib/graphql';
import theme from '../../theme';

interface MiniPlayerProps extends PressableProps {
  style: ViewProps['style'];
  activeWorkout: ActiveWorkoutQuery['activeWorkout'];
  completed: number;
  toComplete: number;
  finishWorkout: () => Promise<void>;
}

const screenWidth = Dimensions.get('window').width;

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  style,
  activeWorkout,
  completed,
  toComplete,
  finishWorkout,
  ...props
}) => {
  const progressWidthStyle = useAnimatedStyle(() => {
    const spring = withSpring(screenWidth * (completed / toComplete), {
      overshootClamping: true,
    });
    console.log(spring);
    return { width: spring };
  });

  return (
    <Pressable
      style={[
        {
          backgroundColor: 'white',
          borderColor: theme.colors.gray[100],
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          width: '100%',
          justifyContent: 'center',
        },
        style,
      ]}
      {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={finishWorkout}
          style={{
            borderRadius: 999,
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <XMarkIcon size={22} color={theme.colors.gray[600]} />
        </TouchableOpacity>
        <Text style={styles.workoutName}>{activeWorkout?.workout.name}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 2,
          width: '100%',
          backgroundColor: theme.colors.gray[100],
        }}>
        <Animated.View
          style={[
            {
              height: '100%',
              backgroundColor: theme.colors.blue[600],
            },
            progressWidthStyle,
          ]}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  workoutName: {
    fontWeight: '600',
    marginLeft: 4,
  },
});
