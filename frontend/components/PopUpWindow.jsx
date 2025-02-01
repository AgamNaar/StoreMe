import React from 'react';
import { View, Modal } from 'react-native';

/**
 * PopUpWindow component displays a modal with customizable content.
 * The modal is transparent, with a background overlay and a centered popup window.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the popup.
 * @param {boolean} props.isVisible - Controls whether the modal is visible or not.
 * @param {string} [props.containerStyle] - Additional styles to apply to the popup container.
 */
const PopUpWindow = ({ children, isVisible, containerStyle }) => {
    return (
        <Modal transparent visible={isVisible} animationType="fade">
            {/* Background overlay with semi-transparent black color */}
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center">
                {/* Popup container with optional styling */}
                <View className={`bg-highLightColor p-4 shadow-2xl shadow-primaryColor rounded-3xl self-center ${containerStyle}`}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

export default PopUpWindow;

