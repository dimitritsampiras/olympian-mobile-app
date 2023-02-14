import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { useStaticExercisesQuery } from '../../../lib/graphql';
import { RootParamList } from '../../navigation/RootNavigator';
import { TabParamList } from '../../navigation';
import { ScreenView } from '../../containers/ScreenView';
import { Heading } from '../../elements/typography/Heading';
import { View } from 'react-native';
import { Exercise } from '../../containers/Exercise';
import { ScrollView } from 'react-native-gesture-handler';
import SearchBar from 'react-native-dynamic-search-bar';

interface FindExericseProps extends NativeStackScreenProps<TabParamList & RootParamList, 'Home'> {}

// const staticExerciseData = useStaticExercisesQuery({
//     variables: {
//       skip: 0,
//       take: 10,
//     },
//   });

export const FindExericse: React.FC<FindExericseProps> = () => (
  <ScreenView scrollable={false}>
    {/* Header */}
    <View style={{ paddingTop: 25, paddingBottom: 25 }}>
      <Heading style={{ width: 300 }}>Add Exercise</Heading>
    </View>
    {/* Tags + Search button */}
    <View
      style={{
        flex: 1,
        paddingBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <SearchBar
        style={{ marginBottom: 25 }}
        placeholder="Search for an Exercise..."
        onSubmitEditing={() => alert('submitted')}
        onChangeText={(text) => console.log(text)}
      />
    </View>

    {/* Scrollable Stack Exercise */}
    <ScrollView showsVerticalScrollIndicator={false} style={{}}>
      {/* {staticExerciseData.data?.staticExercises.map((e: { description: string; })=>(
                <Exercise exerciseName={e.description} muscles={[]} add={true}></Exercise>
            ))} */}
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
      <Exercise exerciseName={''} muscles={[]} add={true}></Exercise>
    </ScrollView>
  </ScreenView>
);
