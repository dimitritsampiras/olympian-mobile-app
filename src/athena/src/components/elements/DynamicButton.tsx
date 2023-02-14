import * as Haptics from 'expo-haptics';
import React, { ReactNode } from 'react';
import { StyleSheet, Pressable, Text, ViewStyle, PressableProps } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import theme from '../../theme';

interface DynamicButtonProps extends PressableProps {
  // button can't be pressed
  disabled?: boolean;
  // fit-content instead of full width
  auto?: boolean;
  // is button loading
  loading?: boolean;
  // disable button animations or now
  animated?: boolean;
  // show shadow
  shadow?: boolean;
  // container styles
  style?: ViewStyle;
  // single react node i.e. text or icon
  children: ReactNode;
}

/**
 * Button Element
 * @param ButtonProps properties of a button element
 * @returns JSX element
 */
export const DynamicButton: React.FC<DynamicButtonProps> = ({
  auto,
  style,
  disabled,
  loading,
  animated = true,
  shadow = false,
  children,
  onPress,
  ...props
}) => {
  // value for scale animation accessible by js & ui thread
  const scale = useSharedValue(1);
  const color = useSharedValue(1);

  //handle on press action
  const handleOnPress: PressableProps['onPress'] = (event) => {
    // guard press in if button is disabled
    if (disabled || loading) return;

    if (!onPress) return;
    // haptic feedback
    Haptics.selectionAsync();
    scale.value = withSpring(0, { mass: 0.1, velocity: 10 });
    color.value = withSpring(0, { mass: 0.1, velocity: 10 });

    onPress(event);
  };

  const backgroundColor = style?.backgroundColor || theme.colors.blue[600];
  const animatedScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(scale.value, [1, 0], [1, 0.98]) }],
      backgroundColor,
    };
  });

  return (
    <Pressable style={[auto && styles.auto, { ...style }]} onPress={handleOnPress} {...props}>
      {({ pressed }) => (
        <Animated.View style={[styles.button, animatedScaleStyle]}>
          <Text style={[styles.text]}>{children}</Text>
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 1,
    color: 'white',
  },
  full: {
    backgroundColor: theme.colors.blue[600],
  },
  fullDisabled: {
    backgroundColor: theme.colors.blue[300],
  },
  fullText: {
    color: '#fff',
  },
  ghost: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  ghostText: {
    color: theme.colors.blue[700],
  },
  flat: {
    backgroundColor: theme.colors.blue[100],
  },
  flatDisabled: {
    backgroundColor: theme.colors.blue[50],
  },
  flatText: {
    color: theme.colors.blue[700],
  },
  flatTextDisabled: {
    color: theme.colors.blue[300],
  },
  disabled: {
    backgroundColor: theme.colors.gray[200],
  },
  auto: {
    alignSelf: 'flex-start',
  },
});
