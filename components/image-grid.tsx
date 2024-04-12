import { View, StyleSheet, ActivityIndicator } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./image-card";
import { getColumns, wp } from "@/helpers/common";
import { Suspense } from "react";
import { Router } from "expo-router";
interface ImageGridProps {
  data: [];
  router: Router;
}
export const ImageGrid = ({ data, router }: ImageGridProps) => {
  const columns = getColumns();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={data}
        numColumns={columns}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <Suspense
            fallback={
              <View style={styles.container}>
                <ActivityIndicator size="large" />
              </View>
            }>
            <ImageCard
              router={router}
              item={item}
              columns={columns}
              index={index}
            />
          </Suspense>
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};
export default ImageGrid;
const styles = StyleSheet.create({
  container: { minHeight: 3, width: wp(100) },
  listContainer: {
    paddingHorizontal: wp(4),
  },
});
