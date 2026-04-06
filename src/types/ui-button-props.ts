import { type ButtonProps } from "@chakra-ui/react";

export interface UiButtonProps extends ButtonProps {
  uiVariant?: "plain" | "solid" | "outline" | "danger";
  loading?: boolean;
  loadingText?: string;
}
