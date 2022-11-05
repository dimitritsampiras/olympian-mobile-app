import React from 'react';
import { Text, View } from 'react-native';
import { Card } from '../components/containers/Card';
import { Exercise } from '../components/containers/Exercise';
import { Button } from '../components/elements/Button';
import { Input } from '../components/elements/Input';
import theme from '../theme';

export const Home: React.FC = () => {
  return (
    <View
      style={{
        paddingLeft: 22,
        paddingRight: 22,
        marginTop: 10
      }}
    >
      {/* <Input style={{ marginBottom: 20, marginTop: 20 }} />
      <Button>Button</Button> */}
      <Exercise
        exerciseName="Bench Press"
        muscles={[
          { slug: 'chest', color: 'blue' },
          { slug: 'front-deltoids', color: theme.blue[600], intensity: 2 }
        ]}
      />
    </View>
  );
};
