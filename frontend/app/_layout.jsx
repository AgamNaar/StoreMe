import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import GlobalContextProvider from '../context/GlobalProvider';

import "../global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    // Load custom fonts
    const [fontsLoaded, error] = useFonts({
        "main-font": require("../assets/fonts/Caveat.ttf"),
        "main-bold": require("../assets/fonts/Caveat-Bold.ttf"),
    });

    // Hide SplashScreen once fonts are loaded
    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    // If fonts aren't loaded yet, show a blank screen or loading spinner
    if (!fontsLoaded || error) {
        return null;
    }

    return (
        <GlobalContextProvider>
            <Slot />
        </GlobalContextProvider>
    );
};

export default RootLayout;
