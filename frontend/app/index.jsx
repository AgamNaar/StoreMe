import React from 'react';
import { Text, Image, ScrollView, StatusBar } from 'react-native';
import { logos } from '../constants/images';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';

const App = () => {
  return (
    <ScrollView className='pt-[15%] bg-backGroundColor'
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text className={"text-primaryColor pt-[7%] pb-[7%] font-mainFontBold text-[65px]"}>
        Welcome to StoreMe!!!
      </Text>
      <Image
        source={logos.first}
        style={{ width: 160, height: 160 }}
      />
      <Text className={"text-primaryColor text-[35px] pt-[7%] px-[5%] font-mainFontBold"}>
        The app that will help you organize your inventory!
      </Text>
      <CustomButton
        title="start now!! "
        handlePress={() => router.push('/login')}
        containerStyle={"w-[60%] m-[20%]"}
      />
      <StatusBar className='bg-backGroundColor' style='light' />
    </ScrollView>
  );
};

export default App;