import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { TabParamList } from '../navigation';

interface ExploreProps extends NativeStackScreenProps<TabParamList, 'Explore'> {}
export const Explore: React.FC<ExploreProps> = ({ route }) => {
  return <></>;
};
