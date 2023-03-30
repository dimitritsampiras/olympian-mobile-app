import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Header } from '../../containers/Header';
import { ScreenView } from '../../containers/ScreenView';
import { Heading, SubHeading } from '../../elements';
import { ProfileParamList } from '../../navigation/ProfileNavigator';
import { View, Text } from 'react-native';
import { GoalCard, GoalCardProps } from '../../containers/GoalCard';
import { Button } from '../../elements';

interface GoalsProps extends NativeStackScreenProps<ProfileParamList, 'Goals'> { }

const dummy_data: Array<GoalCardProps> = [
    {
        exercise: 'Barbell Bench',
        target: 250,
        unit: 'kg',
    },
    {
        exercise: 'Deadlift',
        target: 405,
        unit: 'kg',
    },
];
export const Goals: React.FC<GoalsProps> = ({ navigation }) => {
    return (
        <ScreenView>
            <Header navigation={navigation}>
                <Heading>Goals</Heading>
            </Header>
            <View>
                {dummy_data.map(({ exercise, target, unit }) => {
                    return (
                        <>
                            <GoalCard exercise={exercise} target={target} unit={unit}></GoalCard>
                        </>
                    );
                })}
                <Button
                    style={{ paddingBottom: 20 }}
                    colorScheme="primary"
                    variant="flat"
                    onPress={() => {navigation.navigate('NewGoal')}}>
                    Set Goal
                </Button>
                {/* <Card
          onPress={() => {}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            height: 80,
            backgroundColor: theme.colors.gray[100],
          }}>
          <TrophyIcon size={30} color={'grey'} style={{ marginRight: 60 }} />
          <View>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>Set New Goal</Text>
          </View>
        </Card> */}
            </View>
        </ScreenView>
    );
};
