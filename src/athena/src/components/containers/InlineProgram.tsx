import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Program } from '../../lib/graphql';
import theme from '../../theme';
import { Heading, ProgramImage } from '../elements';

interface InlineProgramProps {
  program: Program;
  onPress: () => void;
}

export const InlineProgram: React.FC<InlineProgramProps> = ({ program, onPress }) => {
  return (
    <TouchableOpacity
      key={program.id}
      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
      onPress={onPress}>
      <ProgramImage
        bgColor={program.programImageDefaultColor}
        emojiCode={program.programImageDefaultEmoji}
      />
      <View style={{ marginLeft: 12 }}>
        <Heading as="h4">{program.name}</Heading>
        <Text style={{ color: theme.colors.gray[700], marginTop: 2, fontSize: 12 }}>
          {program.inLibraryOf.length} users · {program.likes || 0} likes
        </Text>
      </View>
    </TouchableOpacity>
  );
};
