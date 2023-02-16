import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-ui-lib';
import { useCreateWorkoutMutation, useProgramFromIdQuery } from '../../../lib/graphql';
import { specificityColor } from '../../../lib/utils';
import theme from '../../../theme';
import { ScreenView } from '../../containers/ScreenView';
import { Button, Heading } from '../../elements';
import { Badge } from '../../elements/display/Badge';
import { ProgramImage } from '../../elements/display/ProgramImage';
import { BodyText } from '../../elements/typography/BodyText';
import { ProgramParamList } from '../../navigation/ProgramNavigator';
import { EllipsisHorizontalIcon } from 'react-native-heroicons/solid';

type ProgramProps = NativeStackScreenProps<ProgramParamList, 'Program'>;

export const Program: React.FC<ProgramProps> = ({ route, navigation }) => {
  const { programId } = route.params;
  // data
  const { data, loading, error } = useProgramFromIdQuery({
    variables: { programId },
  });

  const [createWorkout, { loading: cwLoading }] = useCreateWorkoutMutation();

  // create new blank workout on add workout button press
  const handleAddWorkout = async () => {
    if (!data?.program) return;
    const { data: cwData } = await createWorkout({
      variables: { programId },
    });
    if (!cwData?.createWorkout) return;
    navigation.navigate('Workout', { workoutId: cwData.createWorkout.id });
  };

  if (error) {
    return <BodyText>There was an error</BodyText>;
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScreenView>
      <View>
        <ProgramImage size="lg" style={{ marginBottom: 14 }} />
        <Heading as="h2">{data?.program?.name}</Heading>
        <BodyText style={{ fontSize: 12, width: 200 }}>
          A sample program description since it was not implemented in the program form.
        </BodyText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
          <Avatar size={24} label={'TT'} backgroundColor={theme.colors.amber[100]} />
          <Text
            style={{
              marginLeft: 4,
              fontWeight: '500',
              color: theme.colors.gray[700],
              fontSize: 12,
            }}>
            {data?.program?.profile.user.username}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 22, alignItems: 'center' }}>
          {data?.program?.specificity.map((spec) => (
            <Badge key={spec} colorScheme={specificityColor(spec)} style={{ marginRight: 6 }}>
              {spec}
            </Badge>
          ))}
          <TouchableOpacity>
            <EllipsisHorizontalIcon fill="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <Button onPress={handleAddWorkout} loading={cwLoading}>
          Add Workout
        </Button>
      </View>
    </ScreenView>
  );
};
