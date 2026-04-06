export interface ListAndSegmentFormProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSyncShopify?: () => void;
  isSyncing?: boolean;
}
