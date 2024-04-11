import { theme } from "@/constants/theme";
import { capitalize, wp } from "@/helpers/common";
import { FC } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SectionProps } from ".";

export const CommonViewSection: FC<SectionProps> = ({
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
          const backgroundColor = isActive
            ? theme.colors.neutral("0.7")
            : theme.colors.white;
          const color = isActive
            ? theme.colors.white
            : theme.colors.neutral("0.7");
          return (
            <Pressable
              onPress={() => setFilter(filterName, item)}
              style={[styles.outlinedButton, { backgroundColor }]}
              key={`item_data_key${index}_${item}`}>
              <Text style={[styles.outlinedButtonText, { color }]}>
                {capitalize(item)}
              </Text>
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
  outlinedButton: {
    padding: theme.space.sm,
    paddingHorizontal: theme.space.lg,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.raduis.xs,
    borderCurve: "continuous",
  },
  outlinedButtonText: {
    fontSize: wp(3.5),
  },
});
