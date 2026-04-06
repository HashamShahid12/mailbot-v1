export interface FormValues {
  text: string;
}
export interface ListAndSegmentFormProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}
