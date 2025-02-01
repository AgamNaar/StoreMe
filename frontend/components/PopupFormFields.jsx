import { View } from 'react-native';
import { useState, useEffect } from 'react';
import PopUpWindow from './PopUpWindow';
import CustomButton from './CustomButton';
import FormFields from './FormFields';
import { useGlobalAlertContext } from '../context/AlertProvider';

/**
 * PopupFormFields component displays a form inside a modal. 
 * It allows the user to fill out the form and submit it or cancel.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isVisible - Controls whether the form popup is visible.
 * @param {function} props.setIsVisible - Function to set the visibility of the form popup.
 * @param {Object} props.popupFormData - Data for the form popup, including the button text, function, and form structure.
 * @param {string} props.popupFormData.buttonText - Text to display on the submit button.
 * @param {function} props.popupFormData.buttonFunction - Function to be called on form submission.
 * @param {string} props.popupFormData.title - Title for the form popup.
 * @param {Object} props.popupFormData.formSkeleton - Initial form structure for populating the form fields.
 */
const PopupFormFields = ({ isVisible, setIsVisible, popupFormData }) => {

    const { buttonText, buttonFunction, title, formSkeleton } = popupFormData;
    const { customAlert } = useGlobalAlertContext();

    // State for handling form inputs
    const [form, setForm] = useState({});

    // Populate form fields with skeleton structure when popup becomes visible
    useEffect(() => {
        if (formSkeleton != null)
            setForm(formSkeleton);
    }, [isVisible]);

    /**
     * Handles form submission, calling the buttonFunction with form data.
     * Displays success or failure alert after the submission.
     */
    const handlePress = async () => {
        try {
            await buttonFunction(form);
            customAlert(['Success', `${title} was successful`]);
        } catch (error) {
            customAlert([`Failed to ${title}`, error.message || `Failed to ${title}`]);
        } finally {
            setIsVisible(false);
        }
    };

    return (
        <PopUpWindow isVisible={isVisible} setIsVisible={setIsVisible} containerStyle={'w-[90%]  h-[60%]'}>
            {/* Render the form fields based on the form structure */}
            <FormFields
                form={form}
                setForm={setForm}
                title={title}
            />
            <View className="flex flex-row justify-between">
                {/* Cancel button to close the popup without submitting */}
                <CustomButton title={'Cancel'} handlePress={() => setIsVisible(false)} containerStyle={'w-[40%] m-2 self-end mt-12'} />

                {/* Submit button to trigger form submission */}
                <CustomButton title={buttonText} handlePress={handlePress} containerStyle={'w-[40%] m-2 self-end mt-12'} />
            </View>
        </PopUpWindow>
    );
};

export default PopupFormFields;
