import { type JSX, type ReactNode } from "react";

export type Option = {
  label: string;
  value: string;
};

export interface FlexibleDropdownProps {
  label?: string | any;
  options?: Option[];
  icon?: JSX.Element;
  selectedValues?: string[];
  onChange?: (selected: string[]) => void;
  children?: ReactNode;
  menuWidth?: string | number;
  buttonWidth?: string | number;
  flex?: string;
  buttonHeight?: string | number;
  border?: string;
  borderStyle?: string;
  borderColor?: string;
  boxShadow?: string;
  background?: string;
  menuPadding?: string;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  usePortal?: boolean;
}
