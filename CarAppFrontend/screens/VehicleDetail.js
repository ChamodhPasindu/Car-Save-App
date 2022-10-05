import React, {useEffect} from 'react';
import {
  Text,
  NativeBaseProvider,
  ScrollView,
  Stack,
  VStack,
  Center,
  Input,
  Button,
  Box,
  TextArea,
  Select,
  CheckIcon,
  Image,
  FlatList,
} from 'native-base';

import Carousel from 'react-native-reanimated-carousel';

import {SliderBox} from 'react-native-image-slider-box';

export default function VehicleDetail({route, navigation}) {
  const url = 'file:///data/user/0/com.carappfrontend/cache/';

  const vehicle = route.params.vehicle;

  const [imagePlace, setLoadImage] = React.useState('');

  const [images, setImages] = React.useState([
    url + vehicle.img_one,
    url + vehicle.img_two,
    url + vehicle.img_three,
    url + vehicle.img_four,
  ]);
  const [fuel, setFule] = React.useState(vehicle.fuel_Type);
  const [transmission, setTransmission] = React.useState(vehicle.transmission);

  const [vehicleNo, setVehicleNo] = React.useState(vehicle.vehicle_no);
  const [brand, setBrand] = React.useState(vehicle.brand);
  const [model, setModel] = React.useState(vehicle.model);
  const [mileage, setMileage] = React.useState(JSON.stringify(vehicle.mileage));
  const [location, setLocation] = React.useState(vehicle.location);
  const [mobile, setMobile] = React.useState(vehicle.mobile);
  const [description, setDescription] = React.useState(vehicle.description);

  useEffect(() => {
    console.log(images[0]);
  }, []);

  const updateRecord = async () => {
    let car = {
      registration_no: vehicleNo,
      brand: brand,
      model: model,
      fuel_type: fuel,
      transmission: transmission,
      mileage: mileage,
      description: description,
      location: location,
      mobile: mobile,
    };
    try {
      const response = await fetch('http://192.168.43.30:4000/vehicle/', {
        method: 'PUT',
        body: JSON.stringify(car),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      alert(json.message);
      navigation.navigate('Home', {user: vehicle.user_id});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <VStack space={4} alignItems="center" justifyContent={'space-around'}>
          <Center mt={5} w="350" h="200" bg="indigo.100" rounded="md">
            <SliderBox
              images={images}
              dotColor="black"
              parentWidth={350}
            />
          </Center>
          <Center w="90%" rounded="md">
            <Stack space={4} w="100%" mx="auto">
              <Input
                isDisabled={'true'}
                size="xl"
                placeholder="Vehicle Number"
                value={vehicleNo}
                onChangeText={e => {
                  setVehicleNo(e);
                }}
              />
              <Input
                size="xl"
                placeholder="Brand"
                value={brand}
                onChangeText={e => {
                  setBrand(e);
                }}
              />
              <Input
                size="xl"
                placeholder="Model"
                value={model}
                onChangeText={e => {
                  setModel(e);
                }}
              />
              <Input
                keyboardType="numeric"
                size="xl"
                placeholder="Mileage"
                value={mileage}
                onChangeText={e => {
                  setMileage(e);
                }}
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
              <Input
                size="xl"
                placeholder="Location"
                value={location}
                onChangeText={e => {
                  setLocation(e);
                }}
              />
              <Input
                size="xl"
                placeholder="Mobile"
                value={mobile}
                onChangeText={e => {
                  setMobile(e);
                }}
              />
              <Box mb={4} alignItems="center" w="100%">
                <TextArea
                  fontSize="lg"
                  placeholder="Description"
                  w="100%"
                  value={description}
                  onChangeText={e => {
                    setDescription(e);
                  }}
                />
              </Box>
              <VStack space={4} alignItems="center">
                <Button
                  onPress={() => {
                    updateRecord();
                  }}
                  mb={4}
                  w="40%"
                  style={{borderRadius: 100,backgroundColor:'#044BA1'}}
                  variant="solid"
                  size="md">
                  UPDATE
                </Button>
              </VStack>
            </Stack>
          </Center>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}
