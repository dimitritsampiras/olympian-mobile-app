import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Incubator, PageControl, Text } from 'react-native-ui-lib';
import { Button } from '../elements/Button';

import theme from '../../theme';
import { RootParamList } from '../../navigation';

type ParamList = NativeStackScreenProps<RootParamList, 'CreateProgram'>;

interface CreateProgramProps extends ParamList {}

export const CreateProgram: React.FC<CreateProgramProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <Text>Enter Program Name</Text>
      <Incubator.TextField
        placeholder={'Placeholder'}
        floatingPlaceholder
        showCharCounter
        maxLength={30}
      />
      {/* <PageControl
        color={theme.blue[500]}
        inactiveColor={theme.gray[200]}
        numOfPages={5}
        currentPage={0}
      /> */}
      <Button shadow={false}>Next</Button>
    </SafeAreaView>
  );
};

const fieldStyle: ViewStyle = {
  backgroundColor: theme.gray[100],
  padding: 20
};
