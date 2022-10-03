import React from 'react';
import {
  Text,
  Heading,
  Stack,
  NativeBaseProvider,
  Input,
  Button,
} from 'native-base';

import {View, KeyboardAvoidingView, Image} from 'react-native';

export default function Home({navigation}) {
  return (
    <NativeBaseProvider>
      <Stack
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: '88%',
            backgroundColor: 'skyblue',
          }}></View>
        <View
          style={{
            display: 'flex',
            width: '90%',
            height: '8%',
            alignItems: 'center',
            marginBottom:10
          }}>
          <Button
            onPress={() => {
              navigation.navigate('AddVehicle');
            }}
            colorScheme="blue"
            style={{height: '100%', borderRadius: 100}}>
            + ADD NEW
          </Button>
        </View>
      </Stack>
    </NativeBaseProvider>
  );
}

