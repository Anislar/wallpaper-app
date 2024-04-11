import React from "react";

const ImageGridLazy = React.lazy(() => import("@/components/image-grid"));
const CategoriesLazy = React.lazy(() => import("@/components/categories"));
const ImageCardLazy = React.lazy(() => import("@/components/image-card"));
const FilterModalLazy = React.lazy(() => import("@/components/filter-modal"));

export {
  ImageGridLazy as ImageGrid,
  CategoriesLazy as Categories,
  ImageCardLazy as ImageCard,
  FilterModalLazy as FilterModal,
};
