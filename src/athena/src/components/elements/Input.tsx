import React, { useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  TextInput,
  TextStyle
} from 'react-native';
import * as Haptics from 'expo-haptics';
import theme from '../../theme';

interface InputProps {
  style?: TextStyle;
  placeholder?: string;
  label?: string;
  color?: string;
  state?: string;
}

export const Input: React.FC<InputProps> = ({ style }) => {
  const animatedTranslationX = useRef(new Animated.Value(1)).current;

  const handleOnPressIn = () => {
    Haptics.selectionAsync();
    Animated.timing(animatedTranslationX, {
      toValue: 14,
      duration: 3,
      easing: Easing.cubic,
      useNativeDriver: true
    }).start();
  };

  const handleUnFocus = () => {
    Haptics.selectionAsync();
    Animated.timing(animatedTranslationX, {
      toValue: 1,
      duration: 3,
      easing: Easing.cubic,
      useNativeDriver: true
    }).start();
  };

  return (
    <Animated.View
      style={{
        ...styles.container,
        ...style
      }}
    >
      <TextInput
        style={{ ...styles.input }}
        selectionColor={theme.gray[900]}
        onPressIn={handleOnPressIn}
        onSubmitEditing={handleUnFocus}
        placeholder="Username"
        placeholderTextColor={theme.gray[400]}
      ></TextInput>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingLeft: 10,
    borderRadius: 18,
    backgroundColor: theme.gray[100],
    zIndex: 1
  },
  input: {
    padding: 13,
    height: '100%',
    borderRadius: 18,
    zIndex: 10,
    fontWeight: '300'
  }
});
