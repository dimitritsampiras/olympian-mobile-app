import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, View, ViewProps, Text } from 'react-native';
import theme from '../../theme';
import { Card } from './Card';

interface HorizontalCardScrollerProps {
  children: ReactNode[] | ReactNode;
  styles?: ViewProps['style'];
  showScrollBar?: boolean;
}

export const HorizontalCardScroller: React.FC<HorizontalCardScrollerProps> = ({
  styles,
  children,
  showScrollBar = false,
}) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={showScrollBar} style={styles}>
      {children}
    </ScrollView>
  );
};
