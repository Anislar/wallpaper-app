export * from "@/components/filter-section/section-view";
export * from "@/components/filter-section/common-view";
export * from "@/components/filter-section/color-view";

export interface SectionProps {
  data: string[];
  filter: { [key: string]: string };
  setFilter: (filter: string, value: string) => void;
  filterName: "orders" | "orientations" | "colors" | "types";
}
