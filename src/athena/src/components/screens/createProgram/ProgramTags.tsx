import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Incubator, Text } from 'react-native-ui-lib';
import { Button } from '../../elements/Button';
import { CreateProgramContext } from '../../providers/CreateProgramProvider';

interface ProgramTagsProps {
  // nextPage: () => void;
  navtoWorkoutForm: () => void;
}

export const ProgramTags: React.FC<ProgramTagsProps> = ({ navtoWorkoutForm }) => {
  const { program, setProgram } = useContext(CreateProgramContext);

  const [chips, setChips] = useState<{ label: string }[]>(
    program.tags?.map((tag) => ({ label: tag })) || []
  );

  const handleOnNext = () => {
    setProgram((prev) => ({ ...prev, tags: chips.map(({ label }) => label) }));
    // nextPage();
    navtoWorkoutForm();
  };

  return (
    <>
      <Text style={styles.heading}>Add Tags to Program</Text>
      <View style={{ marginBottom: 24 }}>
        <Incubator.ChipsInput
          placeholder={'Enter tags..'}
          chips={chips}
          maxChips={6}
          onChange={(value) => setChips(value as { label: string }[])}
        />
      </View>
      <Button shadow={false} onPress={handleOnNext} style={{ marginTop: 30 }}>
        Next
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: '700',
    fontSize: 22,
    width: 200,
    marginBottom: 40,
  },
});
