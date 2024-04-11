export const theme = {
  colors: {
    white: "#fff",
    black: "#000",
    grayBG: "#e5e5e5",
    danger: "#ff0000",

    neutral: (opacity: string) => ` rgba(10,10,10,${opacity})`,
  },
  fontWeights: {
    medium: "500" as "500",
    semibold: "600" as "600",
    bold: "700" as "700",
  },
  raduis: {
    xxs: 5,
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  },
  space: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 14,
    xl: 16,
    xxl: 18,
    xxxl: 20,
  },
};
