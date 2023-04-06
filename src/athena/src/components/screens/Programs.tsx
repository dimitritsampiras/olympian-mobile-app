import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { useUserProgramsQuery } from '../../lib/graphql';
import { Header } from '../containers/Header';
import { ProgramCard } from '../containers/ProgramCard';
import { ScreenView } from '../containers/ScreenView';
import { BodyText, Button, Heading } from '../elements';
import { MyProgramsParamList } from '../navigation/MyProgramsNavigator';
import { UserContext } from '../../lib/context';
import { View, StyleSheet, ViewStyle } from 'react-native';
import theme from '../../theme';
import { ActionSheet } from 'react-native-ui-lib';
import { TabParamList } from '../navigation';

type ProgramsProps = NativeStackScreenProps<MyProgramsParamList & TabParamList, 'MyPrograms'>;

/**
 *
 * screen for displaying all the programs a user has
 */
export const Programs: React.FC<ProgramsProps> = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { data, refetch } = useUserProgramsQuery({ fetchPolicy: 'no-cache' });
  const isFocused = useIsFocused();

  
  const [visible, setVisible] = useState(false);

  const handleOnGetStartedPress = () => {
    setVisible(true);
  };

  const handleOnDismiss = () => {
    setVisible(false);
  };

  const navigateToProgram = (programId: string) => {
    navigation.navigate('ProgramNavigator', { programId, back: true });
  };

  // when screen is focused update changes
  useEffect(() => {
    isFocused && (async () => await refetch())();
  }, [isFocused]);

  return (
    <ScreenView>
      <Header>
        <Heading>My Programs</Heading>
      </Header>
      {data?.userPrograms.length === 0 && (
        <>
        
        <View style={[styles.infoContainer]}>
          <BodyText style={{ marginBottom: 12 }}>
            You don't have any programs!
            Click the button to get started.
          </BodyText>
          <Button variant="ghost" colorScheme="info" onPress={handleOnGetStartedPress}>
            Get Started
          </Button>
        </View>
        
        <ActionSheet
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
          { label: 'Browse Programs', onPress: () => navigation.navigate('DiscoverNavigator') },
        ]}
      />
      </>
      )}
      {data?.userPrograms.map((program) => (
        <ProgramCard
          userOwned={program?.authors.map(({ id }) => id).includes(user?.profile?.id || '')}
          key={program.id}
          onPress={() => navigateToProgram(program.id)}
          program={program}
          style={{ marginBottom: 8 }}
        />
      ))}
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
