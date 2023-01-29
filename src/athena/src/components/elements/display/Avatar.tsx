import React from 'react';
import { Image, Text, View } from 'react-native';

interface Props {
  size?: 'small' | 'medium' | 'large';
  src?: string;
  placeholder?: string;
}

const Avatar: React.FC<Props> = ({ size = 'medium', src, placeholder }) => {
  const dimension = size === 'small' ? 32 : size === 'medium' ? 64 : 128;
  return (
    <View
      style={{
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2,
        overflow: 'hidden',
      }}>
      {src ? (
        <Image source={{ uri: src }} style={{ width: '100%', height: '100%' }} />
      ) : placeholder ? (
        <Text style={{ fontSize: dimension / 2, textAlign: 'center' }}>{placeholder}</Text>
      ) : (
        <Text style={{ fontSize: dimension / 2, textAlign: 'center' }} aria-label="Placeholder">
          🤔
        </Text>
      )}
    </View>
  );
};

export default Avatar;
