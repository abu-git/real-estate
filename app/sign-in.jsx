import { useFonts } from "expo-font";
import React from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../lib/appwrite';
import { useGlobalContext } from '../lib/global-provider';

import { Redirect } from "expo-router";
import icons from '../constants/icons';
import images from '../constants/images';

const SignIn = () => {
    const { refetch, loading, isLogged } = useGlobalContext()

    if (!loading && isLogged) return <Redirect href='/' />

    const handleLogin = async () => {
        const result = await login()

        if(result){
            refetch()
        }else{
            Alert.alert("Error", "Failed to login")
        }
    }

    const [fontsLoaded] = useFonts({
        "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
        "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
        "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
        "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
        "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
        "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    });
      
    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView className='bg-white h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <Image source={images.onboarding} className='w-full h-4/6' contentFit='contain'/>

                <View className="px-10">
                    <Text style={{ fontFamily: 'Rubik-Regular', fontSize: 17, textTransform: 'uppercase' }} className="text-center text-black-200">
                        Welcome To Real Estate
                    </Text>

                    <Text style={{ fontFamily: 'Rubik-Bold', fontSize: 24 }} className="text-3xl text-black-300 text-center mt-2">
                        Let's Get You Closer To {"\n"}
                        <Text className="text-primary-300">Your Ideal Home</Text>
                    </Text>

                    <Text style={{ fontFamily: '', fontSize: 15}} className="text-lg text-black-200 text-center mt-12">
                        Login to Real Estate with Google
                    </Text>

                    <TouchableOpacity
                        onPress={handleLogin}
                        className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
                    >
                        <View className="flex flex-row items-center justify-center">
                            <Image
                                source={icons.google}
                                className="w-5 h-5"
                                resizeMode="contain"
                            />
                            <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn