export interface SidebarItem {
  label: string;
  icon: any;
  path?: string;
  children?: {
    label: string;
    path?: string;
  }[];
  py?: string;
}
