export interface Segment {
  id: string;
  name: string;
  type: string;
  status: string;
  [key: string]: any;
}

export interface SegmentsData {
  shopify_segments: Segment[];
  defaults_custom_segments: Segment[];
  archived: Segment[];
}
