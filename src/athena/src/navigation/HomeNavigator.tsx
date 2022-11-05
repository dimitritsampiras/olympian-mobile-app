import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';

const HomeStack = createNativeStackNavigator();

interface HomeNavigatorProps {}

export const HomeStackNavigator: React.FC<HomeNavigatorProps> = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="BottomTabs">
        {({ navigation }) => <TabNavigator />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
};
