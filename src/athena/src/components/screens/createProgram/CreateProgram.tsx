import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { createContext, useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ArrowLongLeftIcon, XMarkIcon } from 'react-native-heroicons/solid';
import { PageControl } from 'react-native-ui-lib';
import _ from 'lodash';

import {
  CreateProgramInput,
  Program,
  Publicity,
  useCreateProgramMutation,
} from '../../../lib/graphql';
import theme from '../../../theme';
import { ScreenView } from '../../containers/ScreenView';
import { Button } from '../../elements';
import { RootParamList } from '../../navigation';
import { ProgramName } from './ProgramName';
import { ProgramPublicity } from './ProgramPublicity';
import { ProgramTags } from './ProgramTags';
import { UserContext } from '../../providers';

type CreateProgramProps = NativeStackScreenProps<RootParamList, 'CreateProgram'>;
type CreateProgramInputWithoutUserId = Omit<CreateProgramInput, 'userId'>;

export const CreateProgramContext = createContext({
  step: 0,
  setStep: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  program: {} as Partial<Program>,
  setProgram: (() => {}) as React.Dispatch<React.SetStateAction<CreateProgramInputWithoutUserId>>,
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
  const [program, setProgram] = useState<CreateProgramInputWithoutUserId>({
    name: '',
    publicity: Publicity.Private,
    tags: [],
  });

  const [createProgram, { loading }] = useCreateProgramMutation();

  //
  const handleSubmit = async () => {
    if (!program.name || !program.publicity) return;
    if (!user) return;
    const { data, errors } = await createProgram({
      variables: {
        input: {
          name: program.name,
          publicity: program.publicity,
          tags: program.tags,
          userId: user.id,
        },
      },
    });
    console.log(errors);

    // TODO: handle error
    if (!data?.createProgram) return;
    navigation.navigate('ProgramNavigator', { programId: data?.createProgram.id });
  };

  const handleOnNext = async () => {
    if (step >= PAGES.length - 1) {
      await handleSubmit();
    } else setStep(step + 1);
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
