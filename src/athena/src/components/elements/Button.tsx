import * as Haptics from 'expo-haptics';
import React, { ReactNode, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  Animated,
  Easing,
  ViewStyle,
  PressableProps,
} from 'react-native';
import theme from '../../theme';

// constants
const BUTTON_SCALE_TO = 0.99; // will effect the size of button
const BUTTON_SCALE_IN_DURATION = 40; // will effect the speed of pressing in
const BUTTON_SCALE_OUT_DURATION = 220; // will effect the speed of end animated
const BUTTON_ELASTICITY = 2.2;

interface ButtonProps extends PressableProps {
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
export const Button: React.FC<ButtonProps> = ({
  auto,
  style,
  disabled,
  animated = true,
  shadow = false,
  children,
  ...props
}) => {
  // animated value for scale of the button
  const animatedScale = useRef(new Animated.Value(1)).current;

  // handle press in of button
  const handleOnPressIn = () => {
    // haptic feedback
    Haptics.selectionAsync();
    Animated.timing(animatedScale, {
      toValue: BUTTON_SCALE_TO,
      duration: BUTTON_SCALE_IN_DURATION,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start();
  };

  // handle press out
  const handleOnPressOut = () => {
    Animated.timing(animatedScale, {
      toValue: 1,
      easing: Easing.elastic(BUTTON_ELASTICITY),
      duration: BUTTON_SCALE_OUT_DURATION,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={{ ...style, width: '100%' }}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      {...props}>
      {({ pressed }) => (
        <Animated.View
          style={[
            styles.button,
            shadow && !disabled && styles.buttonShadowBase,
            animated && !disabled && { transform: [{ scale: animatedScale }] },
            disabled && styles.disabled,
          ]}>
          <Text style={styles.buttonText}>{children}</Text>
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.blue[600],
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonShadowBase: {
    shadowColor: theme.blue[600],
    shadowRadius: 6,
    shadowOpacity: 0.35,
    shadowOffset: { height: 10, width: 0 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  disabled: {
    backgroundColor: theme.gray[200],
  },
});
