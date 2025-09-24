import { logout } from "@/lib/appwrite"
import { useGlobalContext } from "@/lib/global-provider"
import { useFonts } from "expo-font"
import React from 'react'
import { Alert, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { settings } from "@/constants/data"
import icons from '@/constants/icons'
import images from "@/constants/images"

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text style={{ fontFamily: 'Rubik-Medium' }} className={`text-lg text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
)

const Profile = () => {
  const { user, refetch } = useGlobalContext()
  //console.table(user?.avatar)
  
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../../../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../../../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../../../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../../../assets/fonts/Rubik-SemiBold.ttf"),
  })
  
  if (!fontsLoaded) {
    return null;
  }

  const handleLogout = async () => {
    const result = await logout()
    if(result){
      Alert.alert("Success", "Logged out successfully")
      refetch()
    }else{
      Alert.alert("Error", "Failed to logout")
    }
  }

  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text style={{ fontFamily: 'Rubik-Bold', fontSize: 20 }} className="text-xl">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={images.avatar}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text style={{ fontFamily: 'Rubik-Bold' }} className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile