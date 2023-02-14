import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';

import { useTrendingProgramsQuery, usePopularProgramsQuery } from '../../lib/graphql';

import { RootParamList } from '../navigation/RootNavigator';
import { TabParamList } from '../navigation';
import { ScreenView } from '../containers/ScreenView';
import { Heading } from '../elements/typography/Heading';
import { UserContext } from '../providers';
import { View } from 'react-native';
import { SubHeading } from '../elements/typography/SubHeading';
import { HorizontalCardScroller } from '../containers/HorizontalCardScroller';
import { Card } from '../containers/Card';
import SearchBar from 'react-native-dynamic-search-bar';

interface BrowseProps extends NativeStackScreenProps<TabParamList & RootParamList, 'Browse'> {}

export const Browse: React.FC<BrowseProps> = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const trendingProgramsData = useTrendingProgramsQuery({
    variables: {
      skip: 0,
      take: 10,
    },
  });

  const popularProgramsData = usePopularProgramsQuery({
    variables: {
      skip: 0,
      take: 10,
    },
  });

  return (
    <ScreenView>
      {/* TOD0: turn this into a header component */}
      <View style={{ paddingTop: 25 }}>
        <Heading style={{ width: 300 }}>Discover</Heading>
      </View>
      <SearchBar
        // See docs: https://www.npmjs.com/package/react-native-dynamic-search-bar
        style={{ marginBottom: 25 }}
        placeholder="Search for a program..."
        onPress={() => alert('onPress')}
        onChangeText={(text) => console.log(text)}
      />
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading>Trending Programs</SubHeading>
        <HorizontalCardScroller>
          {trendingProgramsData.data?.trendingPrograms.map((program) => (
            <Card>{program.name}</Card>
          ))}
        </HorizontalCardScroller>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading>Popular</SubHeading>
        <HorizontalCardScroller>
          {popularProgramsData.data?.popularPrograms.map((program) => (
            <Card>{program.name}</Card>
          ))}
        </HorizontalCardScroller>
      </View>
    </ScreenView>
  );
};
