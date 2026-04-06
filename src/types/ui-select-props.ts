export interface SelectItem {
  label?: string;
  value: string;
  [key: string]: any;
}

export interface CustomSelectProps {
  items?: SelectItem[];
  size?: "sm" | "md" | "lg";
  width?: string;
  flex?: string;
  placeholder?: string | any;
  positioning?: any;
  label?: string;
  description?: string;
  bgTrigger?: string;
  background?: string;
  showLabel?: boolean;
  onChange?: (value: string) => void;
  defaultValue?: string;
  children?: React.ReactNode;
  borderStyle?: string;
  padding?: string;
  triggerPy?: string;
  triggerPx?: string;
  selectedItem?: string | any;
  onItemChange?: (type: string) => void;
  [key: string]: any;
  searchBar?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}
