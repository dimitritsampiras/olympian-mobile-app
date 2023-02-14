import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Avatar } from 'react-native-ui-lib';
import { useProgramFromIdQuery } from '../../../lib/graphql';
import theme from '../../../theme';
import { ScreenView } from '../../containers/ScreenView';
import { Button, Heading } from '../../elements';
import { ProgramImage } from '../../elements/display/ProgramImage';
import { BodyText } from '../../elements/typography/BodyText';
import { ProgramParamList } from '../../navigation/ProgramNavigation';

type ProgramProps = NativeStackScreenProps<ProgramParamList, 'Program'>;

export const Program: React.FC<ProgramProps> = ({ route }) => {
  const { programId } = route.params;
  // data
  const { data, loading, error } = useProgramFromIdQuery({
    variables: { programId },
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
        <ProgramImage placeholder="🦖" style={{ marginBottom: 14 }} />
        <Heading as="h2">{data?.program?.name}</Heading>
        <BodyText style={{ fontSize: 12, width: 200 }}>
          A sample program description since it was not implemented in the program form.
        </BodyText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
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
      </View>
      <View style={{ marginTop: 40 }}>
        <Button>Add</Button>
      </View>
    </ScreenView>
  );
};
