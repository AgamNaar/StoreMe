import { View, Text, ScrollView, Image, Alert, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { logos } from '../../constants/images';
import FromField from '../../components/FromField';
import CustomButton from '../../components/CustomButton'
import { signUpRequest } from '../../services/authServices/authServices'


const SignUp = () => {

    const [form, setForm] = useState({
        userName: '',
        email: '',
        password: '',
        rePassword: ''

    });

    const test = async () => {
        router.replace('/login')
    }

    const [isSignUpToServer, setsSignUpToServer] = useState()

    const singUpToServer = async () => {
        try {
            await signUpRequest(form.userName, form.email, form.password, form.rePassword, setsSignUpToServer)
            Alert.alert('Success', 'You have created account successfully!');
            router.push('/home');
        } catch (error) {
            Alert.alert('Login Error', error.message || 'An error occurred during login.');
        }
    }

    return (
        < SafeAreaView className="bg-backGroundColor h-full " >
            <ScrollView pointerEvents={isSignUpToServer ? 'none' : 'auto'}>
                {isSignUpToServer && (
                    <View className="items-center h=[50%]">
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}
                <View className='pt-[10%] px-10 flex-row items-center'>
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
                        Create new account
                    </Text>
                    <FromField
                        title="User name"
                        value={form.userName}
                        viewOptions="pt-2"
                        handleChangeText={(e) => setForm
                            ({ ...form, userName: e })}
                        keyBoardType="email-address"
                    />
                    <FromField
                        title="Email"
                        value={form.email}
                        viewOptions="pt-4"
                        handleChangeText={(e) => setForm
                            ({ ...form, email: e })}
                        keyBoardType="email-address"
                    />
                    <FromField
                        title="Password"
                        viewOptions="pt-4"
                        value={form.password}
                        handleChangeText={(e) => setForm
                            ({ ...form, password: e })}
                    />
                    <FromField
                        title="Re-enter password"
                        viewOptions="pt-4 pb-10"
                        value={form.rePassword}
                        handleChangeText={(e) => setForm
                            ({ ...form, rePassword: e })}
                    />
                </View>
                <View className='items-center'>
                    <CustomButton
                        title={'Sign-up! '}
                        handlePress={singUpToServer}
                        isLoading={isSignUpToServer}
                        containerStyle={'w-[60%]'}
                    />
                </View>
                <View className='flex-row justify-center item-center pt-6'>
                    <Text className='text-textColor pr-2 font-mainFont text-4xl '>
                        Already have account?'
                    </Text>
                    <Link className='font-mainFontBold text-primaryColor text-4xl' href='/login' onPress={test}>
                        Login'
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
};


export default SignUp