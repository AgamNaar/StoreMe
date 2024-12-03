import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = ({ title, handlePress, containerStyle, textStyle, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-primaryColor rounded-xl min-h-[8%]  justify-center items-center
            ${containerStyle} 
            ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading} >
            <Text className={`font-mainFont font-mainFontBold text-textColor text-4xl ${textStyle}`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
