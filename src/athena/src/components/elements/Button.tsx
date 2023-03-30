import * as Haptics from 'expo-haptics';
import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  ViewStyle,
  PressableProps,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import theme from '../../theme';

interface ButtonProps extends PressableProps {
  variant?: 'full' | 'flat' | 'ghost';
  // button can't be pressed
  disabled?: boolean;
  // fit-content instead of full width
  auto?: boolean;
  // is button loading
  loading?: boolean;
  // disable button animations or now
  animated?: boolean;
  // container styles
  style?: ViewStyle;
  colorScheme?: 'primary' | 'info' | 'success';
  // single react node i.e. text or icon
  children: ReactNode;
}

/**
 * Button Element
 * @param ButtonProps properties of a button element
 * @returns JSX element
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'full',
  auto,
  style,
  disabled,
  loading,
  colorScheme = 'primary',
  children,
  onPress,
  ...props
}) => {
  // value for scale animation accessible by js & ui thread
  const scale = useSharedValue(1);
  const color = useSharedValue(1);

  // handle the press in event
  const handleOnPressIn = () => {
    if (!onPress) return;
    // guard press in if button is disabled
    if (disabled || loading) return;
    // haptic feedback
    Haptics.selectionAsync();
    scale.value = withSpring(0, { mass: 0.1, velocity: 10 });
    color.value = withSpring(0, { mass: 0.1, velocity: 10 });
  };

  // handle the press out event
  const handleOnPressOut: PressableProps['onPressOut'] = (event) => {
    // guard press out if button is disabled
    if (disabled || loading) return;
    if (!onPress) return;
    scale.value = withSpring(1, { mass: 0.1 });
    color.value = withSpring(1, { mass: 0.1 });

    // fire onPress property
  };

  const animatedScaleStyle = useAnimatedStyle(() => {
    const gradient = colorSchemes[colorScheme][variant]['backgroundColor'];

    return {
      transform: [{ scale: interpolate(scale.value, [1, 0], [1, 0.98]) }],
      backgroundColor:
        disabled || loading
          ? colorSchemes[colorScheme][variant]['disabledBackgroundColor']
          : interpolateColor(color.value, [1, 0], gradient),
    };
  });

  return (
    <Pressable
      style={[auto && styles.auto, { ...style }]}
      onPress={onPress}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      {...props}>
      {() => (
        <Animated.View style={[styles.button, animatedScaleStyle]}>
          {!loading ? (
            <Text
              style={[
                styles.text,
                {
                  color:
                    disabled || loading
                      ? colorSchemes[colorScheme][variant].disabledColor
                      : colorSchemes[colorScheme][variant].color,
                },
              ]}>
              {children}
            </Text>
          ) : (
            <ActivityIndicator color={'white'} />
          )}
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  buttonShadowBase: {
    shadowRadius: 6,
    shadowOpacity: 0.35,
    shadowOffset: { height: 10, width: 0 },
  },
  auto: {
    alignSelf: 'flex-start',
  },
});

const colorSchemes = {
  primary: {
    // full - solid color
    full: {
      color: 'white',
      backgroundColor: [theme.colors.blue[600], theme.colors.blue[700]],
      disabledColor: 'white',
      disabledBackgroundColor: theme.colors.blue[300],
    },
    // flat - lighter color
    flat: {
      color: theme.colors.blue[600],
      backgroundColor: [theme.colors.blue[100], theme.colors.blue[200]],
      disabledColor: theme.colors.blue[300],
      disabledBackgroundColor: theme.colors.blue[100],
    },
    // ghost - no background
    ghost: {
      color: theme.colors.blue[600],
      backgroundColor: ['rgba(0,0,0,0)', theme.colors.gray[50]],
      disabledColor: theme.colors.blue[300],
      disabledBackgroundColor: 'rgba(0,0,0,0)',
    },
  },

  // info color scheme
  info: {
    full: {
      color: 'white',
      backgroundColor: [theme.colors.gray[600], theme.colors.gray[700]],
      disabledColor: 'white',
      disabledBackgroundColor: theme.colors.gray[300],
    },
    // flat - lighter color
    flat: {
      color: theme.colors.gray[600],
      backgroundColor: [theme.colors.gray[100], theme.colors.gray[200]],
      disabledColor: theme.colors.gray[300],
      disabledBackgroundColor: theme.colors.gray[100],
    },
    // ghost - no background
    ghost: {
      color: theme.colors.gray[600],
      backgroundColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
      disabledColor: theme.colors.gray[300],
      disabledBackgroundColor: 'rgba(0,0,0,0)',
    },
  },
  success: {
    // full - solid color
    full: {
      color: 'white',
      backgroundColor: [theme.colors.emerald[400], theme.colors.emerald[500]],
      disabledColor: 'white',
      disabledBackgroundColor: theme.colors.emerald[300],
    },
    // flat - lighter color
    flat: {
      color: theme.colors.emerald[500],
      backgroundColor: [theme.colors.emerald[100], theme.colors.emerald[200]],
      disabledColor: theme.colors.emerald[300],
      disabledBackgroundColor: theme.colors.emerald[100],
    },
    // ghost - no background
    ghost: {
      color: theme.colors.emerald[500],
      backgroundColor: ['rgba(0,0,0,0)', theme.colors.emerald[50]],
      disabledColor: theme.colors.emerald[300],
      disabledBackgroundColor: 'rgba(0,0,0,0)',
    },
  },
} as const;
