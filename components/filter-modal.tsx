import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { theme } from "@/constants/theme";
import { capitalize, hp, params } from "@/helpers/common";
import {
  SectionView,
  CommonViewSection,
  SectionProps,
  ColorSection,
} from "@/components/filter-section";
import { data } from "@/constants/data";

interface Sections {
  [key: string]: (props: SectionProps) => JSX.Element;
}

const sections: Sections = {
  orders: (props) => <CommonViewSection {...props} />,
  orientations: (props) => <CommonViewSection {...props} />,
  types: (props) => <CommonViewSection {...props} />,
  colors: (props) => <ColorSection {...props} />,
};

interface FilterModalProps {
  defaultFilter: params;
  modalRef: any;
  setFilter: (values: any) => void;
}
const FilterModal: FC<FilterModalProps> = ({
  modalRef,
  setFilter,
  defaultFilter,
}) => {
  const [filter, setFilterView] = useState<params>({
    orders: "",
    orientations: "",
    colors: "",
    types: "",
  });
  const onSelect = (filterName: string, value: string): void => {
    setFilterView((p) => ({ ...p, [filterName]: value }));
  };
  useEffect(() => {
    setFilterView({
      orders: defaultFilter.orders ?? "",
      orientations: defaultFilter.orientations ?? "",
      colors: defaultFilter.colors ?? "",
      types: defaultFilter.types ?? "",
    });
  }, [
    defaultFilter.colors,
    defaultFilter.orientations,
    defaultFilter.orders,
    defaultFilter.types,
  ]);

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={["75%"]}
      enablePanDownToClose
      backdropComponent={CustomBackgroundColor}>
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            const sectionView = sections[sectionName];
            const title = capitalize(sectionName);
            const sectionData = data.filters[sectionName];
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 100 + 100)
                  .springify()
                  .damping(11)}
                key={sectionName}>
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filter,
                    setFilter: (name, value) => onSelect(name, value),
                    filterName: sectionName as
                      | "orders"
                      | "orientations"
                      | "colors"
                      | "types",
                  })}
                />
              </Animated.View>
            );
          })}
          {/*Action */}
          <Animated.View
            entering={FadeInDown.delay(500).springify().damping(11)}
            style={styles.footer}>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setFilterView({
                  orders: "",
                  orientations: "",
                  colors: "",
                  types: "",
                });
                setFilter({
                  orders: "",
                  orientations: "",
                  colors: "",
                  types: "",
                });
              }}>
              <Text
                style={[
                  styles.textBtn,
                  { color: theme.colors.neutral("0.9") },
                ]}>
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.submitBtn}
              onPress={() => setFilter({ ...filter })}>
              <Text style={[styles.textBtn, { color: theme.colors.white }]}>
                Apply
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
export default FilterModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
    gap: theme.space.lg,
    paddingVertical: theme.space.md,
    paddingHorizontal: theme.space.xxxl,
  },
  filterText: {
    fontSize: hp(3),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral("0.8"),
    marginBottom: theme.space.xs,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space.md,
  },
  resetBtn: {
    flex: 1,
    backgroundColor: theme.colors.neutral("0.03"),
    padding: theme.space.md,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.raduis.md,
    borderCurve: "continuous",
    borderWidth: 2,
    borderColor: theme.colors.grayBG,
  },
  submitBtn: {
    flex: 1,
    backgroundColor: theme.colors.neutral("0.8"),
    padding: theme.space.md,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.raduis.md,
    borderCurve: "continuous",
  },
  textBtn: {
    fontSize: hp(1.8),
  },
});
const CustomBackgroundColor = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));
  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];
  return <Animated.View style={containerStyle} />;
};
