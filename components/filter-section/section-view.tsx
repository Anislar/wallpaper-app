import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { FC, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SectionViewProps {
  title: string;
  content: ReactNode;
}

export const SectionView: FC<SectionViewProps> = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title} </Text>
      <View>{content}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    gap: theme.space.sm,
  },
  title: {
    fontSize: hp(2.4),
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.neutral("0.8"),
  },
});
