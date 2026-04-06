export interface NavItemProps {
  icon: any;
  label: string;
  path?: string;
  children?: { label: string; path?: string }[];
  py?: string;
}
