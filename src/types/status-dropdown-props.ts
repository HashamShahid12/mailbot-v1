export interface StatusDropdownProps {
  selected: string | null;
  onChange: (value: string | null) => void;
  buttonWidth?: string;
  menuWidth?: string;
  label?: string;
  borderStyle?: string;
  options?: { label: string; value: string }[];
}
