import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useFonts } from "expo-font";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
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
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({item}) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
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

            <Search />

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text style={{ fontFamily: 'Rubik-Bold' }} className="text-xl text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text style={{ fontFamily: 'Rubik-Bold' }} className="text-base text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList data={[1, 2, 3]} 
                renderItem={({item}) => (<FeaturedCard />)}
                keyExtractor={(item) => item.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />

            </View>

            <View className="flex flex-row items-center justify-between">
              <Text style={{ fontFamily: 'Rubik-Bold' }} className="text-xl text-black-300">
                Our Recommendations
              </Text>
              <TouchableOpacity>
                <Text style={{ fontFamily: 'Rubik-Bold' }} className="text-base text-primary-300">
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            <Filters />

          </View>)
        }
      />
      

      
    </SafeAreaView>
  );
}
