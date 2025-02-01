import { Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import PopUpWindow from './PopUpWindow';
import { shadowStyleWhite } from '../constants/styles';

/**
 * LoadingComponent is a simple modal that shows a loading indicator 
 * along with a "Loading" text message.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isVisible - Controls whether the loading modal is visible or not.
 */
const LoadingComponent = ({ isVisible }) => {
  return (
    <PopUpWindow isVisible={isVisible}>
      {/* Displaying the loading text with custom styling */}
      <Text className="color-primaryColor text-4xl font-mainFont text-center"
        style={shadowStyleWhite}>
        Loading
      </Text>

      {/* Activity indicator to show the loading state */}
      <ActivityIndicator className="mb-3 mt-3" size="large" color="#06595d" />
    </PopUpWindow>
  );
};

export default LoadingComponent;
