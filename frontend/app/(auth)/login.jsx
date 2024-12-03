import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { logos } from '../../constants/images';
import FromField from '../../components/FromField';
import CustomButton from '../../components/CustomButton'
import { loginRequest } from '../../services/authServices/authServices'
import { router } from 'expo-router'


const Login = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [isLoginToServer, setsLoginToServer] = useState(false)

    const handleLogin = async () => {
        try {
            await loginRequest(form.email, form.password, setsLoginToServer);
            Alert.alert('Success', 'You have logged in successfully!');
            router.push('/home')
        } catch (error) {
            Alert.alert('Login Error', error.message || 'An error occurred during login.');
        }
    }

    return (
        < SafeAreaView className="bg-backGroundColor h-full " >
            <ScrollView>
                <View className='pt-[25%] px-10 flex-row items-center'>
                    <Image
                        source={logos.first}
                        resizeMode='contain'
                        className='w-[80px] h-[80px]'
                    />
                    <Text className="-m-4 text-[40px] font-mainFontBold text-textColor w-full">
                        StoreMe
                    </Text>
                </View>
                <View className="pl-10 ">
                    <Text className="pt-2 text-[40px] font-mainFontBold text-primaryColor">
                        Login to StoreMe
                    </Text>
                    <FromField
                        title="Email"
                        value={form.email}
                        viewOptions="pt-2"
                        handleChangeText={(e) => setForm
                            ({ ...form, email: e })}
                        keyBoardType="email-address"
                    />
                    <FromField
                        title="Password"
                        viewOptions="pt-4 pb-12"
                        value={form.password}
                        handleChangeText={(e) => setForm
                            ({ ...form, password: e })}
                        secureText={true}
                    />
                </View>
                <View className='items-center'>
                    <CustomButton
                        title={'Login'}
                        handlePress={handleLogin}
                        isLoading={isLoginToServer}
                        containerStyle={'w-[60%]'}

                    />
                </View>
                <View className='flex-row justify-center item-center pt-36'>
                    <Text className='text-textColor pr-2 font-mainFont text-4xl '>
                        Don't have account?'
                    </Text>
                    <Link className='font-mainFontBold text-primaryColor text-4xl' href='/sign-up'>
                        sign-up'
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
};


export default Login