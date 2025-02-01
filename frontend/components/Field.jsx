import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants/images';
import { shadowStylePrimary } from '../constants/styles';

/**
 * Field component renders an input field with optional password visibility toggle 
 * and customizable styling. It also allows the user to input data with a placeholder
 * and handles text changes.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.title - The label for the input field.
 * @param {string} props.value - The value of the input field.
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @param {function} props.handleChangeText - Function to update the form state when the input changes.
 * @param {string} props.viewOptions - Additional styling for the wrapper view.
 * @param {boolean} props.secureText - Whether the field should behave like a password input (hides text).
 */
const Field = ({ title, value, placeholder, handleChangeText, viewOptions, secureText }) => {
    const [isFocused, setIsFocused] = useState(false); // Tracks focus state of the input
    const [showPassword, setShowPassword] = useState(false); // Manages visibility of password

    return (
        <View className={`${viewOptions}`}>
            {/* Title of the field */}
            <Text className="font-mainFont text-xl text-textColor pb-2" style={shadowStylePrimary}>
                {title}
            </Text>

            {/* Input field container with dynamic border color based on focus */}
            <View
                className={`w-[100%] px-4 bg-highLightColor rounded-2xl border-2 flex-row items-center
                    shadow-2xl shadow-primaryColor
                    ${isFocused ? 'border-primaryColor' : 'border-transparent'}`}
            >
                {/* The actual text input */}
                <TextInput
                    className="flex-1 text-textColor text-2xl font-textFont"
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleChangeText}
                    secureTextEntry={!showPassword && secureText} // Conditionally hide text for password fields
                    onFocus={() => setIsFocused(true)} // Focus state management
                    onBlur={() => setIsFocused(false)} // Focus state management
                />

                {/* Show/hide password button if secureText is true */}
                {secureText && (
                    <TouchableOpacity className="justify-left" onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.closedBox : icons.openBox}
                            style={{
                                width: 40,
                                height: 40,
                                objectFit: 'contain',
                            }}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default Field;
