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

export default function VehicleDetail({route, navigation}) {
  const vehicle = route.params.vehicle;

  const [images, setImages] = React.useState([]);
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
    console.log(vehicleNo);

    loadVehicleImg();
    console.log(images);
  }, []);

  const loadVehicleImg =  () => {
     fetch('http://192.168.43.30:4000/vehicle/' + vehicleNo)
      .then(response => response.json())
      .then(json => setImages(json.data))
      .catch(err => console.log(err));
  };

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
          <Stack mt={5} w="350" h="200" bg="indigo.300" rounded="md">
            <FlatList
            width='100%'
            height='100%'
              data={images}
              renderItem={({item}) => {
                <Image
                  source={{
                    uri:
                      'file:///data/user/0/com.carappfrontend/cache/rn_image_picker_lib_temp_66d4df7c-0a5f-4ecf-8d5f-d838db479db3.jpg' 
                  }}
                  alt="Alternate Text"
                  width="100%"
                  height="100%"
                />;
                <Text>
                  Hellow
                </Text>
              }}
            />
          </Stack>
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
                  style={{borderRadius: 100}}
                  variant="solid"
                  colorScheme="blue"
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
