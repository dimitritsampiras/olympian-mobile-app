import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Incubator } from 'react-native-ui-lib';

import { Heading } from '../../elements';
import { BodyText } from '../../elements/typography/BodyText';

import { CreateProgramContext } from './CreateProgram';

/**
 *
 * Program Tag page form
 */
export const ProgramTags: React.FC = () => {
  const { program, setProgram } = useContext(CreateProgramContext);

  const handleSetTags = (chips: { label: string }[]) => {
    setProgram((prev) => ({ ...prev, tags: chips.map(({ label }) => label) }));
  };

  return (
    <>
      <Heading as="h2">Add tags to Programs</Heading>
      <BodyText style={{ marginBottom: 34 }}>
        Adding tags to your program helps users find it based on their interests. Use keywords to
        accurately describe your program and increase its reach.
      </BodyText>
      <View style={{ marginBottom: 24 }}>
        <Incubator.ChipsInput
          placeholder={'Enter tags..'}
          chips={program.tags?.map((chip) => ({ label: chip }))}
          maxChips={6}
          onChange={(value) => handleSetTags(value as { label: string }[])}
        />
      </View>
    </>
  );
};
