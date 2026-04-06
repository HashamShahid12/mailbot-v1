import type { UiButtonProps } from "./ui-button-props";

export interface NewDropDownLink {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  title: string;
  href?: string;
  subtitle?: string;
  color?: string;
  borderTop?: boolean;
  delIcon?: boolean;
}

export interface NewDropDownProps extends UiButtonProps {
  icon?: boolean;
  p?: string;
  w?: string;
  buttonTitle?: React.ReactNode;
  links?: NewDropDownLink[];
  children?: React.ReactNode;
  uiVariant?: UiButtonProps["uiVariant"];
}
