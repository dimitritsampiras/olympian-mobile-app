import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../elements/Button';
import { AuthParamList } from '../../navigation/AuthNavigation';
import TorchLogo from '../../../../assets/caution.svg';

type LandingPageNav = NativeStackScreenProps<AuthParamList, 'LandingPage'>;

interface LandingPageProps extends LandingPageNav {}

export const LandingPage: React.FC<LandingPageProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* heading section */}
        <View style={{ alignItems: 'center' }}>
          <TorchLogo width={56} height={82} style={{ marginBottom: 20 }}></TorchLogo>
          <Text style={styles.preHeading}>Welcome to</Text>
          <Text style={styles.heading1}>Olympian</Text>
        </View>
        {/* buttons */}
        <View style={{ width: '100%' }}>
          <Button style={{ marginBottom: 17 }} onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Button>
          <Button onPress={() => navigation.navigate('Login')}>Log In</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 320,
  },
  heading1: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  preHeading: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#4B5563',
  },
});
