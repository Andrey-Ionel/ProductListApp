import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeContainer from '../containers/HomeContainer';
import PDPContainer from '../containers/PDPContainer';

import { styles } from './Header';

import colors from '../styles/colors';

export const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={HomeContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PDP"
          component={PDPContainer}
          options={{
            title: 'Опис товару',
            headerTitleStyle: styles.title,
            headerTintColor: colors.textPrimary,
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
