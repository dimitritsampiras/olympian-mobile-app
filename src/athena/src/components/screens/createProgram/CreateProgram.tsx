import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { createContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ArrowLongLeftIcon, XMarkIcon } from 'react-native-heroicons/solid';
import { PageControl } from 'react-native-ui-lib';
import { Program } from '../../../lib/graphql';

import theme from '../../../theme';
import { ScreenView } from '../../containers/ScreenView';
import { Button } from '../../elements';
import { RootParamList } from '../../navigation';
import { ProgramName } from './ProgramName';
import { ProgramPublicity } from './ProgramPublicity';
import { ProgramTags } from './ProgramTags';

type ParamList = NativeStackScreenProps<RootParamList, 'CreateProgram'>;

interface CreateProgramProps extends ParamList {}

export const CreateProgramContext = createContext({
  step: 0,
  setStep: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  program: {} as Partial<Program>,
  setProgram: (() => {}) as React.Dispatch<React.SetStateAction<Partial<Program>>>,
});

const PAGES = [ProgramName, ProgramPublicity, ProgramTags];

/**
 *
 * Create Program Multi-page form
 */
export const CreateProgram: React.FC<CreateProgramProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  const [program, setProgram] = useState<Partial<Program>>({
    name: '',
  });

  const [step, setStep] = useState(0);

  const handleOnNext = () => {
    if (step >= PAGES.length - 1) navigation.navigate('ProgramNavigator');
    setStep(step + 1);
  };

  return (
    <CreateProgramContext.Provider value={{ program, setProgram, step, setStep }}>
      <ScreenView type="form" spaced>
        <View>
          <View
            style={{
              height: 45,
              marginBottom: 24,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {step > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setStep((prev) => (prev > 0 ? prev - 1 : prev));
                }}>
                <ArrowLongLeftIcon color={theme.blue[600]} />
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
            <TouchableOpacity onPress={navigation.goBack}>
              <XMarkIcon color={theme.coolGray[500]} />
            </TouchableOpacity>
          </View>
          <View>{PAGES.map((Page, i) => i === step && <Page key={i} />)}</View>
        </View>
        <View>
          <Button shadow={false} style={{ marginBottom: 24 }} onPress={handleOnNext}>
            Next
          </Button>
          <PageControl
            color={theme.blue[500]}
            inactiveColor={theme.gray[200]}
            currentPage={step}
            numOfPages={PAGES.length}
            limitShownPages
            spacing={8}
            size={8}
          />
        </View>
      </ScreenView>
    </CreateProgramContext.Provider>
  );
};
