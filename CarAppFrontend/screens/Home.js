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
  FlatList,
} from 'native-base';

import {View, KeyboardAvoidingView, Image,Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import DatePicker from 'react-native-date-picker';

export default function Home({route, navigation}) {
  const {user} = route.params;

  const [vehicles, setVehicle] = React.useState([]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const getCurrentDate = () => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
  };

  useEffect(() => {
    loadData();
  });

  const loadData=()=>{
    fetch('http://192.168.43.30:4000/vehicle/allVehicle/' + user)
    .then(response => response.json())
    .then(json => setVehicle(json.data));
  }

  const deleteRecord=(id)=>{
    console.log(id)
    Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this beautiful box?",
      [
        {
          text: "Yes",
          onPress: () => {
            fetch('http://192.168.43.30:4000/vehicle/' + id,{method:'DELETE'})
            .then(response => response.json())
            .then(json =>alert(json.message),loadData())
            .catch(json=>alert(json.message));
          },
        },
        {
          text: "No",
        },
      ]
    );
  }

  return (
    <NativeBaseProvider>
      <ScrollView>
        <VStack space={4} alignItems="center">
          <Center mt={3} w="90%" h="10" rounded="md">
            <HStack w="100%" h="100%" space={3} justifyContent="center">
              <Button
                onPress={() => setOpen(true)}
                variant="outline"
                rounded={20}
                h="100%"
                w="36%">
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
                {getCurrentDate()}
              </Button>
              <Input
                rounded={20}
                h="100%"
                w="38%"
                size="lg"
                placeholder="Locaion"
                colorScheme={'primary'}
              />
              <Button
                rounded={20}
                h="100%"
                w="20%"
                variant="solid"
                style={{backgroundColor:"#595959"}}
                size="sm">
                SEARCH
              </Button>
            </HStack>
          </Center>
          <Stack w="90%" h="580" rounded="md">
            <ScrollView>
              <FlatList
                space={10}
                data={vehicles}
                renderItem={({item}) => (
                  <HStack
                    padding={6}
                    mb={5}
                    space={3}
                    justifyContent="space-between"
                    rounded="md"
                    style={{borderWidth: 0.4, borderColor: '#595959'}}>
                    <Stack>
                      <Heading size="lg" style={{color: '#dddddd'}}>
                        {item.brand}
                        {' ' + item.Model}
                      </Heading>
                      <Text fontSize="xl" style={{color: '#dddddd'}}>
                        {item.location}
                      </Text>
                      <Text fontSize="lg" style={{color: '#aaaaaa'}}>
                        {item.fuel_Type}
                        {' - ' + item.transmission}
                      </Text> 
                      <Text fontSize="md" style={{color: '#aaaaaa'}}>
                        {item.mobile}
                      </Text>
                    </Stack>
                    <VStack space={2} alignItems="center">
                      <Text fontSize="md" style={{color: '#dddddd'}}>
                        2020-06-08
                      </Text>
                      <Button rounded={20} size={'sm'}  variant="subtle"
                        colorScheme="green">
                        DETAILS
                      </Button>
                      <Button
                        onPress={()=>{
                            deleteRecord(item.vehicle_no)
                        }}
                        size={'sm'}
                        rounded={20}
                        variant="subtle"
                        colorScheme="secondary">
                        DELETE
                      </Button>
                    </VStack>
                  </HStack>
                )}
              />
            </ScrollView>
          </Stack>
          <Center w="90%" h="50" rounded="md">
            <Button
              mb={3}
              onPress={() => {
                navigation.navigate('AddVehicle', {id: user});
              }}
              colorScheme="blue"
              style={{height: '100%', borderRadius: 100}}>
              + ADD NEW
            </Button>
          </Center>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}
