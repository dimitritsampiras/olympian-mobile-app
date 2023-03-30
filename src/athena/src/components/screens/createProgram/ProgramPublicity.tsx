import * as Haptics from 'expo-haptics';
import React, { useContext } from 'react';
import { Pressable, PressableProps, StyleSheet, View, Text } from 'react-native';
import { GlobeAltIcon, UserGroupIcon, UserIcon } from 'react-native-heroicons/solid';
import { CreateProgramContext } from '../../../lib/context';

import { Publicity } from '../../../lib/graphql';
import theme from '../../../theme';
import { Heading } from '../../elements';
import { BodyText } from '../../elements/typography/BodyText';

interface ProgramPublicityProps {}

export const ProgramPublicity: React.FC<ProgramPublicityProps> = () => {
  const { program, setProgram } = useContext(CreateProgramContext);

  const handleSelectPublicity = (publicity: Publicity) => {
    Haptics.selectionAsync();
    setProgram((prev) => ({ ...prev, publicity }));
  };

  return (
    <>
      <Heading as="h2" style={{ marginBottom: 24 }}>
        Select Program Publicity
      </Heading>
      <BodyText style={{ width: 250, marginBottom: 24 }}>
        Do you want your program to be seen publicly, by just your friends, or just yourself?
      </BodyText>
      <View style={{ marginBottom: 44 }}>
        {[Publicity.Public, Publicity.Friends, Publicity.Private].map((p) => (
          <PublicitySelector
            key={p}
            publicity={p}
            selected={p === program.publicity}
            onPress={() => handleSelectPublicity(p)}
          />
        ))}
      </View>
    </>
  );
};

// TODO: clean up this component
export const PublicitySelector: React.FC<
  {
    selected: boolean;
    publicity: string;
  } & PressableProps
> = ({ publicity, selected, ...props }) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={() => ({
        backgroundColor: selected ? theme.colors.blue[100] : theme.colors.gray[50],
        marginVertical: 6,
        height: 64,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <PublicityIcon publicity={publicity as `${Publicity}`} selected={selected} />
        <Text
          style={{
            marginLeft: 8,
            textTransform: 'capitalize',
            color: selected ? theme.colors.blue[600] : theme.colors.gray[400],
            fontWeight: '600',
            ...styles,
          }}>
          {publicity.toString()}
        </Text>
      </View>
    </Pressable>
  );
};

export const PublicityIcon: React.FC<{ publicity: `${Publicity}`; selected: boolean }> = ({
  publicity,
  selected,
}) => {
  const styles = !selected ? { fill: theme.colors.gray[400] } : { fill: theme.colors.blue[600] };
  if (publicity === Publicity.Friends) return <UserGroupIcon size="18" {...styles} />;
  if (publicity === Publicity.Private) return <UserIcon size="18" {...styles} />;
  return <GlobeAltIcon size="18" {...styles} />;
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: '700',
    fontSize: 22,
    width: 200,
    marginBottom: 20,
  },
});
