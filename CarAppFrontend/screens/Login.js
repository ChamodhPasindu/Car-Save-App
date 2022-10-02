import React from 'react';
import {View, KeyboardAvoidingView, Image} from 'react-native';
import {
  Text,
  Heading,
  Stack,
  NativeBaseProvider,
  Input,
  Button,
} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';

export default function Login() {
  const [show, setShow] = React.useState(false);

  return (
    <NativeBaseProvider
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
      }}>
      <View style={{ flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '35%'}}>
        <Image
          source={require('./images/login-car.png')}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: '55%',
        }}>
        <Heading size="3xl" style={{marginLeft: '10%'}}>
          Login
        </Heading>
        <Text fontSize="lg" style={{marginLeft: '10%'}}>
          Please login to continue
        </Text>
        <Stack space={4} w="80%" mx="auto" marginTop={10}>
          <Input variant="rounded" size="2xl" placeholder="User Name" />
          <Input
            variant="rounded"
            type="password"
            size="2xl"
            placeholder="Password"
          />
           <Button style={{borderRadius:100,marginTop:'10%',backgroundColor:'#005691'}} size='lg'>LOGIN</Button>
           <Text textAlign='center' style={{color:'gray'}}>OR</Text>
           <Button variant='solid' style={{borderRadius:100}} colorScheme='red' size='lg'>SIGNUP</Button>
        </Stack>
        <Text style={{textAlign: 'center',marginTop:40,color:'gray'}}>
        © 2021 Copyright Reserved
      </Text>
      </View>
    </NativeBaseProvider>
  );
}
