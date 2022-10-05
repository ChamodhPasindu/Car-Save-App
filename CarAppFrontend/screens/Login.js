import React from 'react';
import {View, KeyboardAvoidingView, Image} from 'react-native';
import {
  Text,
  Heading,
  Stack,
  NativeBaseProvider,
  Input,
  Button,
  ScrollView,
  Center,
  VStack,
} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {background} from 'native-base/lib/typescript/theme/styled-system';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Login({navigation}) {
  const [show, setShow] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const verifyLogin = async () => {
    try {
      const response = await fetch('http://192.168.43.30:4000/user/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          password: password,
        }),
      });
      const json = await response.json();
      navigation.navigate('Home', {user: json.user.user_id});
      alert(json.message);
    } catch (error) {
      console.error(error);
      alert('Incorrect Username or Password');
    }
  };

  return (
    <NativeBaseProvider>
        <Stack
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '35%',
          }}>
          <Image
          resizeMode='contain'
            source={require('./images/audi.png')}
            style={{width: '100%', height: '90%'}}
          />
        </Stack>
        <Stack
          style={{
            width: '100%',
            height: '65%',
          }}>
          <Heading size="3xl" style={{marginLeft: '10%'}}>
            Login
          </Heading>
          <Text fontSize="lg" style={{marginLeft: '10%'}}>
            Please login to continue
          </Text>
          <Stack space={4} w="80%" mx="auto" marginTop={10}>
            <Input
              variant="rounded"
              size="2xl"
              placeholder="User Name"
              onChangeText={e => {
                setUserName(e);
              }}
              value={userName}
            />
            <Input
              onChangeText={e => {
                setPassword(e);
              }}
              value={password}
              variant="rounded"
              type="password"
              size="2xl"
              placeholder="Password"
            />
            <Button
              onPress={() => {
                verifyLogin();
              }}
              variant="solid"
              style={{borderRadius: 100, marginTop: '10%',backgroundColor:'#044BA1'}}
              
              size="lg">
              LOGIN
            </Button>
            <Text textAlign="center" style={{color: 'gray'}}>
              OR
            </Text>
            <Button
              onPress={() => {
                navigation.navigate('Signup');
              }}
              variant="outline"
              style={{borderRadius: 100}}
              colorScheme="red"
              size="lg">
              SIGNUP
            </Button>
          </Stack>
          <Text style={{textAlign: 'center', marginTop: 40, color: 'gray'}}>
            © 2021 Copyright Reserved
          </Text>
        </Stack>
    </NativeBaseProvider>
  );
}
