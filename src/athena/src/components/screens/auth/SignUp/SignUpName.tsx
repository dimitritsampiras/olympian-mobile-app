import { StyleSheet, Text, TextInputProps, View } from 'react-native';
import { useContext } from 'react';
import { Input } from '../../../elements/Input';
import theme from '../../../../theme';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { SignUpInput } from '../../../../lib/graphql';
import { UserIcon } from 'react-native-heroicons/solid';

import { SignUpContext } from '../../../../lib/context';
import { FormikHandleChange } from '../../../../lib/types';
interface SignUpNameProps extends TextInputProps {
  handleChange: FormikHandleChange;
}

export const SignUpName: React.FC<SignUpNameProps> = () => {
  const { setSignUpInput, step, setStep } = useContext(SignUpContext);
  const maxLength = 16;
  const nameSchema = object({
    // We may opt to make this optional in the future.
    name: string()
      .required('Cannot have an empty name.')
      .matches(/^[a-zA-Z]+$/, 'Name must only be composed of letters.')
      .max(maxLength, `Please enter a maximum of ${maxLength} characters.`),
  });

  const handleOnNext = (values: Partial<SignUpInput>) => {
    setSignUpInput((previousValues) => ({ ...previousValues, name: values.name }));
    setStep(step + Number(step < 4));
  };

  return (
    <Formik initialValues={{ name: '' }} onSubmit={handleOnNext} validationSchema={nameSchema}>
      {({ handleSubmit, handleChange, values, errors, touched }) => {
        return (
          <>
            <Input
              placeholder="name"
              value={values.name}
              onChangeText={handleChange('name')}
              autoCorrect={false}
              autoCapitalize="words"
              error={touched.name && !!errors.name}
              style={styles.nameField}
              Icon={UserIcon}
              iconProps={{
                size: 20,
                fill: touched.name && !!errors.name ? 'red' : theme.colors.gray[400],
              }}
            />
            <Text style={styles.errorMessageStyle}>{touched.name && errors.name}</Text>
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50%',
    width: '100%',
  },
  nameField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  errorMessageStyle: {
    fontSize: 14,
    color: 'red',
    // Fix the lineHeight to prevent bumping when the text comes in
    lineHeight: 13,
  },
});
