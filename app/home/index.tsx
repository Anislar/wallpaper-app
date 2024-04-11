import { Suspense, useCallback, useRef, useState } from "react";
import {
  Pressable,
  Text,
  ScrollView,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { ImageGrid, Categories, FilterModal } from "@/components";
import { theme } from "@/constants/theme";
import { hp, params, wp } from "@/helpers/common";
import useFetch from "@/hooks/useFetch";
import useDebounce from "@/hooks/useDebounce";
import { styles } from "./style";
import Skeleton from "@/components/skeleton";
import { useRouter } from "expo-router";

const LoadingImageGrid = () => (
  <View style={styles.loading}>
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton
        key={`img_grid-${index}`}
        width={wp(40)}
        height={hp(35)}
        style={{
          borderRadius: wp(2),
        }}
      />
    ))}
  </View>
);

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  type SearchParams = {
    q: string;
    page: number;
    category: string;
    orders: string;
    orientations: string;
    colors: string;
    types: string;
    [key: string]: string | number; // Add index signature
  };
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);

  const [params, setParams] = useState<SearchParams>({
    q: "",
    page: 1,
    category: "",
    orders: "",
    orientations: "",
    colors: "",
    types: "",
  });
  const inputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const debounceSearch = useDebounce(params.q, 500);
  const router = useRouter();

  const handleChangeCategory = async (category: string) => {
    inputRef.current?.clear();
    inputRef.current?.blur();
    setParams((p) => ({ ...p, q: "", page: 1, category }));
  };

  const handleSearch = useCallback((text: string) => {
    if (text === "") {
      inputRef.current?.clear();
      inputRef.current?.blur();
      setParams((p) => ({ ...p, q: "", page: 1, category: "" }));
    } else setParams((p) => ({ ...p, q: text, page: 1 }));
  }, []);

  const { data, status } = useFetch({
    params: {
      q: params.q !== "" ? debounceSearch : "",
      page: params.page,
      category: params.category,
      order: params.orders,
      orientation: params.orientations,
      type: params.types,
      colors: params.colors,
    },
  });
  const setFilter = useCallback((values: params) => {
    setParams((p) => ({
      ...p,
      ...values,
      page: 1,
    }));
    setModal(false);
  }, []);

  const setModal = (open: boolean) => {
    if (open) bottomSheetModalRef.current?.present();
    else bottomSheetModalRef.current?.close();
  };

  const handleScrollView = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentHeight = event.nativeEvent.contentSize.height;
      const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
      const scrollOffset = event.nativeEvent.contentOffset.y;
      const bottomPosition = contentHeight - scrollViewHeight;

      if (scrollOffset >= bottomPosition - 1) {
        if (!isEndReached) {
          //
          console.log("hereee to the end");

          setIsEndReached(true);
          setParams((p) => ({ ...p, page: p.page + 1 }));
        }
      } else if (isEndReached) {
        setIsEndReached(false);
      }
    },
    []
  );
  const handleScrollUp = useCallback(() => {
    scrollRef.current?.scrollTo({
      animated: true,
      y: 0,
    });
  }, []);
  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* Header */}

      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <TouchableOpacity onPress={() => setModal(true)}>
          <MaterialIcons
            name="filter-list"
            size={hp(4)}
            color={theme.colors.neutral("0.7")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <View style={styles.searchBarIcon}>
          <MaterialIcons
            name="search"
            size={wp(4.5)}
            color={theme.colors.neutral("0.4")}
          />
        </View>
        <TextInput
          ref={inputRef}
          onChangeText={(e) => {
            handleSearch(e);
          }}
          placeholder="Search for photos..."
          style={styles.searchBarInput}
        />
        {params.q && (
          <TouchableOpacity
            onPress={() => handleSearch("")}
            style={styles.searchBarClose}>
            <MaterialIcons
              name="close"
              size={wp(4.5)}
              color={theme.colors.neutral("0.6")}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* Categories */}
      <View style={styles.categories}>
        <Suspense
          fallback={
            <View
              style={{
                flexDirection: "row",
                gap: theme.space.md,
                justifyContent: "space-between",
              }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={`category_${index}`}
                  width={wp(20)}
                  height={hp(4)}
                  style={{
                    borderRadius: theme.raduis.lg,
                  }}
                />
              ))}
            </View>
          }>
          <Categories
            active={params.category}
            handleChange={handleChangeCategory}
          />
        </Suspense>
      </View>
      {/* Filters */}
      {params.colors || params.orientations || params.orders || params.types ? (
        // Rest of the code...
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}>
          {Object.keys(params)
            .filter((key) => params[key] !== "" && key !== "page")
            .map((key) => (
              <View key={key} style={styles.filterItem}>
                {key === "colors" ? (
                  <View
                    style={[
                      styles.filterColor,
                      {
                        backgroundColor: params[key],
                      },
                    ]}
                  />
                ) : (
                  <Text style={styles.filterText}>
                    {key}: {params[key]}
                  </Text>
                )}

                <TouchableOpacity
                  onPress={() => {
                    let newParams = { ...params };
                    newParams[key] = "";
                    setFilter({ ...newParams });
                  }}
                  style={styles.filterClose}>
                  <MaterialIcons
                    name="close"
                    size={wp(2)}
                    color={theme.colors.neutral("0.9")}
                  />
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>
      ) : null}
      <ScrollView
        onScroll={handleScrollView}
        scrollEventThrottle={10}
        ref={scrollRef}
        contentContainerStyle={{
          gap: theme.space.lg,
          paddingTop: theme.space.xl,
        }}>
        {/* Images masonry grid */}
        {["loading", "error"].includes(status) ? (
          <View style={styles.container_grid}>
            {status === "loading" ? (
              <LoadingImageGrid />
            ) : status === "error" ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: theme.space.xs,
                }}>
                <MaterialIcons
                  name="error"
                  size={hp(3.5)}
                  color={theme.colors.danger}
                />
                <Text style={styles.errorText}>Something went wrong!</Text>
              </View>
            ) : null}
          </View>
        ) : data.length === 0 ? (
          <View style={styles.container_grid}>
            <Text style={styles.emptyText}>No results found!</Text>
          </View>
        ) : (
          <Suspense fallback={<LoadingImageGrid />}>
            <ImageGrid router={router} data={data} />
          </Suspense>
        )}
      </ScrollView>
      {status === "loadingMore" && (
        <ActivityIndicator
          color={theme.colors.neutral("0.6")}
          style={{
            flex: 1,
            alignSelf: "center",

            marginVertical: hp(3),
          }}
          size="large"
        />
      )}
      {/* Bottom sheet */}
      <Suspense fallback={<View />}>
        <FilterModal
          defaultFilter={params}
          setFilter={setFilter}
          modalRef={bottomSheetModalRef}
        />
      </Suspense>
    </View>
  );
};

export default HomeScreen;
