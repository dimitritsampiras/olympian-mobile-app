import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { createContext, useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ArrowLongLeftIcon, XMarkIcon } from 'react-native-heroicons/solid';
import { PageControl } from 'react-native-ui-lib';
import _ from 'lodash';

import { Program, Publicity, useCreateProgramMutation } from '../../../lib/graphql';
import theme from '../../../theme';
import { ScreenView } from '../../containers/ScreenView';
import { Button } from '../../elements';
import { RootParamList } from '../../navigation';
import { ProgramName } from './ProgramName';
import { ProgramPublicity } from './ProgramPublicity';
import { ProgramTags } from './ProgramTags';
import { UserContext } from '../../providers';

type CreateProgramProps = NativeStackScreenProps<RootParamList, 'CreateProgram'>;

export const CreateProgramContext = createContext({
  step: 0,
  setStep: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  program: {} as Partial<Program>,
  setProgram: (() => {}) as React.Dispatch<React.SetStateAction<Partial<Program>>>,
  handleOnNext: () => {},
});

const PAGES = [ProgramName, ProgramPublicity, ProgramTags];

/**
 *
 * Create Program Multi-page form
 */
export const CreateProgram: React.FC<CreateProgramProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const { user } = useContext(UserContext);

  // state
  const [step, setStep] = useState(0);
  const [program, setProgram] = useState<Partial<Program>>({
    name: '',
    publicity: Publicity.Private,
  });

  const [createProgram, { loading }] = useCreateProgramMutation();

  //
  const handleSubmit = async () => {
    if (!program.name || !program.publicity || !program.tags) return;
    if (!user) return;
    const { data } = await createProgram({
      variables: {
        input: {
          name: program.name,
          publicity: program.publicity,
          tags: program.tags,
          userId: user.id,
        },
      },
    });
    // TODO: handle error
    if (!data?.createProgram) return;
    navigation.navigate('ProgramNavigator', { programId: data?.createProgram.id });
  };

  const handleOnNext = () => {
    if (step <= PAGES.length) handleSubmit();
    setStep(step + 1);
  };

  return (
    <CreateProgramContext.Provider value={{ program, setProgram, step, setStep, handleOnNext }}>
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
                <ArrowLongLeftIcon color={theme.colors.blue[600]} />
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
            <TouchableOpacity onPress={navigation.goBack}>
              <XMarkIcon color={theme.colors.coolGray[500]} />
            </TouchableOpacity>
          </View>

          {/* page form */}
          <View>{PAGES.map((Page, i) => i === step && <Page key={i} />)}</View>
        </View>
        <View>
          <Button
            loading={loading}
            disabled={_.isEmpty(program.name)}
            shadow={false}
            style={{ marginBottom: 24 }}
            onPress={handleOnNext}>
            {step >= PAGES.length - 1 ? 'Submit' : 'Next'}
          </Button>
          <PageControl
            color={theme.colors.blue[500]}
            inactiveColor={theme.colors.gray[200]}
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
