import React from 'react';
import { Text, View } from 'react-native';
import theme from '../../../theme';

interface CalendarProps {
  iso: string;
}

export const Calendar: React.FC<CalendarProps> = ({ iso }) => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.blue[500],
        padding: 8,
        alignItems: 'center',
        borderRadius: 4,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 15,
          fontWeight: '700',
        }}>
        {toDay(iso)}
      </Text>
      <Text
        style={{
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontSize: 8,
        }}>
        {toWeekday(iso)}
      </Text>
    </View>
  );
};

const toWeekday = (iso: string) => {
  return new Date(iso).toLocaleString('en-US', { weekday: 'short' });
};

const toDay = (iso: string) => {
  return new Date(iso).toLocaleString('en-US', { day: 'numeric' });
};
