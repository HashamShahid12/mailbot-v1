import type { SkeletonLoaderProps } from "@/types/skeleton-loader-props";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  HStack,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  showAvatar = true,
  lineCount = 1,
  boxHeight = "200px",
  loadingDuration = 1000,
  children,
  w,
  h,
  loading: externalLoading,

  ...stackProps
}) => {
  const [internalLoading, setInternalLoading] = useState(true);

  useEffect(() => {
    if (externalLoading === undefined) {
      const timeout = setTimeout(() => setInternalLoading(false), loadingDuration);
      return () => clearTimeout(timeout);
    }
  }, [loadingDuration, externalLoading]);

  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  if (isLoading) {
    return (
      <Stack gap="6" {...stackProps} textAlign="center">
        <HStack width="full">
          {showAvatar && <SkeletonCircle size="10" />}
          <SkeletonText height={h} width={w} noOfLines={lineCount} />
        </HStack>
        <Skeleton height={boxHeight} />
      </Stack>
    );
  }

  return <>{children}</>;
};

export default SkeletonLoader;
