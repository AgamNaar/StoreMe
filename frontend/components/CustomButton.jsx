import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

/**
 * CustomButton component is a reusable button with customizable title, press handler, 
 * and styling. It uses TouchableOpacity for the button interaction and includes styling 
 * for background color, shadow, and text.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.title - The text to display on the button.
 * @param {function} props.handlePress - Function to execute when the button is pressed.
 * @param {string} [props.containerStyle] - Additional custom styles to apply to the button container.
 */
const CustomButton = ({ title, handlePress, containerStyle }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-primaryColor rounded-xl p-3 opacity-90 shadow-2xl shadow-primaryColor ${containerStyle}`}>
            {/* Button text with styling for font, color, and alignment */}
            <Text className='font-textFont text-textColor text-4xl w-full text-center'>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
