import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/solid';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrowseSearchQuery, useBrowseSearchLazyQuery } from '../../../lib/graphql';
import theme from '../../../theme';
import { DiscoverParamList } from '../../navigation';
import { HorizontalCardScroller } from '../HorizontalCardScroller';
import { ProfileFollowCard } from '../ProfileFollowCard';

const searchParams = ['top', 'programs', 'profiles', 'workouts', 'exercises'] as const;

interface BrowseModalProps {
  close: () => void;
  isOpen: boolean;
  navigation: NativeStackNavigationProp<DiscoverParamList, 'Discover', undefined>;
}

export const BrowseModal: React.FC<BrowseModalProps> = ({ isOpen, close, navigation }) => {
  const insets = useSafeAreaInsets();

  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedParam, setSelectedParam] = useState<typeof searchParams[number]>('top');

  const [browse, { data }] = useBrowseSearchLazyQuery();

  const handleSearch = async () => {
    if (!searchText) return;
    await browse({ variables: { keyword: searchText } });
  };

  const handleTextInputChange = (text: string) => {
    setSearchText(text);
  };

  const handleTextInputSubmit = async () => {
    await handleSearch();
  };

  const filterResults = (results: BrowseSearchQuery['browseSearch']) => {
    return results.filter(
      (result) =>
        (selectedParam === 'programs' && result.__typename === 'Program') ||
        (selectedParam === 'exercises' && result.__typename === 'Exercise') ||
        (selectedParam === 'profiles' && result.__typename === 'Profile') ||
        (selectedParam === 'workouts' && result.__typename === 'Workout') ||
        selectedParam === 'top'
    );
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Modal animationType="fade" transparent={true} visible={isOpen} onRequestClose={close}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.overlay, { paddingTop: insets.top + 10 }]}>
          <View>
            <TouchableOpacity onPress={close} style={{ marginBottom: 20 }}>
              <XMarkIcon color="black" />
            </TouchableOpacity>
            <View style={styles.searchBar}>
              <MagnifyingGlassIcon size={18} color={theme.colors.gray[500]} />
              <TextInput
                ref={inputRef}
                style={{ marginLeft: 10, color: theme.colors.gray[800], width: '100%' }}
                placeholder="search"
                placeholderTextColor={theme.colors.gray[700]}
                value={searchText}
                onChangeText={handleTextInputChange}
                onSubmitEditing={handleTextInputSubmit}
              />
            </View>

            {searchText && (
              <HorizontalCardScroller>
                <View style={{ flexDirection: 'row' }}>
                  {searchParams.map((param) => (
                    <TouchableOpacity
                      key={param}
                      onPress={() => setSelectedParam(param)}
                      style={[
                        styles.paramChip,
                        {
                          backgroundColor:
                            selectedParam === param
                              ? theme.colors.blue[100]
                              : theme.colors.gray[100],
                        },
                      ]}>
                      <Text
                        style={[
                          styles.paramChipText,
                          {
                            color:
                              selectedParam === param
                                ? theme.colors.blue[700]
                                : theme.colors.gray[500],
                          },
                        ]}>
                        {param}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </HorizontalCardScroller>
            )}

            <View style={{ marginTop: 12 }}>
              {searchText !== '' &&
                data?.browseSearch &&
                filterResults(data?.browseSearch).length > 0 &&
                filterResults(data?.browseSearch).map((searchResult, i) => {
                  if (searchResult.__typename === 'Profile')
                    return (
                      <ProfileFollowCard
                        key={i}
                        profile={searchResult}
                        onPress={() => {
                          navigation.navigate('Profile', { profileId: searchResult.id });
                          close();
                        }}
                      />
                    );

                  if (searchResult.__typename === 'Program') {
                    return (
                      <View key={i}>
                        <Text>{searchResult.name}</Text>
                      </View>
                    );
                  }
                  if (searchResult.__typename === 'Workout') {
                    return (
                      <View key={i}>
                        <Text>{searchResult.name}</Text>
                      </View>
                    );
                  }
                  if (searchResult.__typename === 'Exercise') {
                    return (
                      <View key={i}>
                        <Text>{searchResult.staticExercise.name}</Text>
                      </View>
                    );
                  }
                  return (
                    <View key={i}>
                      <Text>error</Text>
                    </View>
                  );
                })}
              {searchText !== '' &&
                data?.browseSearch &&
                filterResults(data?.browseSearch).length === 0 && (
                  <View style={styles.noResults}>
                    <Text style={{ color: theme.colors.gray[600] }}>
                      no results for {`"${searchText}"`}
                    </Text>
                  </View>
                )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 22,
  },
  searchBar: {
    backgroundColor: theme.colors.gray[100],
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
  },
  paramChip: {
    backgroundColor: theme.colors.gray[100],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    marginRight: 5,
  },
  paramChipText: {
    fontSize: 11,
  },
  noResults: {
    backgroundColor: theme.colors.gray[50],
    marginTop: 20,
    paddingVertical: 22,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderRadius: 14,
  },
});
