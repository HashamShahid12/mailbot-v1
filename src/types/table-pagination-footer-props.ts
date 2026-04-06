export interface TablePaginationFooterProps {
  currentPage?: number;
  totalPages?: number;
  goToPrevious: () => void;
  goToNext: () => void;
}
