import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Header } from '../../containers/Header';
import { ScreenView } from '../../containers/ScreenView';
import { Heading } from '../../elements';
import { ProfileParamList } from '../../navigation/ProfileNavigator';

interface SocialsProps extends NativeStackScreenProps<ProfileParamList, 'Socials'> {}

export const Socials: React.FC<SocialsProps> = ({ navigation }) => {
  return (
    <ScreenView>
      <Header navigation={navigation}>
        <Heading>Socials</Heading>
      </Header>
    </ScreenView>
  );
};
