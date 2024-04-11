import { theme } from "@/constants/theme";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SectionProps } from ".";

export const ColorSection: FC<SectionProps> = ({
  data,
  filter,
  setFilter,
  filterName,
}) => {
  return (
    <View style={styles.flexRow}>
      {data &&
        data.map((item, index) => {
          const isActive = filter[filterName] === item;

          const borderColor = isActive
            ? theme.colors.neutral("0.4")
            : theme.colors.white;

          return (
            <Pressable
              onPress={() => setFilter(filterName, item)}
              key={`item_data_key${index}_${item}`}>
              <View style={[styles.colorWrapper, { borderColor }]}>
                <View style={[styles.color, { backgroundColor: item }]} />
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    gap: theme.space.md,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  colorWrapper: {
    padding: theme.space.xxs,
    borderRadius: theme.raduis.sm,
    borderWidth: 2,
    borderCurve: "continuous",
  },
  color: {
    height: 30,
    width: 40,
    borderRadius: theme.raduis.sm,
    borderCurve: "continuous",
  },
});
