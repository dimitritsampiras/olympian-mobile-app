// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Formik, FormikHelpers } from 'formik';
// import React, { useState } from 'react';
// import {
//   Text,
//   TouchableWithoutFeedback,
//   Keyboard,
//   KeyboardAvoidingView,
//   Button,
//   StyleSheet,
//   View
// } from 'react-native';
// import { ScrollView, TextInput } from 'react-native-gesture-handler';
// import { Value } from 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import styled from 'styled-components/native';
// import { ActionButton } from '../components/ActionButton';
// import { FormInput } from '../components/FormInput';
// import { useRegisterMutation } from '../graphql/generated/graphql';
// import theme from '../theme';
// import { RegisterNavigationProps } from '../types/navigation';
// import { retrieveToken, storeToken } from '../utils/storage';

// interface RegisterProps {
//   setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
//   navigation: RegisterNavigationProps;
// }

// interface IRegFormValues {
//   fullname: string;
//   username: string;
//   email: string;
//   password: string;
// }

// export const Register: React.FC<RegisterProps> = ({ setLoggedIn, navigation }) => {
//   // graphql
//   const [register, { loading, data }] = useRegisterMutation();

//   // initial form values
//   const initialValues: IRegFormValues = {
//     fullname: '',
//     username: '',
//     email: '',
//     password: ''
//   };

//   const handleSubmit = async (
//     values: IRegFormValues,
//     { setErrors }: FormikHelpers<IRegFormValues>
//   ) => {
//     const response = await register({
//       variables: {
//         ...values
//       }
//     });
//     const user = response.data?.register?.user;
//     const error = response.data?.register?.error;
//     if (error === null && user?.token) {
//       await AsyncStorage.setItem('AUTH_TOKEN', user?.token!);
//       setLoggedIn(true);
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//       <SafeAreaView style={styles.screen}>
//         <KeyboardAvoidingView style={styles.keyboardView} behavior={'padding'}>
//           <Text style={{ ...styles.heading2, marginBottom: 20 }}>Create an Account</Text>
//           <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//             {({ handleChange, handleBlur, handleSubmit, values }) => (
//               <View style={{ width: '100%' }}>
//                 <FormInput
//                   placeholder="name"
//                   onChangeText={handleChange('fullname')}
//                   value={values.fullname}
//                 />
//                 <FormInput
//                   placeholder="username"
//                   onChangeText={handleChange('username')}
//                   value={values.username}
//                 />
//                 <FormInput
//                   placeholder="email"
//                   onChangeText={handleChange('email')}
//                   value={values.email}
//                 />
//                 <FormInput
//                   placeholder="password"
//                   onChangeText={handleChange('password')}
//                   value={values.password}
//                   secureTextEntry={true}
//                 />
//                 <ActionButton title="Sign Up" primary onPress={handleSubmit as any} />
//               </View>
//             )}
//           </Formik>
//           {data?.register?.error ? (
//             <Text style={{ marginTop: 30 }}>Error: {data?.register?.error?.message}</Text>
//           ) : (
//             <Text></Text>
//           )}
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     display: 'flex',
//     alignItems: 'center',
//     flex: 1,
//     ...theme.padding(0, 30)
//   },
//   keyboardView: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//     width: 320
//   },
//   heading2: {
//     fontSize: 20,
//     fontWeight: '600',
//     textAlign: 'center',
//     zIndex: 99
//   }
// });
