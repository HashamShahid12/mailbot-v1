import type { ReactNode } from "react";

type TabItem = {
  value: string;
  label: string | ReactNode;
  icon?: ReactNode;
  href?: string;
};

export type TabsComponentProps = {
  tabs: TabItem[];
  defaultValue?: string;
  variant?:
    | "plain"
    | "outline"
    | "line"
    | "subtle"
    | "enclosed"
    | "minimal"
    | "column";
  noMarginLeft?: boolean;
  noTriggerBorders?: boolean;
  triggerBorderRadius?: string;
  columnBorderRightRadius?: string;
  triggerColor?: string;
  triggerFontWeight?: string | number;
  selectedColor?: string;
  selectedFontWeight?: string | number;
  onChange?: (val: string) => void;
  tabContent?: { [key: string]: ReactNode };
};
