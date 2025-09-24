import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useFonts } from "expo-font";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
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

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row">
            <Image
              source={ images.avatar }
              className="size-12 rounded-full"
            />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text style={{ fontFamily: 'Rubik-Regular', fontSize: 11 }} className="text-xs text-black-100">
                Good Morning
              </Text>
              <Text style={{ fontFamily: 'Rubik-Medium', fontSize: 15 }} className="text-base font-rubik-medium text-black-300">
                Sam
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6" />
        </View>
      </View>

      <Search />
    </SafeAreaView>
  );
}
