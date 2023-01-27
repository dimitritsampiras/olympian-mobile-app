// import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
// import React from 'react';
// import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import * as Haptics from 'expo-haptics';
// import { Cog6ToothIcon, HomeIcon } from 'react-native-heroicons/solid';
// import theme from '../../theme';

// interface TabBarProps extends BottomTabBarProps {}

// export const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
//   return (
//     <View style={styles.tabContainer}>
//       {/* for each route on tab navigator */}
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label = getLabel(options, route.name);
//         const isFocused = state.index === index;

//         const onPress = () => {
//           Haptics.selectionAsync();
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate({ name: route.name, merge: true, params: undefined });
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <Pressable
//             key={label.toString()}
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ backgroundColor: 'white', padding: 8 }}>
//             {getIcon(label.toString(), isFocused)}
//           </Pressable>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     height: 115,
//     paddingBottom: 40,
//   },
// });

// const getLabel = (options: BottomTabNavigationOptions, routeName: string) => {
//   return options.tabBarLabel !== undefined
//     ? options.tabBarLabel
//     : options.title !== undefined
//     ? options.title
//     : routeName;
// };

// const getIcon = (label: string, isFocused: boolean) => {
//   if (label === 'Home') return <HomeIcon fill={isFocused ? theme.blue[600] : theme.gray[200]} />;
//   if (label === 'Settings')
//     return <Cog6ToothIcon fill={isFocused ? theme.blue[600] : theme.gray[200]} />;
// };
