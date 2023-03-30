import React, { ReactNode } from 'react';
import {
  ScrollView,
  ViewProps,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
} from 'react-native';
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

  if (type === 'form') {
    return (
      <View
        style={[
          {
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: 'white',
          },
          type === 'form' && spaced && { justifyContent: 'space-between' },
          style,
        ]}>
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={showScrollBar}
      alwaysBounceVertical={scrollBounce}
      style={{
        backgroundColor: theme.colors.gray[50],
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      <View
        style={{
          paddingBottom: 150,
        }}>
        {children}
      </View>
    </ScrollView>
  );
};
