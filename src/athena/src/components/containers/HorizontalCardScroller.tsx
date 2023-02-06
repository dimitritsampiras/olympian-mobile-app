import React, { ReactNode } from 'react';
import { ScrollView, ViewProps } from 'react-native';

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
