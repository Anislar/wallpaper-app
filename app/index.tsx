import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";

import { wp, hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.bgImage}
        resizeMode="cover"
      />
      {/** Linear gradient */}
      <Animated.View
        entering={FadeInDown.duration(600)}
        style={{
          flex: 1,
        }}>
        <LinearGradient
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
        />
        {/** Content */}
        <View style={styles.contentContainer}>
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={styles.title}>
            Pixels
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).springify()}
            style={styles.punchline}>
            Every Pixels Tells a Story
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <TouchableOpacity
              onPress={() => router.push("/home/")}
              style={styles.startButton}>
              <Text style={styles.startText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  gradient: {
    width: wp(100),
    height: hp(60),
    bottom: 0,
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: theme.space.lg,
  },
  title: {
    fontSize: hp(7),
    color: theme.colors.neutral("0.9"),
    fontWeight: theme.fontWeights.bold,
  },
  punchline: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: theme.space.md,
    fontWeight: theme.fontWeights.medium,
  },
  startButton: {
    marginBottom: theme.space.md,
    backgroundColor: theme.colors.neutral("0.9"),
    padding: theme.space.md,
    paddingHorizontal: 90,
    borderRadius: theme.raduis.xl,
    borderCurve: "continuous",
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(2.5),
    fontWeight: theme.fontWeights.medium,
    letterSpacing: 1,
  },
});
export default WelcomeScreen;
