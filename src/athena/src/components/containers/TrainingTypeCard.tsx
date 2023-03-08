import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { BROWSE_CATGEORIES } from '../../lib/data';
import { TrainingType } from '../../lib/graphql';
import theme from '../../theme';
import { Emoji, Heading } from '../elements';

interface TrainingTypeCardProps extends TouchableOpacityProps {
  trainingType: TrainingType;
}

export const TrainingTypeCard: React.FC<TrainingTypeCardProps> = ({ trainingType, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors[BROWSE_CATGEORIES[trainingType][0]][500],
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
        width: '48%',
      }}
      {...props}>
      <Heading as="h4" noMargin style={{ color: 'white', width: 60, textTransform: 'capitalize' }}>
        {trainingType.split('_').join(' ').split(' ').join('\n')}
      </Heading>
      <View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme.radius.md,
        }}>
        <Emoji unicode={BROWSE_CATGEORIES[trainingType][1]} style={{ fontSize: 30 }} />
      </View>
    </TouchableOpacity>
  );
};
