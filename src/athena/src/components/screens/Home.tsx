import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';

import { Button } from '../elements/Button';
import { TabParamList } from '../navigation';
import { ScreenView } from '../containers/ScreenView';
import { Heading } from '../elements/typography/Heading';
import { UserContext } from '../providers';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { SubHeading } from '../elements/typography/SubHeading';
import { Header } from '../containers/Header';
import theme from '../../theme';
import { ActionSheet } from 'react-native-ui-lib';
import { BodyText } from '../elements/typography/BodyText';
import { HomeParamList } from '../navigation/HomeNavigator';

interface HomeProps extends NativeStackScreenProps<HomeParamList, 'Home'> {}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const [visible, setVisible] = useState(false);

  const handleOnPress = () => {
    setVisible(true);
  };

  const handleOnDismiss = () => {
    setVisible(false);
  };

  return (
    <ScreenView>
      {/* TOD0: turn this into a header component */}
      <Header>
        <Heading style={{ width: 300 }}>
          Welcome back, {'\n'}
          {user?.name.split(' ')[0]} 👋
        </Heading>
      </Header>

      <View style={[styles.infoContainer]}>
        <BodyText style={{ marginBottom: 12 }}>
          You have no active programs. Click the button to get started.
        </BodyText>
        <Button variant="ghost" colorScheme="info" onPress={handleOnPress}>
          Get Started
        </Button>
      </View>
      <SubHeading>Trending Exercises</SubHeading>

      {/*
       *
       *
       * action sheet
       *  */}
      <ActionSheet
        title={'Get Started'}
        visible={visible}
        onDismiss={handleOnDismiss}
        cancelButtonIndex={3}
        destructiveButtonIndex={0}
        containerStyle={{ paddingBottom: 20 } as ViewStyle}
        options={[
          {
            label: 'Create Program From Scratch',
            onPress: () => navigation.navigate('CreateProgram'),
          },
          { label: 'Browse Programs', onPress: () => navigation.navigate('Discover') },
        ]}
      />
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: theme.colors.gray[200],
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: theme.radius.md,
    marginBottom: 24,
  },
});
