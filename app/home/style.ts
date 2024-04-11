import { StyleSheet } from "react-native";

import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.space.lg,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(3.5),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.neutral("0.9"),
  },
  searchBar: {
    marginHorizontal: wp(3.5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: theme.space.xs,
    paddingLeft: theme.space.md,
    borderRadius: theme.raduis.lg,
  },
  searchBarIcon: {
    padding: theme.space.xs,
  },
  searchBarInput: {
    flex: 1,
    borderRadius: theme.raduis.sm,
    paddingVertical: theme.space.xs,
    fontSize: hp(1.8),
  },
  searchBarClose: {
    backgroundColor: theme.colors.neutral("0.1"),
    padding: theme.space.xs,
    borderRadius: theme.raduis.sm,
  },
  categories: {},
  container_grid: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: theme.colors.danger,
    textAlign: "center",
    fontSize: hp(2.8),
  },
  emptyText: {
    color: theme.colors.neutral("0.6"),
    textAlign: "center",
    fontSize: hp(2.5),
  },

  // filters
  filters: {
    paddingHorizontal: wp(4),
    gap: theme.space.xl,
    height: hp(6),
    marginBottom: wp(6),
  },
  filterItem: {
    backgroundColor: theme.colors.grayBG,
    flexDirection: "row",
    borderRadius: theme.raduis.xs,
    padding: theme.space.sm,
    gap: theme.space.md,
    alignItems: "center",
    paddingHorizontal: theme.space.md,
  },
  filterText: {
    fontSize: hp(1.8),
  },
  filterClose: {
    backgroundColor: theme.colors.neutral("0.2"),
    padding: theme.space.xs,
    borderRadius: theme.raduis.xxs,
  },
  filterColor: {
    height: wp(6),
    width: wp(11),
    borderRadius: hp(2.5) / 2,
  },
  bottomSheet: {
    flex: 1,
    alignItems: "center",
  },
  loading: {
    flexWrap: "wrap",
    gap: theme.space.md,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
    alignItems: "center",
  },
});
