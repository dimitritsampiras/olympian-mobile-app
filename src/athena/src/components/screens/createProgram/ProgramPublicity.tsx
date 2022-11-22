import { selectionAsync } from 'expo-haptics';
import React, { useContext, useState } from 'react';
import { Pressable, PressableProps, StyleSheet, View, Text } from 'react-native';
import { GlobeAltIcon, UserGroupIcon, UserIcon } from 'react-native-heroicons/solid';

import { Publicity } from '../../../lib/graphql';
import theme from '../../../theme';
import { Button } from '../../elements/Button';
import { CreateProgramContext } from '../../providers/CreateProgramProvider';

interface ProgramPublicityProps {
  nextPage: () => void;
}

export const ProgramPublicity: React.FC<ProgramPublicityProps> = ({ nextPage }) => {
  const { program, setProgram } = useContext(CreateProgramContext);

  const [selectedPublicity, setSelectedPublicity] = useState<Publicity | undefined>(
    program.publicity
  );

  const handleOnNext = () => {
    if (!selectedPublicity) return;
    setProgram((prev) => ({ ...prev, publicity: selectedPublicity }));
    nextPage();
  };

  return (
    <>
      <Text style={{ color: theme.gray[600], marginBottom: 14 }}>{program.name}</Text>
      <Text style={styles.heading}>Choose Program Publicity</Text>

      <View style={{ marginBottom: 44 }}>
        {[Publicity.Public, Publicity.Friends, Publicity.Private].map((p) => (
          <PublicitySelector
            key={p}
            publicity={p}
            selected={p === selectedPublicity}
            onPress={() => {
              selectionAsync();
              setSelectedPublicity(p);
            }}
          />
        ))}
      </View>

      <Button shadow={false} onPress={handleOnNext}>
        Next
      </Button>
    </>
  );
};

export const PublicitySelector: React.FC<
  {
    selected: boolean;
    publicity: string;
  } & PressableProps
> = ({ publicity, selected, ...props }) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={(pressed) => ({
        backgroundColor: selected ? theme.blue[100] : 'white',
        marginVertical: 4,
        height: 54,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.gray[100],
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
            color: selected ? theme.blue[600] : theme.gray[600],
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
  const styles = !selected ? { fill: theme.gray[600] } : { fill: theme.blue[600] };
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
