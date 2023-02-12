import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';

import { Button } from '../elements/Button';
import { RootParamList } from '../navigation/RootNavigator';
import { TabParamList } from '../navigation';
import { ScreenView } from '../containers/ScreenView';
import { Heading } from '../elements/typography/Heading';
import { UserContext } from '../providers';
import { View } from 'react-native';
import { SubHeading } from '../elements/typography/SubHeading';

interface HomeProps extends NativeStackScreenProps<TabParamList & RootParamList, 'Home'> {}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { user } = useContext(UserContext);

  return (
    <ScreenView>
      {/* TOD0: turn this into a header component */}
      <View style={{ paddingTop: 25, paddingBottom: 25 }}>
        <Heading style={{ width: 300 }}>
          Welcome back, {'\n'}
          {user?.name} 👋
        </Heading>
      </View>

      <SubHeading>Trending Exercises</SubHeading>
      <Button onPress={() => navigation.navigate('CreateProgram')}>Create Program</Button>
    </ScreenView>
  );
};
