import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { Header } from '../../containers/Header';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenView } from '../../containers/ScreenView';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { ProgramParamList } from '../../navigation/ProgramNavigator';
import { Input, SubHeading } from '../../elements';
import { Button, Heading } from '../../elements';
import { ActiveWorkoutContext } from '../../../lib/context';
import { useWorkoutFromIdQuery } from '../../../lib/graphql';
import {
    useUpdateWorkoutNameMutation
} from '../../../lib/graphql';

type WorkoutProps = NativeStackScreenProps<ProgramParamList, 'WorkoutEdit'>;

export const WorkoutEdit: React.FC<WorkoutProps> = ({ route, navigation }) => {
    const { workoutId } = route.params;
    const [updateWorkoutName] = useUpdateWorkoutNameMutation();
    const maxLength = 12;
    const workoutNameSchema = object({
        name: string()
            .required('Cannot have an empty name.')
            .matches(/^[a-zA-Z]+$/, 'Name must only be composed of letters.')
            .max(maxLength, `Please enter a maximum of ${maxLength} characters.`),
    });

    const handleOnNext = async ({name} : {name : string}) => {
        await updateWorkoutName({variables:{name,workoutId}})
        navigation.goBack()
    };


    return (
        <ScreenView>
            <View>

                <Formik initialValues={{ name: '' }} onSubmit={handleOnNext} validationSchema={workoutNameSchema}>
                    {({ handleSubmit, handleChange, values, errors, touched }) => {
                        return (
                            <>
                                <Header navigation={navigation}></Header>
                                <SubHeading as="h2">Set the new workout name:</SubHeading>
                                <Input
                                    placeholder="name"
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    autoCorrect={false}
                                    autoCapitalize="words"
                                    error={false}
                                />
                                <Button style={{ marginTop: 15 }} variant="flat" colorScheme="primary" onPress={handleSubmit as () => void}>
                                    Update
                                </Button>
                                {/* <Text style={styles.errorMessageStyle}>{touched.name && errors.name}</Text> */}
                            </>
                        );
                    }}
                </Formik>
            </View>
        </ScreenView>
    );
};