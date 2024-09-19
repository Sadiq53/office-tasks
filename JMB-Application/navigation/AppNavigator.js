import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import IndexScreen from '../screens/IndexScreen';
import LogoutScreen from '../screens/LogoutScreen';

const AppNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'LogOut') {
            iconName = 'log-out-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={IndexScreen} />
      {/* Uncomment the following lines if you add more screens */}
      <Tab.Screen name="Search" component={IndexScreen} />
      <Tab.Screen name="LogOut" component={LogoutScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
