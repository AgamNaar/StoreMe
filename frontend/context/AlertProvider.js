import { createContext, useContext, useState } from 'react';
import LoadingComponent from '../components/LoadingComponent.jsx';
import CustomAlert from '../components/CustomAlert.jsx';
import PopupFormFields from '../components/PopupFormFields.jsx';

// Creating a context for global alerts and loading state
const GlobalAlertContext = createContext();

// Custom hook to use the GlobalAlertContext in other components
export const useGlobalAlertContext = () => useContext(GlobalAlertContext);

/**
 * GlobalAlertProvider component provides global alert, popup form, 
 * and loading state management to its children.
 */
const GlobalAlertProvider = ({ children }) => {
    // State to control loading visibility
    const [isLoading, setIsLoading] = useState(false);

    // State to control alert visibility and its data
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [alertData, setAlertData] = useState({});

    // State to control popup form visibility and its data
    const [popupFormVisibility, setPopupFormVisibility] = useState(false);
    const [popupFormData, setPopupFormData] = useState({});

    /**
     * Function to show a custom alert with a header and message.
     * @param {[string, string]} param0 - Tuple containing alert header and message.
     */
    const customAlert = ([header, message]) => {
        setAlertData({ header, message });
        setAlertVisibility(true);
    };

    /**
     * Function to show a custom popup form.
     * @param {[string, string, object, function]} param0 - 
     * Tuple containing form title, button text, form structure, and submit function.
     */
    const customFormPopup = ([title, buttonText, formSkeleton, buttonFunction]) => {
        setPopupFormData({ title, buttonText, formSkeleton, buttonFunction });
        setPopupFormVisibility(true);
    };

    return (
        <GlobalAlertContext.Provider value={{
            setIsLoading,
            customAlert,
            customFormPopup,
        }}>
            {/* Displays a loading indicator if isLoading is true */}
            <LoadingComponent isVisible={isLoading} />

            {/* Displays a custom alert if alertVisibility is true */}
            <CustomAlert
                isVisible={alertVisibility}
                setIsVisible={setAlertVisibility}
                alertData={alertData}
            />

            {/* Displays a popup form if popupFormVisibility is true */}
            <PopupFormFields
                isVisible={popupFormVisibility}
                setIsVisible={setPopupFormVisibility}
                popupFormData={popupFormData}
            />

            {children}
        </GlobalAlertContext.Provider>
    );
};

export default GlobalAlertProvider;
