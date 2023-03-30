import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CheckCircleIcon } from 'react-native-heroicons/solid';
import { MinusIcon, PlusIcon } from 'react-native-heroicons/mini';
import { CheckCircleIcon as CheckCircleIconOutline } from 'react-native-heroicons/outline';
import { ActiveWorkoutQuery } from '../../lib/graphql';
import theme from '../../theme';
import { Button } from '../elements';

interface PerformedSetProps {
  performedSet: NonNullable<
    ActiveWorkoutQuery['activeWorkout']
  >['performedExercises'][0]['performedSets'][0];
  expandedSetId: string | undefined;
  setExpandedSetId: React.Dispatch<React.SetStateAction<string | undefined>>;
  completeSet: () => Promise<void>;
}

export const PerformedSet: React.FC<PerformedSetProps> = ({
  performedSet,
  expandedSetId,
  setExpandedSetId,
  completeSet,
}) => {
  const { set, reps, weight, completed } = performedSet;

  const handleSetPress = () => {
    if (`${expandedSetId}` !== performedSet.id) setExpandedSetId(performedSet.id);
    else setExpandedSetId(undefined);
  };

  return (
    <>
      {`${expandedSetId}` !== performedSet.id ? (
        <Pressable
          key={set.id}
          style={[
            styles.set,
            { backgroundColor: performedSet.completed ? theme.colors.gray[50] : 'white' },
          ]}
          onPress={handleSetPress}>
          <Text>Set {set.number}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 120,
                marginRight: 35,
              }}>
              <View>
                <Text style={styles.setValue}>{reps}</Text>
                <Text style={styles.setLabel}>reps</Text>
              </View>
              <Text>*</Text>
              <View>
                <Text style={styles.setValue}>{weight}</Text>
                <Text style={styles.setLabel}>lbs</Text>
              </View>
            </View>
            <TouchableOpacity style={{ padding: 3 }} onPress={() => completeSet()}>
              {completed ? (
                <CheckCircleIcon color={theme.colors.emerald[400]} />
              ) : (
                <CheckCircleIconOutline color={theme.colors.gray[300]} />
              )}
            </TouchableOpacity>
          </View>
        </Pressable>
      ) : (
        <Pressable
          key={set.id}
          style={[
            styles.expandedSet,
            { backgroundColor: performedSet.completed ? theme.colors.gray[50] : 'white' },
          ]}
          onPress={handleSetPress}>
          <Text>Set {set.number}</Text>
          <View
            style={{
              alignItems: 'center',
              marginTop: 8,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                width: 200,
                marginBottom: 15,
              }}>
              <TouchableOpacity
                style={{ padding: 6, backgroundColor: theme.colors.gray[50], borderRadius: 99 }}>
                <MinusIcon color={theme.colors.gray[400]} size={20} />
              </TouchableOpacity>
              <View style={{ marginTop: 16, alignItems: 'center' }}>
                <TextInput style={styles.setValue}>{reps}</TextInput>
                <Text style={styles.setLabel}>reps</Text>
              </View>
              <TouchableOpacity
                style={{ padding: 6, backgroundColor: theme.colors.gray[50], borderRadius: 99 }}>
                <PlusIcon color={theme.colors.gray[400]} size={20} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.colors.gray[50],
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    marginRight: 14,
                  }}>
                  <Text>- {5}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.colors.gray[50],
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                  }}>
                  <Text>- {2.5}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 16, alignItems: 'center', paddingHorizontal: 25 }}>
                <TextInput style={styles.setValue}>{weight}</TextInput>
                <Text style={styles.setLabel}>lbs</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.colors.gray[50],
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    marginRight: 14,
                  }}>
                  <Text>+ {2.5}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.colors.gray[50],
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                  }}>
                  <Text>+ {5}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Button
            colorScheme="success"
            disabled={performedSet.completed}
            onPress={() => {}}
            style={{ alignSelf: 'stretch', marginTop: 12 }}>
            Mark as Complete
          </Button>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  set: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginVertical: 6,
    borderRadius: theme.radius.md,
  },
  expandedSet: {
    paddingVertical: 20,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  setValue: {
    fontSize: 25,
  },
  setLabel: {
    fontSize: 11,
    color: theme.colors.gray[500],
  },
});
