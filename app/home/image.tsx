import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FC, useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { Entypo, Octicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Toast, {
  ToastType,
  ToastConfigParams,
} from "react-native-toast-message";

interface ImageScreenProps {}
enum Status {
  idle = "idle",
  loading = "loading",
  downloading = "downloading",
  downloadSuccess = "downloadSuccess",
  sharing = "sharing",
  error = "error",
}
const ImageScreen: FC<ImageScreenProps> = ({}) => {
  const router = useRouter();
  const item = useLocalSearchParams<any>();
  const [status, setStatus] = useState<Status>(Status.loading);
  const fileName = item?.webformatURL.split("/").pop();
  const filePath = `${FileSystem.documentDirectory}${fileName}`;
  const onLoad = () => {
    setStatus(Status.idle);
  };
  const getImageSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;

    const maxWidth = Platform.OS == "web" ? wp(50) : wp(92);
    const calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;
    if (aspectRatio < 1) {
      // portrait
      calculatedWidth = calculatedHeight * aspectRatio;
    }
    return {
      height: calculatedHeight,
      width: calculatedWidth,
    };
  };

  /** ----------------------------------> Share <---------------------------------- **/
  const handleShare = useCallback(async () => {
    try {
      if (Platform.OS === "web") {
        showToast("Link Copied", "info");
        navigator.clipboard.writeText(item?.webformatURL);
        return;
      }
      setStatus(Status.sharing);
      const uri = await dowloadFile();
      if (uri) {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      setStatus(Status.error);
      showToast("Failed to share the image", "error");
    } finally {
      setStatus(Status.idle);
    }
  }, []);
  /** ----------------------------------> Download <---------------------------------- **/
  const handleDownload = useCallback(async () => {
    if (Platform.OS === "web") {
      const anchor = document.createElement("a");

      anchor.href = item?.webformatURL;

      anchor.target = "_blank";
      anchor.download = fileName || "image";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      return;
    }
    setStatus(Status.downloading);
    await dowloadFile();
    setStatus(Status.downloadSuccess);
    showToast("Image downloaded", "success");
    setTimeout(() => {
      setStatus(Status.idle);
    }, 1000);
  }, []);
  const dowloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(
        item?.webformatURL,
        filePath
      );
      console.log("downloaded to", uri);
      return uri;
    } catch (error: Error | any) {
      setStatus(Status.error);

      showToast("Failed to download image", "error");

      console.log("errror", error);
      return null;
    } finally {
      setStatus(Status.idle);
    }
  };
  /** ----------------------------------> Toast <---------------------------------- **/

  const showToast = (message: string, type: ToastType) => {
    Toast.show({
      type,
      text1: message,
      position: "bottom",
    });
  };
  const toastConfig = {
    success: ({ text1, ...props }: any) => {
      return (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{text1}</Text>
        </View>
      );
    },
  };

  return (
    <BlurView
      intensity={50}
      tint="dark"
      style={[styles.container, StyleSheet.absoluteFill]}>
      <View style={getImageSize()}>
        <View style={styles.loading}>
          {status == "loading" && (
            <ActivityIndicator color={theme.colors.white} size="large" />
          )}
        </View>
        <Image
          transition={100}
          style={[styles.image, getImageSize()]}
          source={item?.webformatURL}
          onLoad={onLoad}
        />
      </View>
      <View style={styles.actionWrapper}>
        <Animated.View entering={FadeInDown.springify()}>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Octicons name="x" color="white" size={24} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status === "downloading" ? (
            <View style={styles.button}>
              <ActivityIndicator color={theme.colors.white} size="small" />
            </View>
          ) : status === "downloadSuccess" ? (
            <View style={styles.button}>
              <Octicons name="check" color="white" size={24} />
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleDownload}>
              <Octicons name="download" color="white" size={24} />
            </TouchableOpacity>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status === "sharing" ? (
            <View style={styles.button}>
              <ActivityIndicator color={theme.colors.white} size="small" />
            </View>
          ) : (
            <TouchableOpacity onPress={handleShare} style={styles.button}>
              <Entypo name="share" color="white" size={22} />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
      <Toast visibilityTime={2500} config={toastConfig} />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,  0.5)",
  },
  image: {
    borderRadius: theme.raduis.lg,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  actionWrapper: {
    marginTop: theme.space.lg,
    flexDirection: "row",
    gap: wp(15),
    alignItems: "center",
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: theme.raduis.lg,
    borderCurve: "continuous",
  },
  toast: {
    padding: theme.space.lg,
    paddingHorizontal: wp(10),
    borderRadius: theme.raduis.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.white,
  },
});
export default ImageScreen;
