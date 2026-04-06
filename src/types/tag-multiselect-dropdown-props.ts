export interface TagOption {
  label: string;
  value: string;
  subtitle?: string;
  badge?: string;
}

export interface TagMultiSelectDropdownProps {
  options?: TagOption[];
  defaultValue?: string;
  selected: string[];
  onChange: (selected: string[]) => void;
  buttonWidth?: string;
  label?: string;
  placeHolder?: string;
  menuWidth?: string;
  searchBar?: boolean;
  bg?: string;
  checkbox?: boolean;
}
