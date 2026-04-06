import type { TextProps } from "@chakra-ui/react";
import type { SystemStyleObject } from "@chakra-ui/styled-system";

export type UiTextVariant =
  | "body"
  | "caption"
  | "heading"
  | "subheading"
  | "heading2";

export type UiTextProps = TextProps & {
  variant?: UiTextVariant;
  sx?: SystemStyleObject;
};
