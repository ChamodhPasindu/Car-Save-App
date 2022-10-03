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

export default function AddVehicle() {
  const [fuel, setFule] = React.useState('');
  const [trasmission, setTransmission] = React.useState('');

  const [imageOne,setImageOne]=React.useState(require('./images/thumbnail.jpg'))
  const [imageTwo,setImageTwo]=React.useState(require('./images/thumbnail.jpg'))
  const [imageThree,setImageThree]=React.useState(require('./images/thumbnail.jpg'))
  const [imageFour,setImageFour]=React.useState(require('./images/thumbnail.jpg'))

  const openCamera = (method) => {
    const options={
      storageOption:{
        path:'images',
        mediaType:'photo',
      },
      includeBase64:true,
    }
 
  launchCamera(options,response=>{
    if(response.didCancel){
      console.log("user cancle")
    }else if(response.error){
      console.log(response.error)
    }else if(response.customButton){
        console.log(response.customButton)
    }else{
      const source={uri:'data:image/jpej;base64,'+response.assets[0].base64}
      method(source);
    }
  })
};

const openGallery = (method) => {
  const options={
    storageOption:{
      path:'images',
      mediaType:'photo',
    },
    includeBase64:true,
  }

launchImageLibrary(options,response=>{
  if(response.didCancel){
    console.log("user cancle")
  }else if(response.error){
    console.log(response.error)
  }else if(response.customButton){
      console.log(response.customButton)
  }else{
    const source={uri:'data:image/jpej;base64,'+response.assets[0].base64}
    method(source);
  }
})
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
            <Stack mt={5} space={4} w="100%" mx="auto">
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
                    justifyContent="space-around"
                    alignItems="center">
                    <Button
                      onPress={() => {
                       openGallery(setImageOne);
                      }}
                      variant="solid"
                      colorScheme="blue"
                      size="sm">
                      Gallery
                    </Button>
                    <Button
                      onPress={() => {
                        openCamera(setImageOne);
                      }}
                      variant="solid"
                      colorScheme="blue"
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
                    justifyContent="space-around"
                    alignItems="center">
                    <Button
                      onPress={() => {
                       openGallery(setImageTwo)
                      }}
                      variant="solid"
                      colorScheme="blue"
                      size="sm">
                      Gallery
                    </Button>
                    <Button
                      onPress={() => {
                        openCamera(setImageTwo)
                      }}
                      variant="solid"
                      colorScheme="blue"
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
                    justifyContent="space-around"
                    alignItems="center">
                    <Button
                      onPress={() => {
                       openGallery(setImageThree)
                      }}
                      variant="solid"
                      colorScheme="blue"
                      size="sm">
                      Gallery
                    </Button>
                    <Button
                      onPress={() => {
                       openCamera(setImageThree)
                      }}
                      variant="solid"
                      colorScheme="blue"
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
                    justifyContent="space-around"
                    alignItems="center">
                    <Button
                      onPress={() => {
                        openGallery(setImageFour)
                      }}
                      variant="solid"
                      colorScheme="blue"
                      size="sm">
                      Gallery
                    </Button>
                    <Button
                      onPress={() => {
                        openCamera(setImageFour)
                      }}
                      variant="solid"
                      colorScheme="blue"
                      size="sm">
                      Camera
                    </Button>
                  </HStack>
                </Center>
              </HStack>
              <Input mt={5} size="xl" placeholder="Vehicle Number" />
              <Input size="xl" placeholder="Brand" />
              <Input size="xl" placeholder="Model" />
              <Input size="xl" placeholder="Mileage" />

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
                  <Select.Item label="Petrol" value="petrol" />
                  <Select.Item label="diesel" value="diesel" />
                </Select>
              </Box>
              <Box w="100%">
                <Select
                  fontSize="lg"
                  selectedValue={trasmission}
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
              <Input size="xl" placeholder="Location" />
              <Box mb={4} alignItems="center" w="100%">
                <TextArea fontSize="lg" placeholder="Description" w="100%" />
              </Box>
              <VStack space={4} alignItems="center">
                <Button
                  mb={4}
                  w="40%"
                  style={{borderRadius: 100}}
                  colorScheme="red"
                  size="md">
                  SAVE
                </Button>
              </VStack>
            </Stack>
          </View>
        </Stack>
      </ScrollView>
    </NativeBaseProvider>
  );
}
