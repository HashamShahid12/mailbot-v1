import { Box, Image, Stack } from "@chakra-ui/react";
import { UiText } from "../text";
import type { EmptyStateProps } from "@/types/empty-state-props";

const EmptyState = ({
  title = "No data available",
  description = "There is nothing to show right now.",
  imageSrc = "/images/empty.svg",
  imageAlt = "Empty state",
  imageW = "220px",
  imageH = "220px",
  hideImage = false,
  ...rest
}: EmptyStateProps) => {
  return (
    <Box
      w="full"
      minH="320px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
      py={10}
      {...rest}
    >
      <Stack gap={4} align="center" textAlign="center" maxW="md">
        {!hideImage && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            w={imageW}
            h={imageH}
            objectFit="contain"
          />
        )}

        <Stack gap={1} align="center">
          {title ? (
            <UiText variant="heading2" fontSize="3xl" lineHeight="shorter">
              {title}
            </UiText>
          ) : null}
          {description ? (
            <UiText variant="subheading" color="gray.400">
              {description}
            </UiText>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
};

export default EmptyState;
