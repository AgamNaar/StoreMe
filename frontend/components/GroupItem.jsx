import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const GroupItem = ({ containerStyle, name, description, handlePress, groupImage }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`flex-row bg-highLightColor rounded-xl min-h-[80px] items-center ${containerStyle}`}
        >
            <View className="items-start pr-10 pl-5">
                <Image
                    source={groupImage} // Use the passed-in image here
                    style={{
                        width: 60,
                        height: 60,
                        objectFit: 'contain', // Ensures the image scales properly
                    }}
                />
            </View>
            <View className="items-start">
                <Text className="text-primaryColor font-mainFontBold text-2xl">
                    {name}
                </Text>
                <Text className="text-secondaryColor font-mainFont text-xl">
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default GroupItem;
