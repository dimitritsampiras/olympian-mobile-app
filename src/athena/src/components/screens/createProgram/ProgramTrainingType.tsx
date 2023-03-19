import React, { useContext } from 'react';
import { View } from 'react-native';
import { CreateProgramContext } from '../../../lib/context';
import { BROWSE_CATGEORIES } from '../../../lib/data';
import { TrainingType } from '../../../lib/graphql';
import { Heading } from '../../elements';
import { SelectableBadge } from '../../elements/form/SelectableBadge';
import { BodyText } from '../../elements/typography/BodyText';

const TRAINING_TYPE_LIMIT = 4;

/**
 *
 * Program Tag page form
 */
export const ProgramTrainingType: React.FC = () => {
  const { program, setProgram } = useContext(CreateProgramContext);

  const isDisabled = (trainingType: TrainingType) => {
    return (
      program.trainingType.length >= TRAINING_TYPE_LIMIT &&
      !program.trainingType.includes(trainingType)
    );
  };

  const handleSetSpecificty = (trainingType: TrainingType) => {
    if (isDisabled(trainingType)) return;
    setProgram((prev) => ({
      ...prev,
      trainingType: prev.trainingType.includes(trainingType)
        ? prev.trainingType.filter((tt) => tt !== trainingType)
        : [...prev.trainingType, trainingType],
    }));
  };

  return (
    <>
      <Heading as="h2">Training Type</Heading>
      <BodyText style={{ marginBottom: 34 }}>
        Select the specific focus of the program you are creating. You can pick up to 4.
      </BodyText>
      <View style={{ marginBottom: 24, flexDirection: 'row', flexWrap: 'wrap' }}>
        {Object.values(TrainingType).map((trainingType) => (
          <SelectableBadge
            key={trainingType}
            colorScheme={BROWSE_CATGEORIES[trainingType][0]}
            onSelect={() => handleSetSpecificty(trainingType)}
            selected={program.trainingType.includes(trainingType)}
            disabled={isDisabled(trainingType)}
            style={{ marginRight: 6, marginBottom: 6 }}>
            {trainingType.replaceAll('_', ' ')}
          </SelectableBadge>
        ))}
      </View>
    </>
  );
};
