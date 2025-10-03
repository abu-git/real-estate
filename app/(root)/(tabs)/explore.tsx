import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { useFonts } from "expo-font";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Explore() {
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

  const params = useLocalSearchParams<{ query?: string; filter?: string; }>()

  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: { filter: params.filter!, query: params.query!, limit: 20 },
    skip: true
  })

  //console.log(properties)

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    })
  }, [params.filter, params.query])

  const handleCardPress = (id: string) => router.push(`/properties/${id}`)

  return (
    <SafeAreaView className="bg-white h-full">
      {/*<Button title="Seed" onPress={seed} />*/}
      <FlatList
        data={properties}
        renderItem={({item}) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text style={{ fontFamily: 'Rubik-Medium' }} className="text-base mr-2 text-center text-black-300">
                Search for Your Ideal Home
              </Text>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>

            <Search />

            <Filters />
            <View className="mt-5">
              <Text style={{ fontFamily: 'Rubik-Bold' }} className="text-xl mt-5">Found {properties?.length} Properties</Text>
            </View>
          </View>  
        )
        }
      />
      

      
    </SafeAreaView>
  );
}
