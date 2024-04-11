import { LinearGradient } from "expo-linear-gradient";
import { FC, useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";

interface SkeletonProps {
  width: number;
  height: number;
  style: any;
}

const Skeleton: FC<SkeletonProps> = ({ width, height, style }) => {
  const translateX = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }, [width]);
  return (
    <View
      style={StyleSheet.flatten([
        { width, height, backgroundColor: "rgba(0,0,0,0.12)" },
        style,
      ])}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX }],
            overflow: "hidden",
          },
        ]}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
          colors={["transparent", "rgba(0 ,0 ,0,0.05)", "transparent"]}
        />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default Skeleton;
