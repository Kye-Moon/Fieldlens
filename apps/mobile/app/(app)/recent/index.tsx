import {Button, FlatList, Text, View} from "@gluestack-ui/themed";
import React from "react";
import {StyleSheet} from "react-native";
import {Stack, useRouter} from "expo-router";
import * as MediaLibrary from "expo-media-library";
import {Image} from "expo-image";
import {useRecoilValue} from "recoil";
import {takenImagesState} from "../../../state/atoms";

export default function RecentScreen() {
  const router = useRouter();
  const [assets, setAssets] = React.useState<MediaLibrary.Asset[]>([]);
  const images = useRecoilValue(takenImagesState);
  console.log(images);

  React.useEffect(() => {
    const getRecent = async () => {
      const { assets } = await MediaLibrary.getAssetsAsync({
        first: 100,
        sortBy: [MediaLibrary.SortBy.creationTime]
      });
      const filteredAssets = assets.filter(
        (asset) => images.map((image) => image.id).includes(asset.id)
      );
      setAssets(filteredAssets);
    };
    getRecent();
  }, [images]);

  const renderItem = ({ item }: { item: any }) => (
    <Image source={{ uri: item.uri }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Recent",
          headerLeft: () => <Button variant={"link"}
                                    onPress={() => router.back()}><Text>Back</Text></Button>
        }}
      />
      <View style={styles.contents}>
        <FlatList
          data={assets}
          numColumns={4}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between"
  },
  contents: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  image: {
    aspectRatio: 1179 / 2256,
    width: "21.8%",
    margin: 6,
    borderRadius: 4
  }
});
