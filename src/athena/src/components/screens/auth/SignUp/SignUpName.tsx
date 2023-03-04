import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { SignUpContext } from './SignUp';
import { Input } from '../../../elements/Input';
import theme from '../../../../theme';
import { Formik } from 'formik';
import { Button } from '../../../elements/Button';
import TorchLogo from '../../../../../assets/TorchLogo.svg';
import { PageControl } from 'react-native-ui-lib';
import { object, string } from 'yup';
import { SignUpInput } from '../../../../lib/graphql';
import { UserIcon } from 'react-native-heroicons/solid';
import { Heading } from '../../../elements/typography/Heading';
import { BodyText } from '../../../elements/typography/BodyText';

interface SignUpNameProps {}

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
            <View style={styles.container}>
              <View style={styles.innerContainer}>
                {/* Sample SVG to be replaced with the actual torch once we have it*/}
                <TorchLogo width={56} height={82}></TorchLogo>
                <Heading noMargin style={{ textAlign: 'center' }}>
                  Sign Up
                </Heading>
                <BodyText style={{ textAlign: 'center' }}>
                  {"Why don't you start by telling us your name? This won't be displayed publicly."}
                </BodyText>
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
              </View>
              <View style={styles.footer}>
                <PageControl
                  color={theme.colors.blue[500]}
                  inactiveColor={theme.colors.gray[200]}
                  currentPage={step}
                  numOfPages={4}
                  limitShownPages
                  spacing={8}
                  size={8}
                />
                <Button style={{ padding: 19, width: '100%' }} onPress={handleSubmit as () => void}>
                  Next
                </Button>
              </View>
            </View>
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
    lineHeight: 14,
  },
});
