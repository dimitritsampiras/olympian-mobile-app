import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ActionSheet, ButtonProps } from 'react-native-ui-lib';
import { useCreateWorkoutMutation, useProgramFromIdQuery } from '../../../lib/graphql';
import theme from '../../../theme';
import { ScreenView } from '../../containers/ScreenView';
import { Button, Heading } from '../../elements';
import { ProgramImage } from '../../elements/display/ProgramImage';
import { BodyText } from '../../elements/typography/BodyText';
import { ProgramParamList } from '../../navigation/ProgramNavigator';
import { EllipsisHorizontalIcon } from 'react-native-heroicons/solid';
import { Header } from '../../containers/Header';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import { ProfileName } from '../../elements/display/ProfileName';
import { Card } from '../../containers/Card';
import {
  UserPlusIcon,
  PencilIcon,
  ShareIcon,
  DocumentDuplicateIcon,
} from 'react-native-heroicons/outline';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../../lib/context';

type ProgramProps = NativeStackScreenProps<ProgramParamList, 'Program'>;

export const Program: React.FC<ProgramProps> = ({ route, navigation }) => {
  const { programId } = route.params;
  const { user } = useContext(UserContext);

  const [menuVisible, setMenuVisible] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const isFocused = useIsFocused();
  // data
  const { data, loading, error, refetch } = useProgramFromIdQuery({
    variables: { programId },
    fetchPolicy: 'no-cache',
    onCompleted: (data) =>
      setCanEdit(
        data?.program?.authors.map(({ id }) => id).includes(user?.profile?.id || '') || false
      ),
  });

  const [createWorkout, { loading: cwLoading }] = useCreateWorkoutMutation();

  // create new blank workout on add workout button press
  const handleAddWorkout = async () => {
    if (!data?.program) return;
    const workout = await createWorkout({
      variables: { programId },
    }).then(({ data }) => data?.createWorkout);
    if (!workout) return;
    navigation.navigate('Workout', { workoutId: workout.id });
  };

  const handleOnMenuPress = () => {
    setMenuVisible(true);
  };

  const handleOnMenuDismiss = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    isFocused && (async () => await refetch())();
    setCanEdit(
      data?.program?.authors.map(({ id }) => id).includes(user?.profile?.id || '') || false
    );
  }, [isFocused]);

  if (error) {
    return <BodyText>There was an error</BodyText>;
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScreenView>
      {data?.program && (
        <>
          <View>
            <Header navigation={route.params.back ? navigation : undefined}>
              <ProgramImage size="lg" style={{ marginBottom: 14 }} />
              <Heading as="h2" onPress={async () => await refetch()}>
                {data?.program?.name}
              </Heading>
              <BodyText style={{ fontSize: 12, width: 200 }}>
                A sample program description since it was not implemented in the program form.
              </BodyText>

              {/* info  */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 16,
                }}>
                {data.program.authors[0]?.id && (
                  <ProfileName
                    profile={data.program.authors[0]}
                    onPress={() => {
                      navigation.navigate('Profile', {
                        profileId: data.program?.authors[0]?.id || '',
                      });
                    }}
                  />
                )}

                <TouchableOpacity onPress={handleOnMenuPress}>
                  <EllipsisHorizontalIcon fill="black" />
                </TouchableOpacity>
              </View>
            </Header>
          </View>

          <View style={{ marginTop: 40, marginBottom: 100 }}>
            {data?.program?.workouts.map((workout) => (
              <Card
                key={workout.name}
                onPress={() => navigation.navigate('Workout', { workoutId: workout.id })}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  borderRadius: 18,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: '600', marginRight: 14 }}>{workout.name}</Text>
                  <Text style={{ fontWeight: '500', color: theme.colors.gray[500] }}>
                    {workout.exercises.length} exercises
                  </Text>
                </View>
                <ChevronRightIcon fill={theme.colors.gray[300]} size={18} />
              </Card>
            ))}
            {canEdit && (
              <Button
                colorScheme="info"
                variant="flat"
                onPress={handleAddWorkout}
                loading={cwLoading}>
                Add Workout
              </Button>
            )}
            {/*
             *
             *
             * action sheet
             *  */}
            <ActionSheet
              // title={'Program Options'}
              visible={menuVisible}
              onDismiss={handleOnMenuDismiss}
              destructiveButtonIndex={0}
              containerStyle={{ paddingBottom: 20 } as ViewStyle}
              renderAction={(option: ButtonProps) => (
                <TouchableOpacity
                  onPress={option.onPress}
                  style={{
                    marginLeft: 20,
                    paddingVertical: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ProgramOptionsIcon item={option.label} />
                  <Text style={{ marginLeft: 12 }}>{option.label}</Text>
                </TouchableOpacity>
              )}
              options={[
                {
                  label: 'Add Collaborators',
                  onPress: () => {},
                },
                {
                  label: 'Edit',
                  onPress: () => {},
                },
                {
                  label: 'Share',
                  onPress: () => {},
                },
                {
                  label: 'Duplicate',
                  onPress: () => {},
                },
              ].filter(({ label }) =>
                !canEdit ? ['Edit', 'Add Collaborators'].includes(label) : true
              )}
            />
          </View>
        </>
      )}
    </ScreenView>
  );
};

export const ProgramOptionsIcon: React.FC<{
  item?: string;
}> = ({ item }) => {
  if (item === 'Add Collaborators')
    return <UserPlusIcon size={22} stroke={theme.colors.gray[800]} />;
  if (item === 'Edit') return <PencilIcon size={22} stroke={theme.colors.gray[800]} />;
  if (item === 'Share') return <ShareIcon size={22} stroke={theme.colors.gray[800]} />;
  if (item === 'Duplicate')
    return <DocumentDuplicateIcon size={22} stroke={theme.colors.gray[800]} />;
  return <PencilIcon stroke={theme.colors.gray[800]} />;
};
