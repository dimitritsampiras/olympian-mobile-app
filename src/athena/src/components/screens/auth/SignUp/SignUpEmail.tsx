import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { Input } from '../../../elements/Input';
import theme from '../../../../theme';
import { Formik } from 'formik';
import { Button } from '../../../elements/Button';
import TorchLogo from '../../../../../assets/TorchLogo.svg';
import { PageControl } from 'react-native-ui-lib';
import { object, string } from 'yup';
import { SignUpInput } from '../../../../lib/graphql';
import { AtSymbolIcon } from 'react-native-heroicons/solid';
import { useEmailExistsLazyQuery } from '../../../../lib/graphql';
import { Heading } from '../../../elements/typography/Heading';
import { BodyText } from '../../../elements/typography/BodyText';
import { SignUpContext } from '../../../../lib/context';

interface SignUpEmailProps {}

export const SignUpEmail: React.FC<SignUpEmailProps> = () => {
  const { signUpInput, setSignUpInput, step, setStep } = useContext(SignUpContext);
  const [findemail] = useEmailExistsLazyQuery();
  const maxLength = 32;
  const emailSchema = object({
    email: string()
      .required('Cannot have an empty email address.')
      .email('Please enter a valid email address.')
      .max(maxLength, `Please enter a maximum of ${maxLength} characters.`)
      .test('', 'Email is already used on another account.', async (email) => {
        const { data } = await findemail({ variables: { email: email || '' } });
        return !data?.emailExists;
      }),
  });

  const handleOnNext = (values: Partial<SignUpInput>) => {
    setSignUpInput((previousValues) => ({ ...previousValues, email: values.email }));
    setStep(step + Number(step + 1 < 4));
  };

  return (
    <Formik initialValues={{ email: '' }} onSubmit={handleOnNext} validationSchema={emailSchema}>
      {({ handleSubmit, handleChange, values, errors, touched }) => {
        return (
          <>
            <View style={styles.container}>
              <View style={styles.innerContainer}>
                {/* Sample SVG to be replaced with the actual torch once we have it*/}
                {/* <TorchLogo width={56} height={82} fill={'black'}></TorchLogo> */}
                <Heading> Hello, {signUpInput.name} </Heading>
                <BodyText style={{ marginBottom: 24 }}>
                  Please enter your email address, just in case you forget your password.{' '}
                </BodyText>
                <Input
                  placeholder="email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  autoCorrect={false}
                  autoCapitalize="none"
                  error={touched.email && !!errors.email}
                  style={styles.emailField}
                  Icon={AtSymbolIcon}
                  iconProps={{
                    size: 20,
                    fill: touched.email && !!errors.email ? 'red' : theme.colors.gray[400],
                  }}
                />
                <Text style={styles.errorMessageStyle}>
                  {(touched.email && errors.email) || ''}
                </Text>
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
    // alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    width: '100%',
  },
  emailField: {
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
    marginBottom: 14,
    // Fix the lineHeight to prevent bumping when the text comes in
    lineHeight: 13,
  },
});
