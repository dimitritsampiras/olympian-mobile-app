import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthParamList } from '../../../navigation';
import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { SignUpContext } from './SignUp';
import { Input } from '../../../elements/Input';
import theme from '../../../../theme';
import { Formik } from 'formik';
import { Button } from '../../../elements/Button';
import SampleSvg from '../../../../../assets/caution.svg';
import { PageControl } from 'react-native-ui-lib';
import { object, ref, string } from 'yup';
import { SignUpInput } from '../../../../lib/graphql';
import { KeyIcon, ClipboardDocumentCheckIcon, LockClosedIcon } from 'react-native-heroicons/solid';
import { useSignUpMutation } from '../../../../lib/graphql';
import { Heading } from '../../../elements/typography/Heading';
import { BodyText } from '../../../elements/typography/Body';

// This page will be doing navigating
type ParamList = NativeStackScreenProps<AuthParamList, 'SignUp'>;
interface SignUpPasswordProps extends ParamList {}

interface SignUpInputConfirmPass extends SignUpInput {
  confirm_password: string;
}

export const SignUpPassword: React.FC<SignUpPasswordProps> = ({ navigation }) => {
  const [signup] = useSignUpMutation();
  const { signUpInput, step } = useContext(SignUpContext);
  const maxLength = 16;
  const minLength = 4;
  const passwordSchema = object({
    password: string()
      .required('Password cannot be empty.')
      .min(minLength, `Password must be at least ${minLength} characters.`)
      .max(maxLength, `Password must be at most ${maxLength} characters.`),

    confirm_password: string()
      .oneOf([ref('password'), null], 'Passwords must match.')
      .required('Please confirm your password.'),
  });

  const handleOnNext = async (values: Partial<SignUpInputConfirmPass>) => {
    // Error message better way to go?
    // Wondering what the best way to enforce that all previous fields will be non-null
    // They should never be null thanks to previous validations
    // if (!signUpInput.name || !signUpInput.email || !signUpInput.username || !signUpInput.password){
    //     console.log(`Attempted to create user failed, one or more fields is undefined.`)
    // }
    const signUpCreds = {
      name: signUpInput.name,
      email: signUpInput.email,
      username: signUpInput.username,
      // No need to update state with password before submission
      password: values.password,
    };
    console.log(`Creating user: ${signUpCreds}`);

    await signup({ variables: { input: signUpCreds as SignUpInput } });
    navigation.navigate('Login');
  };

  return (
    <Formik
      initialValues={{ password: '', confirm_password: '' }}
      onSubmit={handleOnNext}
      validationSchema={passwordSchema}>
      {({ handleSubmit, handleChange, values, errors, touched }) => {
        return (
          <>
            <View style={styles.container}>
              <View style={styles.innerContainer}>
                {/* Sample SVG to be replaced with the actual torch once we have it*/}
                <SampleSvg width={56} height={82} fill={'black'}></SampleSvg>
                <Heading noMargin style={{ textAlign: 'center' }}>
                  Password...Shhh
                </Heading>
                <BodyText style={{ textAlign: 'center' }}>
                  Enter a strong password. Don't worry, you can recover it if you forget.
                </BodyText>
                <Input
                  placeholder="password"
                  value={values.password}
                  textContentType="password"
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  autoCorrect={false}
                  autoCapitalize="none"
                  error={touched.password && !!errors.password}
                  style={styles.passwordField}
                  Icon={LockClosedIcon}
                  iconProps={{
                    size: 20,
                    fill: touched.password && !!errors.password ? 'red' : theme.gray[400],
                  }}
                />
                <Input
                  placeholder="confirm password"
                  value={values.confirm_password}
                  textContentType="password"
                  secureTextEntry={true}
                  onChangeText={handleChange('confirm_password')}
                  autoCorrect={false}
                  autoCapitalize="none"
                  error={touched.confirm_password && !!errors.confirm_password}
                  style={styles.passwordField}
                  Icon={ClipboardDocumentCheckIcon}
                  iconProps={{
                    size: 20,
                    fill:
                      touched.confirm_password && !!errors.confirm_password
                        ? 'red'
                        : theme.gray[400],
                  }}
                />
                {/* Password error message takes priority */}
                <Text style={styles.errorMessageStyle}>
                  {touched.confirm_password && (errors.password || errors.confirm_password)}
                </Text>
              </View>
              <View style={styles.footer}>
                <PageControl
                  color={theme.blue[500]}
                  inactiveColor={theme.gray[200]}
                  currentPage={step}
                  numOfPages={4}
                  limitShownPages
                  spacing={8}
                  size={8}
                />
                <Button style={{ padding: 19, width: '100%' }} onPress={handleSubmit as () => void}>
                  Create Account
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
    height: '60%',
    width: '100%',
  },
  passwordField: {
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
