/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import theme from '../../theme';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { MiniPlayer } from './MiniPlayer';
import { Player } from './Player';

import { ActiveWorkoutContext, RouteContext } from '../../lib/context';
import { HomeParamList } from '../navigation/HomeNavigator';
import { ProgramParamList } from '../navigation/ProgramNavigator';
import { DiscoverParamList, TabParamList } from '../navigation';
import { MyProgramsParamList } from '../navigation/MyProgramsNavigator';

const { height, width } = Dimensions.get('window');
const TABBAR_HEIGHT = 98;
const MINIMIZED_PLAYER_HEIGHT = 45;
const SNAP_BOTTOM = 0;
const SNAP_TOP = -(height - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT);
const MIN_SWIPE_DISTANCE = 50;

const TAB_BAR_HIDDEN_ROUTES: Array<
  | keyof HomeParamList
  | keyof TabParamList
  | keyof ProgramParamList
  | keyof DiscoverParamList
  | keyof MyProgramsParamList
> = ['CreateProgram'];

export const TabBar: React.FC<BottomTabBarProps> = ({ descriptors, navigation, state }) => {
  const { routeName } = useContext(RouteContext);
  const { activeWorkout, completed, toComplete, finishWorkout, index } =
    useContext(ActiveWorkoutContext);

  const [hideBar, setHideBar] = useState(
    TAB_BAR_HIDDEN_ROUTES.includes(routeName as typeof TAB_BAR_HIDDEN_ROUTES[0])
  );

  const translationY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startingY: number }) => {
      ctx.startingY = translationY.value;
    },
    onActive: (event, ctx: { startingY: number }) => {
      translationY.value = Math.min(
        Math.max(SNAP_TOP, ctx.startingY + event.translationY),
        SNAP_BOTTOM
      );
    },

    onEnd: (event) => {
      const swipeDistance = event.translationY;
      const currentY = translationY.value;
      let targetY;
      if (swipeDistance < -MIN_SWIPE_DISTANCE && currentY !== SNAP_TOP) {
        // Swipe up and not already at the top, snap to top
        targetY = SNAP_TOP;
      } else if (swipeDistance > MIN_SWIPE_DISTANCE && currentY !== SNAP_BOTTOM) {
        // Swipe down and not already at the bottom, snap to bottom
        targetY = SNAP_BOTTOM;
      } else {
        // Snap to the nearest snap point
        targetY = currentY > (SNAP_TOP + SNAP_BOTTOM) / 2 ? SNAP_BOTTOM : SNAP_TOP;
      }
      translationY.value = withSpring(targetY, {
        overshootClamping: true,
        damping: 20,
        stiffness: 150,
        mass: 1,
      });
    },
  });

  const handleMiniPlayerPress = () => {
    translationY.value = withSpring(SNAP_TOP, {
      overshootClamping: true,
      damping: 20,
      stiffness: 150,
      mass: 1,
    });
  };

  const hideTabBarAnimatedStyle = useAnimatedStyle(() => {
    // translationY.value = hideBar ? TABBAR_HEIGHT + MINIMIZED_PLAYER_HEIGHT : 0;

    return {
      transform: [
        { translateY: withTiming(hideBar ? TABBAR_HEIGHT + MINIMIZED_PLAYER_HEIGHT : 0) },
      ],
    };
  });

  const visibleMinimizedPlayerAnimatedStyle = useAnimatedStyle(() => {
    // translationY.value = !activeWorkout ? TABBAR_HEIGHT + MINIMIZED_PLAYER_HEIGHT : 0;
    return {
      transform: [{ translateY: withTiming(0) }],
    };
  });

  const hideMinimizedPlayerAnimatedStyle = useAnimatedStyle(() => {
    // translationY.value = !activeWorkout ? TABBAR_HEIGHT + MINIMIZED_PLAYER_HEIGHT : 0;
    return {
      transform: [{ translateY: withTiming(TABBAR_HEIGHT + MINIMIZED_PLAYER_HEIGHT) }],
    };
  });

  const translateYAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translationY.value }],
    };
  });

  const bottomTabBarAnimatedStyle = useAnimatedStyle(() => {
    const output = interpolate(translationY.value, [0, -40], [0, TABBAR_HEIGHT]);
    return {
      transform: [{ translateY: Math.max(Math.min(output, TABBAR_HEIGHT), 0) }],
    };
  });

  const miniPlayerOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translationY.value, [0 - MINIMIZED_PLAYER_HEIGHT, 0], [0, 1]),
    };
  });

  const playerOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translationY.value, [0, -(MINIMIZED_PLAYER_HEIGHT * 2)], [0, 1]),
    };
  });

  useEffect(() => {
    setHideBar(TAB_BAR_HIDDEN_ROUTES.includes(routeName as typeof TAB_BAR_HIDDEN_ROUTES[0]));
  }, [routeName]);

  return (
    <Animated.View style={[hideTabBarAnimatedStyle]}>
      {activeWorkout && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[translateYAnimatedStyle]}>
            <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                { height, width },
                { transform: [{ translateY: -TABBAR_HEIGHT }] },
                playerOpacityStyle,
              ]}>
              <Player />
            </Animated.View>
            <Animated.View
              style={[
                miniPlayerOpacityStyle,
                activeWorkout
                  ? hideMinimizedPlayerAnimatedStyle
                  : visibleMinimizedPlayerAnimatedStyle,
              ]}>
              <MiniPlayer
                style={{ height: MINIMIZED_PLAYER_HEIGHT, bottom: TABBAR_HEIGHT }}
                activeWorkout={activeWorkout}
                onPress={handleMiniPlayerPress}
                completed={completed}
                finishWorkout={finishWorkout}
                toComplete={toComplete}
                index={index}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      )}

      <Animated.View style={[style.bar, bottomTabBarAnimatedStyle]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]!;

          const Icon = options.tabBarIcon!;

          const isFocused = state.index === index;
          const color = isFocused ? theme.colors.blue[500] : theme.colors.gray[300];
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity key={route.name} onPress={onPress} style={{ padding: 10 }}>
              {/* 
            // @ts-ignore */}
              <Icon color={color} focused={isFocused} size={24} />
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  bar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: TABBAR_HEIGHT,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  player: {
    position: 'absolute',
    // bottom: 0,
  },
  miniPlayer: {
    backgroundColor: 'white',
    height: MINIMIZED_PLAYER_HEIGHT,
    borderColor: theme.colors.gray[100],
    borderWidth: 1,
    position: 'absolute',
    bottom: TABBAR_HEIGHT,
    width: '100%',
  },
});
