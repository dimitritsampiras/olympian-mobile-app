import React, { useRef } from 'react';
import { Pressable, TextInputProps } from 'react-native';
import { StyleSheet, TextInput, TextStyle } from 'react-native';

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import * as Haptics from 'expo-haptics';

import theme from '../../theme';
import { HeroIcon } from '../../lib/types';

interface InputProps extends TextInputProps {
  style?: TextStyle;
  placeholder?: string;
  label?: string;
  color?: string;
  state?: string;
  error?: boolean;
  Icon?: HeroIcon;
  iconProps?: React.ComponentProps<HeroIcon>;
}

const SHIFT_DISTANCE = 6;
const BASE_COLOR = theme.colors.gray[50];
const FOCUSED_COLOR = theme.colors.gray[100];

export const Input: React.FC<InputProps> = ({
  style,
  placeholder,
  Icon,
  iconProps = { size: '18', fill: theme.colors.gray[400] },
  ...props
}) => {
  const inputRef = useRef<TextInput>(null);
  const translationX = useSharedValue(0);

  const handleFocus = () => {
    Haptics.selectionAsync();
    translationX.value = withSpring(SHIFT_DISTANCE, {
      overshootClamping: true,
      damping: 20,
      stiffness: 150,
      mass: 1,
    });
  };

  const handleBlur = () => {
    // Haptics.selectionAsync();
    translationX.value = withSpring(0, {
      overshootClamping: true,
      damping: 20,
      stiffness: 150,
      mass: 1,
    });
  };

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const shiftTextInput = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));

  const fadeBackgroundColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      translationX.value,
      [0, SHIFT_DISTANCE],
      [BASE_COLOR, FOCUSED_COLOR]
    ),
  }));

  const placeholderStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translationX.value, [0, SHIFT_DISTANCE / 2], [1, 0]),
  }));

  return (
    <Pressable style={[styles.pressble, style]} onPress={handlePress}>
      <Animated.View style={[styles.outerView, fadeBackgroundColor]}>
        <Animated.View
          style={[
            styles.innerView,
            shiftTextInput,
            // ...(props.error ? styles.error : {}),
          ]}>
          {/* {Icon && <Icon size={iconProps.size} {...{ color: iconProps.color }} />} */}
          {/* <Animated.Text
            style={[
              {
                position: 'absolute',
                color: theme.colors.gray[400],
              },
              placeholderStyle,
            ]}>
            {placeholder}
          </Animated.Text> */}
          <TextInput
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...styles.input }}
            selectionColor={theme.colors.gray[900]}
            // onPressIn={handleOnPressIn}
            // onSubmitEditing={handleUnFocus}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.gray[400]}
            {...props}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressble: {
    width: '100%',
  },
  outerView: {
    paddingVertical: 18,
    paddingHorizontal: 17,
    borderRadius: 16,
    width: '100%',
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontWeight: '300',
  },
  error: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'red',
  },
});
