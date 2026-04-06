export interface SegmentConditionDto {
  operator: string;
  item: string;
}

export interface SegmentDefinitionDto {
  match_all?: SegmentConditionDto[];
  match_any?: SegmentConditionDto[];
}

export interface SegmentationEditDefinitionProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  initialName?: string;
  initialDefinition?: SegmentDefinitionDto;
  onDefinitionChange?: (definition: SegmentDefinitionDto) => void;
}
