import { Text } from 'react-native';
import React from 'react';
import PopUpWindow from './PopUpWindow';
import { shadowStyleWhite } from '../constants/styles';
import CustomButton from './CustomButton';

/**
 * CustomAlert component displays a custom alert modal with a header, message, 
 * and a "Close" button to dismiss the alert.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isVisible - Controls whether the alert modal is visible.
 * @param {function} props.setIsVisible - Function to set the visibility of the modal.
 * @param {Object} props.alertData - Data for the alert, containing a header and message.
 * @param {string} props.alertData.header - The header text for the alert.
 * @param {string} props.alertData.message - The message text for the alert.
 */
const CustomAlert = ({ isVisible, setIsVisible, alertData }) => {
    const { header, message } = alertData;

    return (
        <PopUpWindow isVisible={isVisible} setIsVisible={setIsVisible} containerStyle={'w-[90%]'}>
            {/* Displaying the alert header with custom styling */}
            <Text className="color-primaryColor text-4xl font-mainFont text-left p-2"
                style={shadowStyleWhite}>
                {header}
            </Text>

            {/* Displaying the alert message with custom styling */}
            <Text className="color-primaryColor text-2xl font-mainFont text-left p-2"
                style={shadowStyleWhite}>
                {message}
            </Text>

            {/* Close button to dismiss the alert */}
            <CustomButton
                title={'Close'}
                handlePress={() => setIsVisible(false)}
                containerStyle={'w-[40%] m-2 self-end mt-12'}
            />
        </PopUpWindow>
    );
};

export default CustomAlert;
