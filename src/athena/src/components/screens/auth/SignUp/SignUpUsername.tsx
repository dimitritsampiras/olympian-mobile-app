import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { SignUpContext } from './SignUp';
import { Input } from '../../../elements/Input';
import theme from '../../../../theme';
import { Formik } from 'formik';
import { Button } from '../../../elements/Button';
import SampleSvg from '../../../../../assets/caution.svg';
import { PageControl } from 'react-native-ui-lib';
import { object, string } from 'yup';
import { SignUpInput } from '../../../../lib/graphql';
import { UserCircleIcon } from 'react-native-heroicons/solid';
import { useUserExistsLazyQuery } from '../../../../lib/graphql';
import { Heading } from '../../../elements/typography/Heading';
import { BodyText } from '../../../elements/typography/Body';

interface SignUpUsernameProps {}

export const SignUpUsername: React.FC<SignUpUsernameProps> = () => {
  const [findusername] = useUserExistsLazyQuery();
  const { setSignUpInput, step, setStep } = useContext(SignUpContext);
  const maxLength = 16;
  const usernameSchema = object({
    username: string()
      .required('Cannot have an empty username.')
      .matches(
        /^[a-zA-Z0-9_]+$/,
        'Username can only be composed of letters, numbers, and underscores.'
      )
      .max(maxLength, `Please enter a maximum of ${maxLength} characters.`)
      .test('', 'Username is already in use.', async (username) => {
        const { data } = await findusername({ variables: { username: username || '' } });
        return !data?.usernameExists;
      }),
  });

  const handleOnNext = (values: Partial<SignUpInput>) => {
    setSignUpInput((previousValues) => ({ ...previousValues, username: values.username }));
    setStep(step + Number(step + 1 < 4));
  };

  return (
    <Formik
      initialValues={{ username: '' }}
      onSubmit={handleOnNext}
      validationSchema={usernameSchema}>
      {({ handleSubmit, handleChange, values, errors, touched }) => {
        return (
          <>
            <View style={styles.container}>
              <View style={styles.innerContainer}>
                {/* Sample SVG to be replaced with the actual torch once we have it*/}
                <SampleSvg width={56} height={82} fill={'black'}></SampleSvg>
                <Heading noMargin style={{ textAlign: 'center' }}>
                  Username Time
                </Heading>
                <BodyText style={{ textAlign: 'center' }}>
                  This will be the name you display publicly. Make it uniquely yours!
                </BodyText>

                <Input
                  placeholder="username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  autoCorrect={false}
                  autoCapitalize="none"
                  error={touched.username && !!errors.username}
                  style={styles.usernameField}
                  Icon={UserCircleIcon}
                  iconProps={{
                    size: 20,
                    fill: touched.username && !!errors.username ? 'red' : theme.gray[400],
                  }}
                />
                <Text style={styles.errorMessageStyle}>{touched.username && errors.username}</Text>
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
                <Button style={{ padding: 19 }} onPress={handleSubmit as () => void}>
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
  usernameField: {
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
