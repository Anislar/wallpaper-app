import { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import { wp, getImageSize } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { Router } from "expo-router";
interface ImageCardProps {
  item: any;
  index: number;
  columns: number;
  router: Router;
}

const ImageCard: FunctionComponent<ImageCardProps> = ({
  item,
  index,
  columns,
  router,
}) => {
  const getHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };
  const isLastInRow = () => (index + 1) % columns === 0;
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "/home/image", params: { ...item } })
      }
      style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
      <Image
        style={[styles.images, getHeight()]}
        source={item?.webformatURL}
        transition={100}
      />
    </TouchableOpacity>
  );
};
export default ImageCard;
const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.raduis.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  images: {
    height: 300,
    width: `100%`,
  },
  spacing: {
    marginRight: wp(2),
  },
});
