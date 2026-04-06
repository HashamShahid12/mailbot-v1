import { UiText } from "../text";
import { Box, Button } from "@chakra-ui/react";

interface EmptyBoxProps {
  title?: string;
  subTitle?: string;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  imageSrc?: string;
}

export default function EmptyBox({
  title = "Recent Compaigns",
  subTitle = "Create a campaign",
  description = "Send a one-time targeted message to a select group of customers. Use campaigns for sales, promotions, and exclusive deals. Then, track your data here.",
  buttonLabel = "Create Flow",
  onButtonClick,
  imageSrc = "https://static-app.klaviyo.com/fender/11f9feeba06216fdd42c.svg",
}: EmptyBoxProps) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      shadow={"sm"}
    >
      {title && (
        <UiText px="8" py="6" textAlign="center" fontWeight="semibold">
          {title}
        </UiText>
      )}
      <Box p="1rem 2rem" textAlign="center">
        <img
          src={imageSrc}
          alt=""
          style={{ margin: "0 auto" }}
        />

        <UiText textAlign="center" fontWeight="medium">
          {subTitle}
        </UiText>
        <Box padding="0 15rem">
          <UiText textAlign="center" fontSize="sm">
            {description}
          </UiText>
        </Box>
        <Button
          p="4"
          borderRadius="md"
          fontWeight="medium"
          variant="plain"
          onClick={onButtonClick}
        >
          {buttonLabel}
        </Button>
      </Box>
    </Box>
  );
}
