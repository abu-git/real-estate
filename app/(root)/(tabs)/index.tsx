import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { useFonts } from "expo-font";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
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

  const { user } = useGlobalContext()

  const params = useLocalSearchParams<{ query?: string; filter?: string; }>()

  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({ fn: getLatestProperties })

  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: { filter: params.filter!, query: params.query!, limit: 6 },
    skip: true
  })

  //console.log(properties)

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
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
                    {user?.name}
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

              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList data={latestProperties} 
                  renderItem={({item}) => (<FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />)}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              )}
              

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
