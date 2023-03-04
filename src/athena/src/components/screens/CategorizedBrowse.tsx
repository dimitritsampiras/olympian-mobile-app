import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';

import { useTrendingProgramsQuery, usePopularProgramsQuery } from '../../lib/graphql';

import { ScreenView } from '../containers/ScreenView';
import { Heading } from '../elements/typography/Heading';
import { UserContext } from '../providers';
import { FlatList, View } from 'react-native';
import { SubHeading } from '../elements/typography/SubHeading';
import { HorizontalCardScroller } from '../containers/HorizontalCardScroller';
import { Header } from '../containers/Header';
import { ProgramCard } from '../containers/ProgramCard';
import { ThemeColor } from '../../lib/types';
import theme from '../../theme';
import { Emoji } from '../elements/display/Emoji';
import { DiscoverParamList } from '../navigation/DiscoverNavigator';
import { categories, FITNESS_CATEGORIES } from './Browse';
import { TouchableOpacity } from 'react-native-ui-lib';
// import SearchBar from 'react-native-dynamic-search-bar';

interface DiscoverCatagoryProps extends NativeStackScreenProps<DiscoverParamList, 'Categorized'> {
  // catName: typeof FITNESS_CATEGORIES[number];
  // catColour: ThemeColor;
  // catEmojiHex: string;
}

export const CategorizedBrowse: React.FC<DiscoverCatagoryProps> = ({
  route,
  navigation,
  // catName = 'Yoga',
  // catColour = 'red',
  // catEmojiHex = '1F9D8',
}) => {
  const catName = 'Yoga';
  const catColour = 'red';
  const catEmojiHex = '1F9D8';

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
      <Header navigation={navigation}>
        <Heading style={{ width: 300 }}>
          {route.name} {catName} <Emoji unicode={catEmojiHex} style={{ fontSize: 30 }} />{' '}
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
        <SubHeading>Trending {catName} Programs</SubHeading>
        <HorizontalCardScroller>
          {trendingQuery.data?.trendingPrograms.map((program) => (
            <ProgramCard
              square
              program={program}
              key={program.name}
              style={{ backgroundColor: theme.colors[catColour][300], marginRight: 16 }}
            />
          ))}
        </HorizontalCardScroller>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading>Popular {catName} Programs</SubHeading>
        <HorizontalCardScroller>
          {popularQuery.data?.popularPrograms.map((program) => (
            <ProgramCard
              square
              program={program}
              key={program.name}
              style={{ backgroundColor: theme.colors[catColour][300], marginRight: 16 }}
            />
          ))}
        </HorizontalCardScroller>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading>Other Categories</SubHeading>
        <FlatList
          data={categories.filter((cat) => cat.name !== catName)}
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
