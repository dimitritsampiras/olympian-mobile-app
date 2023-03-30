import React, { useState } from 'react';
import { Text, TextInput, View, ViewProps } from 'react-native';
import { SetFragment, useUpdateSetRepsMutation, useUpdateSetRpeMutation } from '../../lib/graphql';
import theme from '../../theme';
import { Card } from './Card';

interface SetCardProps {
  set: SetFragment;
  style?: ViewProps['style'];
}

export const SetCard: React.FC<SetCardProps> = ({ set, style }) => {
  const [repsInput, setRepsInput] = useState(set.reps.toString());
  const [rpeInput, setRpeInput] = useState(set.rpe.toString());

  const [updateReps] = useUpdateSetRepsMutation();
  const [updateRpe] = useUpdateSetRpeMutation();

  const handleRepsChange = async (text: string) => {
    const intValue = parseInt(text, 10);
    if (isNaN(intValue)) {
      setRepsInput('');
      return;
    }
    setRepsInput(text);
    await updateReps({ variables: { setId: set.id, reps: intValue } });
  };

  const handleRpeChange = async (text: string) => {
    const intValue = parseInt(text, 10);
    if (isNaN(intValue)) {
      setRpeInput('');
      return;
    }
    setRpeInput(text);
    await updateRpe({ variables: { setId: set.id, rpe: intValue } });
  };

  return (
    <Card
      key={set.id}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderRadius: 16,
        },
        style,
      ]}>
      <Text>Set {set.number}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          keyboardType="numeric"
          maxLength={2}
          style={{
            backgroundColor: theme.colors.gray[100],
            padding: 6,
            width: 30,
            borderRadius: 4,
            textAlign: 'right',
            marginRight: 8,
          }}
          value={repsInput}
          onChangeText={(text) => handleRepsChange(text)}
        />
        <Text>reps</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          keyboardType="numeric"
          maxLength={2}
          style={{
            backgroundColor: theme.colors.gray[100],
            padding: 6,
            width: 30,
            borderRadius: 4,
            textAlign: 'right',
            marginRight: 8,
          }}
          value={rpeInput}
          onChangeText={(text) => handleRpeChange(text)}
        />
        <Text>rpe</Text>
      </View>
    </Card>
  );
};
