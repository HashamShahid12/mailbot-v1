import type { InputProps } from "@chakra-ui/react";

export interface SearchBarProps extends InputProps {
  placeholder?: string;
  righttext?: string;
  w?: string | number;
  value?: string;
  h?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
