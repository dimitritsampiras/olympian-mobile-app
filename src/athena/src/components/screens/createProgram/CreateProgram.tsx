import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ArrowLongLeftIcon, XMarkIcon } from 'react-native-heroicons/solid';
import { PageControl } from 'react-native-ui-lib';
import _ from 'lodash';

import { Publicity, useCreateProgramMutation } from '../../../lib/graphql';
import theme from '../../../theme';
import { ScreenView } from '../../containers/ScreenView';
import { Button } from '../../elements';
import { ProgramName } from './ProgramName';
import { ProgramPublicity } from './ProgramPublicity';

import { ProgramTrainingType } from './ProgramTrainingType';
import { HomeParamList } from '../../navigation/HomeNavigator';
import { CreateProgramContext, UserContext } from '../../../lib/context';
import { CreateProgramInputWithoutUserId } from '../../../lib/types';
import { useIsFocused } from '@react-navigation/native';

type CreateProgramProps = NativeStackScreenProps<HomeParamList, 'CreateProgram'>;

const PAGES = [ProgramName, ProgramPublicity, ProgramTrainingType];

/**
 *
 * Create Program Multi-page form
 */
export const CreateProgram: React.FC<CreateProgramProps> = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const focused = useIsFocused();
  console.log(focused, route.name);

  // state
  const [step, setStep] = useState(0);
  const [program, setProgram] = useState<CreateProgramInputWithoutUserId>({
    name: '',
    publicity: Publicity.Private,
    tags: [],
    trainingType: [],
  });

  const [createProgram, { loading }] = useCreateProgramMutation();

  //
  const handleSubmit = async () => {
    if (!program.name || !program.publicity) return;

    if (!user) return;
    const { data } = await createProgram({
      variables: {
        input: {
          name: program.name,
          publicity: program.publicity,
          tags: program.tags,
          trainingType: program.trainingType,
          userId: user.id,
        },
      },
    });

    // TODO: handle error
    if (!data?.createProgram) return;
    navigation.navigate('ProgramNavigator', { programId: data?.createProgram.id });
  };

  const handleOnNext = async () => {
    if (!program.name) return;
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
