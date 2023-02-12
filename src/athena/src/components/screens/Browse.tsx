import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';

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

  const fetchDiscoveryPrograms = () => {
    // TODO: Replace this with a query to the database
    return {
      trending: (
        <HorizontalCardScroller styles={{ paddingVertical: 10 }}>
          <Card>T1</Card>
          <Card>T2</Card>
          <Card>T3</Card>
          <Card>T4</Card>
          <Card>T5</Card>
          <Card>T6</Card>
          <Card>T7</Card>
          <Card>T8</Card>
          <Card>T9</Card>
          <Card>T10</Card>
        </HorizontalCardScroller>
      ),
      popular: (
        <HorizontalCardScroller styles={{ paddingVertical: 10 }}>
          <Card>P1</Card>
          <Card>P2</Card>
          <Card>P3</Card>
          <Card>P4</Card>
          <Card>P5</Card>
          <Card>P6</Card>
          <Card>P7</Card>
          <Card>P8</Card>
          <Card>P9</Card>
          <Card>P10</Card>
        </HorizontalCardScroller>
      ),
    };
  };

  const discoveryPrograms = fetchDiscoveryPrograms();

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
        <SubHeading>Trending Exercises</SubHeading>
        {discoveryPrograms.trending}
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading>Popular</SubHeading>
        {discoveryPrograms.popular}
      </View>
    </ScreenView>
  );
};
