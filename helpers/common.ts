import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
export const wp = (percentage: number) => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};

export const hp = (percentage: number) => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

export const getColumns = () => {
  if (deviceWidth >= 1024) {
    //desktop
    return 4;
  } else if (deviceWidth >= 768) {
    //tablet

    return 3;
  } else {
    // mobile
    return 2;
  }
};

export const getImageSize = (height: number, width: number) => {
  if (width > height) {
    //landscape
    return 250;
  } else if (width < height) {
    // portrait
    return 300;
  } else {
    // square
    return 200;
  }
};
export const capitalize = (str: string) => {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
};

export type params = {
  orders: string;
  orientations: string;
  colors: string;
  types: string;
};
