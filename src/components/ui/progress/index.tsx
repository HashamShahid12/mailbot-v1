import type React from "react";
import { AbsoluteCenter, ProgressCircle, Box } from "@chakra-ui/react";
import type { progressProps } from "@/types/progress-props";

export const Progress: React.FC<progressProps> = ({
  value = 0,
  size = "sm",
}) => {
  return (
    <Box position="relative" display="inline-flex" alignItems="center">
      <ProgressCircle.Root size={size} value={value}>
        <ProgressCircle.Circle>
          <ProgressCircle.Track stroke="blackAlpha.300" />
          <ProgressCircle.Range />
        </ProgressCircle.Circle>
        <AbsoluteCenter>
          <ProgressCircle.ValueText />
        </AbsoluteCenter>
      </ProgressCircle.Root>
    </Box>
  );
};
