export interface FormCheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (name: string, checked: boolean) => void;
  errorMessage?: string;
  [key: string]: any;
}
