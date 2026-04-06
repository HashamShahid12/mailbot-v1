import type { TagLabelProps } from "@chakra-ui/react";

export interface UiLabelProps extends TagLabelProps {
  textStyle: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  text: string;
}
