const categories = [
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];
type Filters = {
  [key: string]: string[];
};
const filters: Filters = {
  colors: [
    "red",
    "orange",
    "yellow",
    "green",
    "turquoise",
    "blue",
    "pink",
    "white",
    "gray",
    "black",
    "brown",
  ],
  orientations: ["horizontal", "vertical"],
  orders: ["popular", "latest"],
  types: ["photo", "illustration", "vector"],
};

export const data = {
  categories,
  filters,
};
