export interface Column<T = any> {
  header: React.ReactNode;
  key: string;
  isNumeric?: boolean;
  width?: string;
  color?: string | any;
  icon?: React.ReactNode;
  subKey?: string;
  cell?: (row: T) => React.ReactNode;
}

export interface TablesProps<T = any> {
  columns: Column<T>[];
  rows: Record<string, any>[];
  heading?: string;
  headerPadding?: string;
  headerPaddingBlock?: string;
  cellPadding?: string;
  rowpadding?: string;
  pagePerRow?: boolean;
  pagination?: boolean;
  defaultPageSize?: number;
  expandedRows?: string[];
  onToggleExpand?: (id: string) => void;
  loading?: boolean;
}
