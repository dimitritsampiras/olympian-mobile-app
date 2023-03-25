import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-ui-lib';

import { DiscoverParamList } from '../../navigation';
import { ScreenView } from '../../containers/ScreenView';
import { Header } from '../../containers/Header';
import theme from '../../../theme';
import { Heading, ProgramImage, SubHeading } from '../../elements';
import {
  Program,
  useFollowMutation,
  useMyProfileQuery,
  useProfileFromIdQuery,
  useProfileProgramsQuery,
  useUnfollowMutation,
} from '../../../lib/graphql';
import { UserPlusIcon } from 'react-native-heroicons/outline';
import { CheckCircleIcon } from 'react-native-heroicons/solid';
import { useIsFocused } from '@react-navigation/native';
import { MyProgramsParamList } from '../../navigation/MyProgramsNavigator';
import { ProgramParamList } from '../../navigation/ProgramNavigator';
import { InlineProgram } from '../../containers/InlineProgram';

interface ProfileProps
  extends NativeStackScreenProps<
    DiscoverParamList | MyProgramsParamList | ProgramParamList,
    'Profile'
  > {}

export const Profile: React.FC<ProfileProps> = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { profileId } = route.params;
  const { data, refetch } = useProfileFromIdQuery({ variables: { id: profileId } });
  const { data: mpData, refetch: mpRefetch } = useMyProfileQuery();
  const { data: pgData, refetch: pgRefetch } = useProfileProgramsQuery({
    variables: { profileId },
  });

  const [unfollow, { data: unfollowData }] = useUnfollowMutation();
  const [follow, { data: followData }] = useFollowMutation();

  useEffect(() => {
    (async () => {
      await refetch();
      await pgRefetch();
      await mpRefetch();
    })();
  }, [isFocused, followData, unfollowData]);

  return (
    <ScreenView>
      {data?.profileFromId?.id && (
        <>
          <Header style={{ marginBottom: 20 }} navigation={navigation}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Avatar
                  size={60}
                  backgroundColor={mpData?.myProfile?.profileInitialsDefaultColor || '#ffffff'}
                  name={data?.profileFromId?.name}
                />
                <View style={{ marginLeft: 14, paddingVertical: 10 }}>
                  <Heading as="h3" noMargin style={{ marginBottom: 5 }}>
                    {data?.profileFromId?.username}
                  </Heading>
                  <Text style={{ color: theme.colors.gray[600] }}>
                    {data?.profileFromId?.followedBy.length} followers
                  </Text>
                </View>
              </View>
              {/*  */}
              {mpData?.myProfile?.username !== data.profileFromId.username &&
                (!mpData?.myProfile?.following.find(
                  ({ username }) => data?.profileFromId?.username === username
                ) ? (
                  <TouchableOpacity
                    onPress={() =>
                      follow({ variables: { profileId: data.profileFromId?.id || '' } })
                    }
                    style={{ padding: 4 }}>
                    <UserPlusIcon size={20} color={theme.colors.gray[500]} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      unfollow({ variables: { profileId: data.profileFromId?.id || '' } })
                    }
                    style={{ padding: 4 }}>
                    <CheckCircleIcon size={20} color={theme.colors.emerald[400]} />
                  </TouchableOpacity>
                ))}
            </View>
          </Header>
          {/*  */}
          <View style={{ marginTop: 22 }}>
            <SubHeading as="h2">Authored Programs</SubHeading>
            {pgData?.profilePrograms && pgData?.profilePrograms.length > 0 ? (
              pgData?.profilePrograms.map((program) => (
                // <TouchableOpacity
                //   key={program.id}
                //   style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
                //   onPress={() => {
                //     navigation.navigate('ProgramNavigator', { programId: program.id });
                //   }}>
                //   <ProgramImage />
                //   <View style={{ marginLeft: 12 }}>
                //     <Heading as="h4">{program.name}</Heading>
                //     <Text style={{ color: theme.colors.gray[700], marginTop: 2, fontSize: 12 }}>
                //       {program.inLibraryOf.length} users · {program.likes || 0} likes
                //     </Text>
                //   </View>
                // </TouchableOpacity>
                <InlineProgram
                  key={program.id}
                  program={program as Program}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    navigation.navigate('ProgramNavigator', { programId: program.id });
                  }}
                />
              ))
            ) : (
              <View>
                <Text>No programs :(</Text>
              </View>
            )}
          </View>
        </>
      )}
    </ScreenView>
  );
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('AUTH_TOKEN').catch((e) => e);
};

const styles = StyleSheet.create({
  optionCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logout: {
    backgroundColor: 'white',
    paddingVertical: 13,
    paddingHorizontal: 35,
    borderRadius: 98,
    flexDirection: 'row',
    alignItems: 'center',
  },
  follow: {
    flexDirection: 'row',
  },
  followText: {
    color: theme.colors.gray[700],
  },
});
