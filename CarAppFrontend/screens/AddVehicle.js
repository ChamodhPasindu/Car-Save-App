import React from 'react';
import {
  NativeBaseProvider,
  Stack,
  Input,
  TextArea,
  Box,
  Select,
  CheckIcon,
  Button,
  VStack,
  Center,
  HStack,
  ScrollView,
} from 'native-base';
import {View, Image} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function AddVehicle({route, navigation}) {
  const {id} = route.params;

  const [fuel, setFule] = React.useState('');
  const [transmission, setTransmission] = React.useState('');

  const [imageOne, setImageOne] = React.useState(
    require('./images/thumb.jpeg'),
  );
  const [imageTwo, setImageTwo] = React.useState(
    require('./images/thumb.jpeg'),
  );
  const [imageThree, setImageThree] = React.useState(
    require('./images/thumb.jpeg'),
  );
  const [imageFour, setImageFour] = React.useState(
    require('./images/thumb.jpeg'),
  );

  const [fileOne, setFileOne] = React.useState('');
  const [fileTwo, setFileTwo] = React.useState('');
  const [fileThree, setFileThree] = React.useState('');
  const [fileFour, setFileFour] = React.useState('');

  const [vehicleNo, setVehicleNo] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [mileage, setMileage] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [description, setDescription] = React.useState('');

  const openCamera = (setImage, setFile) => {
    const options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('user cancle');
      } else if (response.error) {
        console.log(response.error);
      } else if (response.customButton) {
        console.log(response.customButton);
      } else {
        const source = {
          uri: 'data:image/jpej;base64,' + response.assets[0].base64,
        };
        setImage(source);
        setFile({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
      }
    });
  };

  const openGallery = (setImage, setFile) => {
    const options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('user cancle');
      } else if (response.error) {
        console.log(response.error);
      } else if (response.customButton) {
        console.log(response.customButton);
      } else {
        const source = {
          uri: response.assets[0].uri,
        };
        setImage(source);
        setFile({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
      }
    });
  };

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return year + '-' + month + '-' + date;
  };

  const saveDetails = async () => {
    let data = new FormData();

    data.append('file', fileOne);
    data.append('file', fileTwo);
    data.append('file', fileThree);
    data.append('file', fileFour);

    let car = {
      registration_no: vehicleNo,
      user_id: id,
      brand: brand,
      model: model,
      fuel_type: fuel,
      transmission: transmission,
      mileage: mileage,
      description: description,
      location: location,
      mobile: mobile,
      date: getCurrentDate(),
    };

    data.append('car', {string: JSON.stringify(car), type: 'application/json'});

    try {
      const response = await fetch('http://192.168.43.30:4000/vehicle/save', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const json = await response.json();
      alert(json.message);
      navigation.navigate('Home', {user: id});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Stack
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '90%',
              height: '95%',
            }}>
            <VStack alignItems={'center'} space={4} w="100%" mx="auto">
              <HStack mt={4} space={4} justifyContent="center">
                <Center h="40" w="48%">
                  <Center
                    w="100%"
                    h="70%"
                    style={{overflow: 'hidden', borderRadius: 5}}>
                    <Image
                      borderRadius={6}
                      source={imageOne}
                      style={{width: '100%', height: '100%'}}
                    />
                  </Center>
                  <HStack
                    w="100%"
                    h="30%"
                    justifyContent="space-evenly"
                    alignItems="center">
                    <Button
                      onPress={() => {
                        openGallery(setImageOne, setFileOne);
                      }}
                      variant="subtle"
                      colorScheme="red"
                      size="sm">
                      Gallery
                    </Button>
                    <Button
                      onPress={() => {
                        openCamera(setImageOne, setFileOne);
                      }}
                      variant="subtle"
                      colorScheme="green"
                      size="sm">
                      Camera
                    </Button>
                  </HStack>
                </Center>
                <Center h="40" w="48%">
                  <Center
                    w="100%"
                    h="70%"
                    style={{overflow: 'hidden', borderRadius: 5}}>
                    <Image
                      borderRadius={6}
                      source={imageTwo}
                      style={{width: '100%', height: '100%'}}
                    />
                  </Center>
                  <HStack
                    w="100%"
                    h="30%"
                    justifyContent="space-evenly"
                    alignItems="center">
                    <Button
                      onPress={() => {
                        openGallery(setImageTwo, setFileTwo);
                      }}
                      variant="subtle"
                      colorScheme="red"
                      size="sm">
                      Gallery
                    </Button>
                    <Button
                      onPress={() => {
                        openCamera(setImageTwo, setFileTwo);
                      }}
                      variant="subtle"
                      colorScheme="green"
                      size="sm">
                      Camera
                    </Button>
                  </HStack>
                </Center>
              </HStack>
              <HStack space={4} justifyContent="center">
                <Center h="40" w="48%">
                  <Center
                    w="100%"
                    h="70%"
                    style={{overflow: 'hidden', borderRadius: 5}}>
                    <Image
                      borderRadius={6}
                      source={imageThree}
                      style={{width: '100%', height: '100%'}}
                    />
                  </Center>
                  <HStack
                    w="100%"
                    h="30%"
                    justifyContent="space-evenly"
                    alignItems="center">
                    <Button
                      onPress={() => {
                        openGallery(setImageThree, setFileThree);
                      }}
                      variant="subtle"
                      colorScheme="red"
                      size="sm">
                      Gallery
                    </Button>
                    <Button
                      onPress={() => {
                        openCamera(setImageThree, setFileThree);
                      }}
                      variant="subtle"
                      colorScheme="green"
                      size="sm">
                      Camera
                    </Button>
                  </HStack>
                </Center>
                <Center h="40" w="48%">
                  <Center
                    w="100%"
                    h="70%"
                    style={{overflow: 'hidden', borderRadius: 5}}>
                    <Image
                      borderRadius={6}
                      source={imageFour}
                      style={{width: '100%', height: '100%'}}
                    />
                  </Center>
                  <HStack
                    w="100%"
                    h="30%"
                    justifyContent="space-evenly"
                    alignItems="center">
                    <Button
                      onPress={() => {
                        openGallery(setImageFour, setFileFour);
                      }}
                      variant="subtle"
                      colorScheme="red"
                      size="sm">
                      Gallery
                    </Button>
                    <Button
                      onPress={() => {
                        openCamera(setImageFour, setFileFour);
                      }}
                      variant="subtle"
                      colorScheme="green"
                      size="sm">
                      Camera
                    </Button>
                  </HStack>
                </Center>
              </HStack>
              <Input
                size="xl"
                placeholder="Vehicle Number"
                onChangeText={e => {
                  setVehicleNo(e);
                }}
                value={vehicleNo}
              />
              <HStack space={3} justifyContent="center">
                <VStack space={4} w="48%" rounded="md">
                  <Input
                    size="xl"
                    placeholder="Brand"
                    onChangeText={e => {
                      setBrand(e);
                    }}
                    value={brand}
                  />
                  <Input
                    size="xl"
                    placeholder="Model"
                    onChangeText={e => {
                      setModel(e);
                    }}
                    value={model}
                  />
                  <Input
                    keyboardType="numeric"
                    size="xl"
                    placeholder="Mileage"
                    onChangeText={e => {
                      setMileage(e);
                    }}
                  />
                </VStack>
                <VStack space={4} w="48%" rounded="md">
                  <Input
                    size="xl"
                    placeholder="Mobile"
                    onChangeText={e => {
                      setMobile(e);
                    }}
                    value={mobile}
                  />
                  <Box w="100%">
                    <Select
                      fontSize="lg"
                      selectedValue={fuel}
                      placeholder="Fuel Type"
                      _selectedItem={{
                        bg: 'red.900',
                        endIcon: <CheckIcon size="5" />,
                      }}
                      onValueChange={itemValue => setFule(itemValue)}>
                      <Select.Item label="Petrol" value="Petrol" />
                      <Select.Item label="Diesel" value="Diesel" />
                    </Select>
                  </Box>
                  <Box w="100%">
                    <Select
                      fontSize="lg"
                      selectedValue={transmission}
                      placeholder="Transmission"
                      _selectedItem={{
                        bg: 'red.900',
                        endIcon: <CheckIcon size="5" />,
                      }}
                      onValueChange={itemValue => setTransmission(itemValue)}>
                      <Select.Item label="Auto" value="Auto" />
                      <Select.Item label="Manual" value="Manual" />
                    </Select>
                  </Box>
                </VStack>
              </HStack>

              <Input
                size="xl"
                placeholder="Location"
                onChangeText={e => {
                  setLocation(e);
                }}
                value={location}
              />

              <Box mb={4} alignItems="center" w="100%">
                <TextArea
                  fontSize="lg"
                  placeholder="Description"
                  w="100%"
                  onChangeText={e => {
                    setDescription(e);
                  }}
                  value={description}
                />
              </Box>
                <Button
                  onPress={saveDetails}
                  mb={4}
                  w="40%"
                  style={{borderRadius: 100,backgroundColor:'#B33030'}}
                  size="md">
                  SAVE
                </Button>
            </VStack>
          </View>
        </Stack>
      </ScrollView>
    </NativeBaseProvider>
  );
}
