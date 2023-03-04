import React, { ReactNode } from 'react';
import { StyleSheet, ScrollView, ViewProps, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../theme';

interface ScreenViewProps {
  children: ReactNode[] | ReactNode;
  type?: 'main' | 'form';
  styles?: ViewProps['style'];
  spaced?: boolean;
  showScrollBar?: boolean;
  scrollBounce?: boolean;
}

export const ScreenView: React.FC<ScreenViewProps> = ({
  type = 'main',
  spaced,
  showScrollBar = false,
  scrollBounce = true,
  styles,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: insets.top,
          paddingBottom: type === 'form' ? insets.bottom : 0,
          backgroundColor: type === 'form' ? theme.colors.white : theme.colors.gray[50],
        },
        type === 'form' && spaced && { justifyContent: 'space-between' },
        styles,
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
  );
};
