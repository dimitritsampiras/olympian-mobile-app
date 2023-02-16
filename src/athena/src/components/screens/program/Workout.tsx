import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useWorkoutFromIdQuery } from '../../../lib/graphql';

import { ScreenView } from '../../containers/ScreenView';
import { Button, Heading } from '../../elements';

import { BodyText } from '../../elements/typography/BodyText';
import { ProgramParamList } from '../../navigation/ProgramNavigator';

type WorkoutProps = NativeStackScreenProps<ProgramParamList, 'Workout'>;

export const Workout: React.FC<WorkoutProps> = ({ route, navigation }) => {
  const { workoutId } = route.params;
  // data
  const { data, loading, error } = useWorkoutFromIdQuery({
    variables: { workoutId },
  });

  if (error) {
    return <BodyText>There was an error</BodyText>;
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScreenView>
      <View>
        <Heading as="h2">{data?.workout?.name}</Heading>
        <BodyText style={{ fontSize: 12, width: 200 }}>
          A sample program description since it was not implemented in the program form.
        </BodyText>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
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
        </View> */}
        {/* <View style={{ flexDirection: 'row', marginTop: 22, alignItems: 'center' }}>
          {data?.program?.specificity.map((spec) => (
            <Badge key={spec} colorScheme={specificityColor(spec)} style={{ marginRight: 6 }}>
              {spec}
            </Badge>
          ))}
          <TouchableOpacity>
            <EllipsisHorizontalIcon fill="black" />
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={{ marginTop: 40 }}>
        <Button>Add Workout</Button>
      </View>
    </ScreenView>
  );
};
