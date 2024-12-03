import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants/images';


const FormField = ({ title, value, placeholder, handleChangeText, viewOptions, secureText, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`${viewOptions}`}>
            <Text className="font-mainFont text-4xl text-textColor">{title}</Text>
            <View
                className={`w-[90%] h-16 px-4 bg-highLightColor rounded-2xl border-2 flex-row items-center
                    ${isFocused ? 'border-primaryColor' : 'border-transparent'}`}
            >
                <TextInput
                    className="flex-1 text-textColor text-3xl font-mainFont"
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleChangeText}
                    secureTextEntry={!showPassword && secureText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {secureText && (
                    <TouchableOpacity className="justify-left" onPress={() => setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.closedBox : icons.openBox}
                            resizeMode='contain'
                            className='w-[40px] h-[40px]' />
                    </TouchableOpacity>
                )}

            </View>
        </View>
    );
};

export default FormField;
