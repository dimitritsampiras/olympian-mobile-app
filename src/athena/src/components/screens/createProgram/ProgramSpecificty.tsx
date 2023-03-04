import React, { useContext } from 'react';
import { View } from 'react-native';
import { Specificity } from '../../../lib/graphql';
import { ThemeColor } from '../../../lib/types';
import { specificityColor } from '../../../lib/utils';
import { Heading } from '../../elements';
import { SelectableBadge } from '../../elements/form/SelectableBadge';
import { BodyText } from '../../elements/typography/BodyText';

import { CreateProgramContext } from './CreateProgram';

/**
 *
 * Program Tag page form
 */
export const ProgramSpecificty: React.FC = () => {
  const { program, setProgram } = useContext(CreateProgramContext);

  const isDisabled = (spec: Specificity) => {
    return program.specificity.length >= 2 && !program.specificity.includes(spec);
  };

  const handleSetSpecificty = (spec: Specificity) => {
    if (isDisabled(spec)) return;
    setProgram((prev) => ({
      ...prev,
      specificity: prev.specificity.includes(spec)
        ? prev.specificity.filter((s) => s !== spec)
        : [...prev.specificity, spec],
    }));
  };

  return (
    <>
      <Heading as="h2">Specificity</Heading>
      <BodyText style={{ marginBottom: 34 }}>
        Select the specific focus of the program you are creating.
      </BodyText>
      <View style={{ marginBottom: 24, flexDirection: 'row', flexWrap: 'wrap' }}>
        {Object.values(Specificity).map((specificty) => (
          <SelectableBadge
            key={specificty}
            colorScheme={specificityColor(specificty)}
            onSelect={() => handleSetSpecificty(specificty)}
            selected={program.specificity.includes(specificty)}
            disabled={isDisabled(specificty)}
            style={{ marginRight: 6, marginBottom: 6 }}>
            {specificty}
          </SelectableBadge>
        ))}
      </View>
    </>
  );
};
