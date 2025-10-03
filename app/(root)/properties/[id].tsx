import icons from '@/constants/icons'
import images from '@/constants/images'
import { getPropertyById } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { useFonts } from "expo-font"
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Property = () => {
    const [fontsLoaded] = useFonts({
        "Rubik-Bold": require("../../../assets/fonts/Rubik-Bold.ttf"),
        "Rubik-ExtraBold": require("../../../assets/fonts/Rubik-ExtraBold.ttf"),
        "Rubik-Light": require("../../../assets/fonts/Rubik-Light.ttf"),
        "Rubik-Medium": require("../../../assets/fonts/Rubik-Medium.ttf"),
        "Rubik-Regular": require("../../../assets/fonts/Rubik-Regular.ttf"),
        "Rubik-SemiBold": require("../../../assets/fonts/Rubik-SemiBold.ttf"),
    });
      
    if (!fontsLoaded) {
        return null;
    }
    
    const { id } = useLocalSearchParams<{ id?: string }>()

    const windowHeight = Dimensions.get("window").height

    const { data: property } = useAppwrite({
        fn: getPropertyById,
        params: {
            id: id!
        }
    })

    //console.log(property)

    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 bg-white"
            >
                <View className="relative w-full" style={{ height: windowHeight / 2 }}>
                    <Image source={{ uri: property?.image }} className="size-full" resizeMode="cover" />
                    <Image source={images.whiteGradient} className="absolute top-0 w-full z-40" />

                    <View className="z-50 absolute inset-x-7" style={{ top: Platform.OS === 'ios' ? 70 : 20 }}>
                        <View className="flex flex-row items-center w-full justify-between">
                            <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image source={icons.backArrow} className="size-5" />
                            </TouchableOpacity>

                            <View className="flex flex-row items-center gap-3">
                                <Image source={icons.heart} className="size-7" tintColor={"#191D31"} />
                                <Image source={icons.send} className="size-7" />
                            </View>
                        </View>
                    </View>
                </View>

                <View className="px-5 mt-7 flex gap-2">
                    <Text style={{ fontFamily: 'Rubik-ExtraBold' }} className='text-2xl'>{property?.name}</Text>

                    <View className="flex flex-row items-center gap-3">
                        <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
                            <Text style={{ fontFamily: 'Rubik-Bold' }} className='text-xs text-primary-300'>{property?.type}</Text>
                        </View>

                        <View className="flex flex-row items-center gap-2">
                            <Image source={icons.star} className="size-5" />
                            <Text style={{ fontFamily: 'Rubik-Medium' }} className='text-black-200 text-sm mt-1'>{property?.rating} (2 reviews)</Text>
                        </View>
                    </View>

                    <View className="flex flex-row items-center mt-5">
                        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
                            <Image source={icons.bed} className="size-4" />
                        </View>
                        <Text style={{ fontFamily: 'Rubik-Medium' }} className="text-black-300 text-sm ml-2">{property?.bedrooms} Beds</Text>

                        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
                            <Image source={icons.bath} className="size-4" />
                        </View>
                        <Text style={{ fontFamily: 'Rubik-Medium' }} className="text-black-300 text-sm ml-2">{property?.bathrooms} Baths</Text>

                        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
                            <Image source={icons.area} className="size-4" />
                        </View>
                        <Text style={{ fontFamily: 'Rubik-Medium' }} className="text-black-300 text-sm ml-2">{property?.area} sqft</Text>
                    </View>

                    <View className="w-full border-t border-primary-200 pt-7 mt-5">
                        <Text style={{ fontFamily: 'Rubik-Bold' }} className="text-black-300 text-xl">Agent</Text>
                        <View className="flex flex-row items-center justify-between mt-4">
                            <Image source={images.avatar} className="size-14 rounded-full" />

                            <View className="flex flex-col items-start justify-center ml-3">
                                <Text style={{ fontFamily: 'Rubik-Bold' }} className="text-lg text-black-300 text-start">Johnson Fashanu</Text>
                                <Text style={{ fontFamily: 'Rubik-Medium' }} className="text-sm text-black-200 text-start">Owner</Text>
                            </View>
                            <View className="flex flex-row items-center gap-3">
                                <Image source={icons.chat} className="size-7" />
                                <Image source={icons.phone} className="size-7" />
                            </View>
                        </View>

                        <View className="mt-7">
                            <Text style={{ fontFamily: 'Rubik-Bold' }} className="text-black-300 text-xl">
                                Overview
                            </Text>
                            <Text style={{ fontFamily: 'Rubik-Regular' }} className="text-black-200 text-base font-rubik mt-2">
                                {property?.description}
                            </Text>
                        </View>
                        
                        <View className="mt-7">
                            <Text style={{ fontFamily: 'Rubik-Bold' }} className="text-black-300 text-xl">Facilities</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Property