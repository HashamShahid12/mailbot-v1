import type { BoxProps } from "@chakra-ui/react";
import type React from "react";

export interface EmptyStateProps extends BoxProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageW?: string | number;
  imageH?: string | number;
  hideImage?: boolean;
}
