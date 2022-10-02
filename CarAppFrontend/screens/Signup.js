import {
  Button,
  Box,
  NativeBaseProvider,
  Switch,
  TextArea,
  VStack,
  Heading,
  Text,
  Stack,
  Input,
} from 'native-base';
import React from 'react';
import {View, Image} from 'react-native';

export default function Signup({navigation}) {
  return (
    <NativeBaseProvider
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
      }}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '35%',
        }}>
        <Image
          source={require('./images/bmw.png')}
          style={{width: '90%', height: '80%'}}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: '55%',
        }}>
        <Heading size="2xl" style={{marginLeft: '10%'}}>
          Create Account
        </Heading>
        <Text fontSize="lg" style={{marginLeft: '10%'}}>
          Please fill the input below here
        </Text>
        <Stack space={4} w="80%" mx="auto" marginTop={10}>
          <Input variant="rounded" size="2xl" placeholder="User Name" />
          <Input variant="rounded" size="2xl" placeholder="Email" />
          <Input
            variant="rounded"
            type="password"
            size="2xl"
            placeholder="Password"
          />
          <Button
            style={{borderRadius: 100, marginTop: '10%'}}
            colorScheme="red"
            size="lg">
            SIGN UP
          </Button>
        </Stack>
        <Text style={{textAlign: 'center', marginTop: 40, color: 'gray'}}>
          © 2021 Copyright Reserved
        </Text>
      </View>
    </NativeBaseProvider>
  );
}
