import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { useProgramFromIdQuery, useUpdateProgramIconMutation } from '../../../lib/graphql';
import { Header } from '../../containers/Header';

import { ScreenView } from '../../containers/ScreenView';

import { BodyText } from '../../elements/typography/BodyText';
import { ProgramParamList } from '../../navigation/ProgramNavigator';
import { Heading, ProgramImage } from '../../elements';
import { icons } from '../../../lib/icons';
import theme from '../../../theme';

type IconSelectProps = NativeStackScreenProps<ProgramParamList, 'IconSelect'>;

export const IconSelect: React.FC<IconSelectProps> = ({ route, navigation }) => {
  const { programId } = route.params;
  const isFocused = useIsFocused();

  // gql mutations and queries
  const [updateProgramIcon] = useUpdateProgramIconMutation();
  const { data, loading, error, refetch } = useProgramFromIdQuery({
    variables: { programId },
  });

  useEffect(() => {
    isFocused && (async () => await refetch({ programId }))();
  }, [isFocused]);

  if (error) {
    return <BodyText>There was an error</BodyText>;
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  const handleIconPress = async (programImageDefaultEmoji: string) => {
    await updateProgramIcon({ variables: { programId, programImageDefaultEmoji } });
    navigation.goBack();
  };

  return (
    <ScreenView>
      <View>
        <Header navigation={navigation}>
          <View>
            <Heading as="h2">{data?.program?.name} Icon</Heading>
            <View style={styles.grid}>
              {Object.values(icons).map((icon) => (
                <TouchableOpacity onPress={() => handleIconPress(icon)}>
                  <ProgramImage
                    emojiCode={icon}
                    bgColor={
                      data?.program?.programImageDefaultEmoji === icon
                        ? theme.colors.blue[400]
                        : theme.colors.gray[200]
                    }
                    size="lg"
                    style={{ marginBottom: 10, marginLeft: 5, marginRight: 5 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Header>
      </View>
    </ScreenView>
  );
};

const styles = {
  grid: {
    flex: 3, // the number of columns you want to devide the screen into
    marginHorizontal: 'auto',
    width: '100%',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
};
