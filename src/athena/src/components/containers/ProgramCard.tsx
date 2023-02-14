import React from 'react';
import { Text, TouchableOpacityProps, View, ViewProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HeartIcon, GiftIcon } from 'react-native-heroicons/solid';
import { Program, UserProgramsQuery } from '../../lib/graphql';
import { specificityColor } from '../../lib/utils';
import theme from '../../theme';
import { Heading } from '../elements';
import { Badge } from '../elements/display/Badge';
import { ProgramImage } from '../elements/display/ProgramImage';
import { Card } from './Card';

interface ProgramCardProps extends ViewProps {
  program: Program | UserProgramsQuery['userPrograms'][0];
  userOwned?: boolean;
  square?: boolean;
  to?: string;
  onPress?: () => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  square = false,
  userOwned = true,
  style,
  onPress,
  ...props
}) => {
  // TODO : Replace with Program props

  // END TODO
  return (
    <TouchableOpacity style={[style]} onPress={onPress} disabled={!onPress} {...props}>
      <Card square={square} style={{ justifyContent: 'space-between' }}>
        {/* Icon */}
        <View>
          <ProgramImage size="md" style={{ marginBottom: 8 }} />

          {/* Title */}
          <Heading as="h3">{program.name}</Heading>
        </View>
        {/* Hearts */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!userOwned ? (
            <>
              <HeartIcon width={16} fill={theme.colors.rose[600]} />
              <Text style={{ marginLeft: 5 }}>{4}</Text>
            </>
          ) : (
            <>
              {program.specificity.map((spec) => {
                return (
                  <Badge key={spec} colorScheme={specificityColor(spec)} style={{ marginRight: 6 }}>
                    {spec}
                  </Badge>
                );
              })}
            </>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
