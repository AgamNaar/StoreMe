import React from 'react';
import { View, Text } from 'react-native';
import Field from './Field';
import CustomButton from './CustomButton';
import { shadowStyleWhite } from '../constants/styles';

/**
 * FormFields component dynamically generates form fields based on the provided form object.
 * It also includes a customizable button at the bottom for form submission or cancellation.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.form - The form data, an object where keys are field names and values are field values.
 * @param {function} props.setForm - Function to update the form state.
 * @param {function} [props.handlePress] - Optional function to call when the button is pressed.
 * @param {string} props.title - The title displayed at the top of the form.
 * @param {string} [props.buttonTitle] - The text for the button at the bottom of the form (if provided).
 */
const FormFields = ({ form, setForm, handlePress, title, buttonTitle }) => {
    // Extract keys of the form object and use them to create form fields dynamically
    const formKeys = Object.keys(form);

    return (
        <View className="flex-1 justify-center px-10">
            {/* Title of the form */}
            <Text className="text-5xl font-headerFont text-primaryColor pb-8"
                style={shadowStyleWhite}>
                {title}
            </Text>

            {/* Dynamically rendering form fields based on the form object */}
            {formKeys.map((key) => (
                <Field
                    key={key}
                    title={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    value={form[key]}
                    viewOptions={`pb-4`}
                    handleChangeText={(e) => setForm({ ...form, [key]: e })}
                    keyBoardType={key === 'email' ? 'email-address' : 'default'}
                    secureText={key === 'password' || key === 'rePassword'}
                />
            ))}

            {/* Conditionally rendering the button if buttonTitle is provided */}
            {buttonTitle != null && (
                <View className='justify-center items-center pt-8'>
                    <CustomButton
                        title={buttonTitle}
                        handlePress={handlePress}
                        containerStyle={'w-[70%]'}
                    />
                </View>
            )}
        </View>
    );
};

export default FormFields;
