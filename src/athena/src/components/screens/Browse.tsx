import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';

import { useTrendingProgramsQuery, usePopularProgramsQuery } from '../../lib/graphql';

import { ScreenView } from '../containers/ScreenView';
import { Heading } from '../elements/typography/Heading';
import { UserContext } from '../providers';
import { FlatList, Text, View } from 'react-native';
import { SubHeading } from '../elements/typography/SubHeading';
import { HorizontalCardScroller } from '../containers/HorizontalCardScroller';
import { Header } from '../containers/Header';
import { ProgramCard } from '../containers/ProgramCard';
import { ThemeColor } from '../../lib/types';
import theme from '../../theme';
import { TouchableOpacity } from 'react-native-ui-lib';
import { Emoji } from '../elements/display/Emoji';
import { DiscoverParamList } from '../navigation/DiscoverNavigator';
// import SearchBar from 'react-native-dynamic-search-bar';

interface DiscoverProps extends NativeStackScreenProps<DiscoverParamList, 'Discover'> {}

export const Discover: React.FC<DiscoverProps> = ({ navigation, route }) => {
  const { user } = useContext(UserContext);

  const trendingQuery = useTrendingProgramsQuery({
    variables: {
      skip: 0,
      take: 10,
    },
  });

  const popularQuery = usePopularProgramsQuery({
    variables: {
      skip: 0,
      take: 10,
    },
  });

  return (
    <ScreenView>
      {/* TOD0: turn this into a header component */}
      <Header>
        <Heading style={{ width: 300 }}>{route.name}</Heading>
      </Header>
      {/* <SearchBar
        // See docs: https://www.npmjs.com/package/react-native-dynamic-search-bar
        style={{ marginBottom: 25 }}
        placeholder="Search for a program..."
        onPress={() => alert('onPress')}
        onChangeText={(text) => console.log(text)}
      /> */}
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading>Trending Programs</SubHeading>
        <HorizontalCardScroller>
          {trendingQuery.data?.trendingPrograms.map((program) => (
            <ProgramCard square program={program} key={program.name} />
          ))}
        </HorizontalCardScroller>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading>Popular</SubHeading>
        <HorizontalCardScroller>
          {popularQuery.data?.popularPrograms.map((program) => (
            <ProgramCard square program={program} key={program.name} />
          ))}
        </HorizontalCardScroller>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading>Categories</SubHeading>
        <FlatList
          data={categories}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            // <FitnessCategory category={item.name} color={item.color} emojiHex={item.emojiHex} />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme.colors[item.color][500],
                padding: 14,
                borderRadius: 12,
                width: '48%',
              }}>
              <Heading as="h4" noMargin style={{ color: 'white', width: 60 }}>
                {item.name.replaceAll(' ', '\n')}
              </Heading>
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: theme.radius.md,
                }}>
                <Emoji unicode={item.emojiHex} style={{ fontSize: 30 }} />
              </View>
            </TouchableOpacity>
          )}
        />
        {/* <View style={{ backgroundColor: 'red', height: 10, width: '100%' }}></View> */}
      </View>
    </ScreenView>
  );
};

export const categories: {
  name: typeof FITNESS_CATEGORIES[number];
  color: ThemeColor;
  emojiHex: string;
}[] = [
  {
    name: 'Cardio',
    color: 'blue',
    emojiHex: '1F3C3',
  },
  {
    name: 'Yoga',
    color: 'red',
    emojiHex: '1F9D8',
  },
  {
    name: 'Olympic Weightlifting',
    color: 'amber',
    emojiHex: '1F3CB',
  },
  {
    name: 'Sports Performance',
    color: 'emerald',
    emojiHex: '26F9',
  },
  {
    name: 'Calisthenics',
    color: 'cyan',
    emojiHex: '26F9',
  },
  {
    name: 'CrossFit',
    color: 'brown',
    emojiHex: '26F9',
  },
];

export const FITNESS_CATEGORIES = [
  'Cardio',
  'Strength Training',
  'Yoga',
  'Pilates',
  'HIIT',
  'CrossFit',
  'Boxing',
  'Dance',
  'Swimming',
  'Cycling',
  'Running',
  'Martial Arts',
  'Rowing',
  'Gymnastics',
  'Calisthenics',
  'Aerobics',
  'Zumba',
  'Barre',
  'Functional Training',
  'Sports Performance',
  'Olympic Weightlifting',
  'Stretching',
  'Recovery',
] as const;
