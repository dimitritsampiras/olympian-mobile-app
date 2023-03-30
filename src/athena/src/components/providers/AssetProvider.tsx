import React, { ReactNode } from 'react';
import { View } from 'react-native';
import {
  useFonts,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_500Medium,
  Inter_400Regular,
} from '@expo-google-fonts/inter';

interface AssetProviderProps {
  children: ReactNode | ReactNode[];
}

export const AssetProvider: React.FC<AssetProviderProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_500Medium,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <View></View>;
  }
  return <>{children}</>;
};
