import React from 'react';
import Login from './screens/Login';
import {View} from 'react-native';
import Signup from './screens/Signup';
import Home from './screens/Home';
import AddVehicle from './screens/AddVehicle';
import VehicleDetail from './screens/VehicleDetail';
import {TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={{flex: 1, backgroundColor: '#16213E'}}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {elevation: 0},
          cardStyle: {backgroundColor: '#192138'},
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#192138',
            },
            gestureEnabled: false,
            headerShown: true,
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen
          name="AddVehicle"
          component={AddVehicle}
          options={{
            title: 'Add New Vehicle',
            headerStyle: {
              backgroundColor: '#192138',
            },
          }}
        />
        <Stack.Screen
          name="VehicleDetail"
          component={VehicleDetail}
          options={{
            title: 'Vehicle Details',
            headerStyle: {
              backgroundColor: '#192138',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
