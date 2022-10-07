import React from 'react';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import AddVehicle from './screens/AddVehicle';
import VehicleDetail from './screens/VehicleDetail';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={{flex: 1, backgroundColor: '#16213E'}}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {elevation: 0},
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
          }}
        />
        <Stack.Screen
          name="VehicleDetail"
          component={VehicleDetail}
          options={{
            title: 'Vehicle Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
