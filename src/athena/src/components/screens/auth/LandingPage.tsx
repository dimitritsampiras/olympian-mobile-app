import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../elements/Button';
import { AuthParamList } from '../../navigation/AuthNavigator';
import TorchLogo from '../../../../assets/TorchLogo.svg';
import { ScreenView } from '../../containers/ScreenView';

type LandingPageNav = NativeStackScreenProps<AuthParamList, 'LandingPage'>;

interface LandingPageProps extends LandingPageNav {}

export const LandingPage: React.FC<LandingPageProps> = ({ navigation }) => {
  return (
    <ScreenView type="form" style={styles.container}>
      {/* heading section */}
      <View style={{ alignItems: 'center' }}>
        <TorchLogo width={56} height={82} style={{ marginBottom: 20 }}></TorchLogo>
        <Text style={[styles.preHeading, { fontFamily: 'Inter_700Bold' }]}>Welcome to</Text>
        <Text style={[styles.heading1, { fontFamily: 'Inter_800ExtraBold' }]}>Olympian</Text>
      </View>
      {/* buttons */}
      <View style={{ width: '100%' }}>
        <Button style={{ marginBottom: 17 }} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Button>
        <Button variant="flat" onPress={() => navigation.navigate('Login')}>
          Log In
        </Button>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 28,
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
