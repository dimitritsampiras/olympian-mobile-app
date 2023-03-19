import React, { ReactNode } from 'react';
import { ScrollView, ViewProps, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../theme';

interface ScreenViewProps {
  children: ReactNode[] | ReactNode;
  type?: 'main' | 'form';
  style?: ViewProps['style'];
  spaced?: boolean;
  showScrollBar?: boolean;
  scrollBounce?: boolean;
}

export const ScreenView: React.FC<ScreenViewProps> = ({
  type = 'main',
  spaced,
  showScrollBar = false,
  scrollBounce = true,
  style,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          {
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: insets.top,
            // paddingBottom: type === 'form' ? insets.bottom : 0,
            backgroundColor: type === 'form' ? theme.colors.white : theme.colors.gray[50],
          },
          type === 'form' && spaced && { justifyContent: 'space-between' },
          style,
        ]}>
        {type === 'main' ? (
          <ScrollView
            showsVerticalScrollIndicator={showScrollBar}
            alwaysBounceVertical={scrollBounce}>
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
