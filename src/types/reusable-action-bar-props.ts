export interface ReusableActionBarProps {
  itemCount?: number;
  onDelete?: () => void;
  onAdd?: () => void;
  onRemove?: () => void;
  checked?: boolean;
  onReset?: () => void;
}
