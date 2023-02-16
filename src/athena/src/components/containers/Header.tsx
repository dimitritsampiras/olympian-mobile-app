import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, ViewProps, TouchableOpacity } from 'react-native';
import { ArrowLongLeftIcon } from 'react-native-heroicons/outline';
import theme from '../../theme';

interface HeaderProps extends ViewProps {
  row?: boolean;
  navigation?: NativeStackNavigationProp<any>;
}

export const Header: React.FC<HeaderProps> = ({ style, row, navigation, children }) => {
  return !navigation ? (
    <View
      style={[
        { marginTop: 25 },
        row && { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        style,
      ]}>
      {children}
    </View>
  ) : (
    <View style={[{ marginTop: 25 }, style]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 10, paddingTop: 0 }}>
        <ArrowLongLeftIcon stroke={theme.colors.gray[700]} />
      </TouchableOpacity>
      <View
        style={[
          row && { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        ]}>
        {children}
      </View>
    </View>
  );
};
