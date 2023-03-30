import React from 'react';
import { Text, TextProps } from 'react-native';

interface EmojiProps extends TextProps {
  unicode: string;
}

export const Emoji: React.FC<EmojiProps> = ({ unicode, ...props }) => {
  return <Text {...props}>{String.fromCodePoint(parseInt(unicode, 16))}</Text>;
};
