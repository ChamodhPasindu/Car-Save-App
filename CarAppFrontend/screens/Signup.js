import {
  Button,
  NativeBaseProvider,
  Heading,
  Text,
  Stack,
  Input,
} from 'native-base';
import React from 'react';
import {View, Image} from 'react-native';

export default function Signup({navigation}) {
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const registerUser = async () => {

    try {
      const response = await fetch('http://192.168.43.30:4000/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      alert(json.message)
      navigation.navigate("Login")
    } catch (error) {
      console.error(error);
      alert("Try Again Latter")

    }
  };

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
            variant="rounded"
            size="2xl"
            placeholder="Email"
            onChangeText={e => {
              setEmail(e);
            }}
            value={email}
          />
          <Input
            variant="rounded"
            type="password"
            size="2xl"
            placeholder="Password"
            onChangeText={e => {
              setPassword(e);
            }}
            value={password}
          />
          <Button
            onPress={registerUser}
            style={{borderRadius: 100, marginTop: '10%',backgroundColor:'#B33030'}}
            size="lg">
            SIGN UP
          </Button>
        </Stack>
      </View>
    </NativeBaseProvider>
  );
}
