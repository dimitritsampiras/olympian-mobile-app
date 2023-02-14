import React, { useRef } from 'react';
import { NativeSyntheticEvent, TextInputSubmitEditingEventData, View } from 'react-native';
import { Animated, Easing, StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native';
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

export const Input: React.FC<InputProps> = ({
  style,
  placeholder,
  Icon,
  iconProps = { size: '18', fill: theme.colors.gray[400] },
  onSubmitEditing,
  ...props
}) => {
  const animatedTranslationX = useRef(new Animated.Value(1)).current;

  const handleOnPressIn = () => {
    Haptics.selectionAsync();
    Animated.timing(animatedTranslationX, {
      toValue: 14,
      duration: 3,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start();
  };

  const handleUnFocus = () => {
    Haptics.selectionAsync();
    Animated.timing(animatedTranslationX, {
      toValue: 1,
      duration: 3,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start();
  };

  const handleOnSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    if (!onSubmitEditing) return;

    onSubmitEditing(e); //()=>{console.log("e")
    handleUnFocus();
  };

  return (
    <Animated.View
      style={{
        ...styles.container,
        ...style,
        ...(props.error ? styles.error : {}),
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {Icon && <Icon size={iconProps.size} {...{ fill: iconProps.fill }} />}
        <TextInput
          {...props}
          style={{ ...styles.input }}
          selectionColor={theme.colors.gray[900]}
          onPressIn={handleOnPressIn}
          onSubmitEditing={handleOnSubmitEditing}
          // onSubmitEditing={handleSubmit}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray[400]}
          // autoCapitalize={'none'}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingLeft: 10,
    borderRadius: 18,
    backgroundColor: theme.colors.gray[100],
    width: '100%',
    zIndex: 1,
  },
  input: {
    padding: 13,
    flex: 1,
    borderRadius: 18,
    zIndex: 10,
    fontWeight: '300',
  },
  error: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'red',
  },
});
