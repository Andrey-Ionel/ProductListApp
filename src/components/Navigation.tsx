import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListContainer from '../containers/ProductListContainer';
import PDPContainer from '../containers/PDPContainer';

import { styles } from './Header';

import colors from '../styles/colors';

export const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'ProductList'}>
        <Stack.Screen
          name="ProductList"
          component={ProductListContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PDP"
          component={PDPContainer as FC}
          options={{
            title: 'Product Detail',
            headerTitleStyle: styles.title,
            headerTintColor: colors.textPrimary,
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
