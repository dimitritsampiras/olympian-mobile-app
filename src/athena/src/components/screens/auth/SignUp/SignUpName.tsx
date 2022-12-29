import { StyleSheet, Text, View } from 'react-native';
import theme from '../../../../theme';

interface SignUpNameProps {}

export const SignUpName: React.FC<SignUpNameProps> = () => {
  return (
    <>
      <View>
        <Text style={{ ...styles.heading }}>Sign Up!</Text>
        <Text style={{ ...styles.secondaryText }}>Why don't you start by telling us your name</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: '700',
    fontSize: 22,
    width: 200,
    marginBottom: 20,
  },
  secondaryText:{
    fontWeight: '300',
    fontSize: 16,
    color: theme.gray[900]
  }
});
