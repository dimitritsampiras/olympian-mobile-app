import React, { ReactNode } from 'react';
import { ScrollView, ScrollViewProps, ViewProps } from 'react-native';

interface HorizontalCardScrollerProps extends ScrollViewProps {
  children: ReactNode[] | ReactNode;
  showScrollBar?: boolean;
}

export const HorizontalCardScroller: React.FC<HorizontalCardScrollerProps> = ({
  style,
  children,
  showScrollBar = false,
}) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={showScrollBar} style={style}>
      {children}
    </ScrollView>
  );
};
