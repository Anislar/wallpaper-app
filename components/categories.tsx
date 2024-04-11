import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import React from "react";
import { data } from "@/constants/data";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Animated, { FadeInRight } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CategoriesProps {
  active: string;
  handleChange: (category: string) => void;
}
const Categories = ({ active, handleChange }: CategoriesProps) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatListContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          isActive={active === item}
          handleChange={handleChange}
          title={item}
          index={index}
        />
      )}
    />
  );
};

interface CategoryItemProps {
  title: string;
  index: number;
  isActive: boolean;
  handleChange: (category: string) => void;
}
const CategoryItem = ({
  title,
  index,
  isActive,
  handleChange,
}: CategoryItemProps) => {
  const color = isActive ? theme.colors.white : theme.colors.neutral("0.8");
  const backgroundColor = isActive
    ? theme.colors.neutral("0.8")
    : theme.colors.white;

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}>
      <TouchableOpacity
        onPress={() => handleChange(!isActive ? title : "")}
        style={[styles.category, { backgroundColor }]}>
        <Text style={[styles.title, { color }]}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: wp(4),
    gap: theme.space.sm,
    paddingVertical: theme.space.xs,
  },
  category: {
    padding: theme.space.md,
    paddingHorizontal: theme.space.lg,
    borderWidth: 1,
    marginBottom: theme.space.xs,

    borderColor: theme.colors.grayBG,
    borderRadius: theme.raduis.lg,
    borderCurve: "continuous",
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium,
  },
});

export default Categories;
