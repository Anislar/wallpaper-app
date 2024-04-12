import AsyncStorage from "@react-native-async-storage/async-storage";
import { FC, useEffect, useState } from "react";
import Animated from "react-native-reanimated";

interface ImageRenderProps {
  uri: string;

  [key: string]: any;
}

const ImageRender: FC<ImageRenderProps> = (props) => {
  const { uri } = props;
  const [cachedSource, setCachedImage] = useState<{
    uri: string;
  }>({
    uri: "",
  });
  useEffect(() => {
    const getImageCached = async () => {
      try {
        const cachedImage = await AsyncStorage.getItem(uri);
        if (cachedImage) {
          setCachedImage({ uri: cachedImage });
        } else {
          const response = await fetch(uri)
            .then((res) => res.blob())
            .then(async (blob) => {
              const base64: any = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);

                reader.onloadend = () => {
                  resolve(reader.result);
                };
                reader.onerror = () => reject(new Error("Error"));
              });
              return base64;
            });
          await AsyncStorage.setItem(uri, response);
          setCachedImage({ uri: response });
        }
      } catch (error) {
        console.error(error);
        setCachedImage({ uri });
      }
    };
    getImageCached();
  }, []);

  return (
    <Animated.Image
      sharedTransitionTag={cachedSource.uri}
      source={cachedSource.uri ? { uri: cachedSource.uri } : { uri }}
      {...props}
    />
  );
};

export default ImageRender;
