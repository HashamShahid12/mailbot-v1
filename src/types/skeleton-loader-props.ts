import { type StackProps } from "@chakra-ui/react";
import React from "react";

export interface SkeletonLoaderProps extends StackProps {
  showAvatar?: boolean;
  lineCount?: number;
  boxHeight?: string | number;
  loadingDuration?: number;
  children?: React.ReactNode;
  w?: string;
  h?: string;
  loading?: boolean;
}
