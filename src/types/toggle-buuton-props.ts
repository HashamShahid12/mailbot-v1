import { type RadioGroupItemProps } from "@chakra-ui/react";
import type { JSX } from "react";

export interface ToggleButtonProps extends RadioGroupItemProps {
  icon: JSX.Element;
  label: string;
}
