import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { useTrendingProgramsQuery, usePopularProgramsQuery } from '../../../lib/graphql';

import { ScreenView } from '../../containers/ScreenView';
import { Heading } from '../../elements/typography/Heading';
import { View } from 'react-native';
import { SubHeading } from '../../elements/typography/SubHeading';
import { HorizontalCardScroller } from '../../containers/HorizontalCardScroller';
import { Header } from '../../containers/Header';
import { ProgramCard } from '../../containers/ProgramCard';
import { Emoji } from '../../elements/display/Emoji';
import { DiscoverParamList } from '../../navigation/DiscoverNavigator';
import { BROWSE_CATGEORIES } from '../../../lib/data';
// import SearchBar from 'react-native-dynamic-search-bar';

interface TrainingTypeDiscoverProps
  extends NativeStackScreenProps<DiscoverParamList, 'TrainingTypeDiscover'> {}

export const TrainingTypeDiscover: React.FC<TrainingTypeDiscoverProps> = ({
  route,
  navigation,
}) => {
  const { trainingType } = route.params;

  const trendingQuery = useTrendingProgramsQuery({
    variables: {
      skip: 0,
      take: 10,
      trainingType: [trainingType],
    },
  });

  const popularQuery = usePopularProgramsQuery({
    variables: {
      skip: 0,
      take: 10,
      trainingType: [trainingType],
    },
  });

  return (
    <ScreenView>
      {/* TOD0: turn this into a header component */}
      <Header navigation={navigation}>
        <Emoji
          unicode={BROWSE_CATGEORIES[trainingType][1]}
          style={{ fontSize: 30, marginTop: 14 }}
        />
        <Heading style={{ width: 300, textTransform: 'capitalize' }}>
          {trainingType.replaceAll('_', ' ')}
        </Heading>
      </Header>
      {/* <SearchBar
        // See docs: https://www.npmjs.com/package/react-native-dynamic-search-bar
        style={{ marginBottom: 25 }}
        placeholder="Search for a program..."
        onPress={() => alert('onPress')}
        onChangeText={(text) => console.log(text)}
      /> */}
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading style={{ textTransform: 'capitalize' }}>Trending Programs</SubHeading>
        <HorizontalCardScroller>
          {trendingQuery.data?.trendingPrograms.map((program) => (
            <ProgramCard square program={program} key={program.name} style={{ marginRight: 16 }} />
          ))}
        </HorizontalCardScroller>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading style={{ textTransform: 'capitalize' }}>Popular Programs</SubHeading>
        <HorizontalCardScroller>
          {popularQuery.data?.popularPrograms.map((program) => (
            <ProgramCard square program={program} key={program.name} style={{ marginRight: 16 }} />
          ))}
        </HorizontalCardScroller>
      </View>
    </ScreenView>
  );
};
