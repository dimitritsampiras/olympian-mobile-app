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

interface BrowseProps extends NativeStackScreenProps<TabParamList & RootParamList, 'Browse'> {}

export const Browse: React.FC<BrowseProps> = ({ navigation }) => {
  const { user } = useContext(UserContext);

  return (
    <ScreenView>
      {/* TOD0: turn this into a header component */}
      <View style={{ paddingTop: 25, paddingBottom: 25 }}>
        <Heading style={{ width: 300 }}>Discover</Heading>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading>Trending Exercises</SubHeading>
        <HorizontalCardScroller>
          <Card>1</Card>
          <Card>2</Card>
          <Card>3</Card>
          <Card>4</Card>
          <Card>5</Card>
          <Card>6</Card>
          <Card>7</Card>
          <Card>8</Card>
          <Card>9</Card>
          <Card>10</Card>
        </HorizontalCardScroller>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <SubHeading>Popular</SubHeading>
        <HorizontalCardScroller>
          <Card>1</Card>
          <Card>2</Card>
          <Card>3</Card>
          <Card>4</Card>
          <Card>5</Card>
          <Card>6</Card>
          <Card>7</Card>
          <Card>8</Card>
          <Card>9</Card>
          <Card>10</Card>
        </HorizontalCardScroller>
      </View>
    </ScreenView>
  );
};
