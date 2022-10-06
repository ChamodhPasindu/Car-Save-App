import React, {useEffect, useState} from 'react';
import {
  VStack,
  Stack,
  NativeBaseProvider,
  Input,
  Button,
  HStack,
  Center,
  Heading,
  Text,
  ScrollView,
} from 'native-base';

import {Image, Alert, LogBox} from 'react-native';

import {IconButton} from 'react-native-paper';

import {useIsFocused} from '@react-navigation/native';

import DatePicker from 'react-native-date-picker';

export default function Home({route, navigation}) {
  const isFocused = useIsFocused();
  const {user} = route.params;

  const [location, setLocation] = useState('');

  const [vehicles, setVehicle] = React.useState([]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const getDate = () => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Internal React error']);
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const loadData = () => {
    fetch('http://192.168.43.30:4000/vehicle/allVehicle/' + user)
      .then(response => response.json())
      .then(json => setVehicle(json.data));
  };

  const deleteRecord = id => {
    Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove vehicle record?',
      [
        {
          text: 'Yes',
          onPress: () => {
            fetch('http://192.168.43.30:4000/vehicle/' + id, {method: 'DELETE'})
              .then(response => response.json())
              .then(json => alert(json.message), loadData())
              .catch(json => alert(json.message));
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const searchVehicle = async () => {
    try {
      const response = await fetch(
        'http://192.168.43.30:4000/vehicle/?location=' +
          location +
          '&date=' +
          getDate(),
      );
      const json = await response.json();
      if (json.data.length === 0) {
        alert(`No vehicle save on ${getDate()} at ${location}`);
      } else {
        setVehicle(json.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <VStack space={4} alignItems="center">
          <Center mt={3} w="90%" h="10" rounded="md">
            <HStack w="100%" h="100%" space={2} justifyContent="center">
              <Button
                onPress={() => setOpen(true)}
                variant="outline"
                colorScheme={'gray'}
                rounded={20}
                h="100%"
                w="28%">
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                {getDate()}
              </Button>
              <Input
                onChangeText={e => {
                  setLocation(e);
                }}
                value={location}
                rounded={20}
                h="100%"
                w="35%"
                size="lg"
                placeholder="Locaion"
                colorScheme={'primary'}
              />
              <Button
                onPress={() => {
                  searchVehicle();
                }}
                rounded={20}
                h="100%"
                size={'sm'}
                variant="solid"
                colorScheme="gray">
                SEARCH
              </Button>
              <IconButton
                icon="reload"
                color="gray"
                size={20}
                onPress={() => {loadData()}}
              />
              
            </HStack>
          </Center>
          <Stack  w="90%" h="580" rounded="md">
            <ScrollView>
            {vehicles.map((item,index)=>(
               <HStack key={index}
               padding={3}
               mb={5}
               justifyContent="space-between"
               rounded="md"
               style={{borderWidth: 1, borderColor: '#595959'}}>
               <Center
                 height={'120'}
                 w="120"
                 style={{overflow: 'hidden', borderRadius: 5}}>
                 <Image
                   borderRadius={6}
                   source={{
                     uri:
                       'file:///data/user/0/com.carappfrontend/cache/' +
                       item.img_one,
                   }}
                   style={{width: '100%', height: '100%'}}
                 />
               </Center>
               <Stack justifyContent={'center'}>
                 <Heading size="md" style={{color: '#dddddd'}}>
                   {item.brand}
                   {' ' + item.model}
                 </Heading>
                 <Text fontSize="md" style={{color: '#dddddd'}}>
                   {item.location}
                 </Text>
                 <Text fontSize="md" style={{color: '#aaaaaa'}}>
                   {item.fuel_Type}
                   {' - ' + item.transmission}
                 </Text>
                 <Text fontSize="md" style={{color: '#aaaaaa'}}>
                   {item.mobile}
                 </Text>
               </Stack>
               <VStack
                 justifyContent={'center'}
                 space={2}
                 alignItems="center">
                 <Text fontSize="xs" style={{color: '#dddddd'}}>
                   {item.date}
                 </Text>
                 <Button
                   onPress={() => {
                     navigation.navigate('VehicleDetail', {vehicle: item});
                   }}
                   rounded={20}
                   size={'sm'}
                   variant="subtle"
                   colorScheme="green">
                   DETAILS
                 </Button>
                 <Button
                   onPress={() => {
                     deleteRecord(item.vehicle_no);
                   }}
                   size={'sm'}
                   rounded={20}
                   variant="subtle"
                   colorScheme="secondary">
                   DELETE
                 </Button>
               </VStack>
             </HStack>
            ))}
            </ScrollView>
          </Stack>
          <Center  w={'90%'} h={50} rounded="md">
            <Button
            w={'100%'}
              mb={3}
              onPress={() => {
                navigation.navigate('AddVehicle', {id: user});
              }}
              colorScheme="blue"
              variant={'subtle'}
              style={{
                height: '100%',
                borderRadius: 100,
                backgroundColor: '#044BA1',
              }}>
              + ADD NEW
            </Button>
          </Center>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}
