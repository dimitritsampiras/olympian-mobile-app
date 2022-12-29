import { StyleSheet, Text, View } from 'react-native';
import { Input } from '../../../elements/Input';
import theme from '../../../../theme';
import SampleSvg from '../../../../../assets/caution.svg';

interface SignUpNameProps {}

export const SignUpName: React.FC<SignUpNameProps> = () => {
  return (
    <View style={styles.container}>
      {/* Sample SVG to be replaced with the actual torch */}
      <SampleSvg width={56} height={82} fill={'black'}></SampleSvg>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.secondaryText}>
        Why don't you start by telling us your name? This won't be displayed publicly.
      </Text>
      <Input
        placeholder="username"
        value={''}
        onChangeText={() => {}}
        autoCorrect={false}
        autoCapitalize="none"
        error={false}
        style={styles.nameField}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    fontWeight: '700',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 35,
  },
  secondaryText: {
    fontWeight: '500',
    fontSize: 16,
    color: theme.gray[400],
    textAlign: 'center',
    marginBottom: 35,
  },
  nameField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
