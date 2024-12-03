import { StatusBar } from 'react-native';
import React from 'react';
import { Stack, Tabs } from 'expo-router';

const AuthLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' }
                }}
            >
                <Tabs.Screen name="home" />
            </Tabs>
            <StatusBar className="bg-backGroundColor" style="light" />
        </>
    );
};

export default AuthLayout;
