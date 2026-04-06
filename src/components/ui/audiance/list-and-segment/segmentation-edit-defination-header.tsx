import { Flex, Link, Icon, Box, Button } from "@chakra-ui/react";
import { UiText } from "../../text";
import UiLink from "../../link";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { RiAccountCircleFill } from "react-icons/ri";

interface SegmentationEditDefinitionHeaderProps {
  onSave?: () => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

const SegmentationEditDefinitionHeader = ({
  onSave,
  isLoading,
  isEditMode,
}: SegmentationEditDefinitionHeaderProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        px="5"
        py="2"
        bg="white"
        borderY="sm"
        justify="space-between"
        borderColor="gray.600"
        align="center"
      >
        <Flex gap="0" flexDirection="column">
          <Link
            color="blue.200"
            textDecorationStyle="dotted"
            _hover={{ color: "blue.500", textDecoration: "underline" }}
            _focus={{ outline: "none" }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/list-and-segment");
            }}
          >
            <GoArrowLeft />
            Lists & segments
          </Link>
          <UiText lineHeight="shorter" variant="heading2">
            Edit definition
          </UiText>
        </Flex>
        <Flex gap="2" align="center">
          <Icon as={RiAccountCircleFill} boxSize="5" />
          <Box width="6xs">
            <UiText lineHeight="1" fontWeight="semibold">
              1
            </UiText>
            <UiText variant="caption">Segment profiles</UiText>
          </Box>
          <UiLink py="2" href="#">
            Preview details
          </UiLink>
          <UiLink href="#" py="2">
            Cancel
          </UiLink>
          <Button
            p="4"
            bg="black"
            borderRadius="md"
            fontWeight="medium"
            py="5"
            onClick={onSave}
            loading={isLoading}
          >
            {isLoading
              ? "Saving..."
              : isEditMode
                ? "Update segment"
                : "Create segment"}
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default SegmentationEditDefinitionHeader;
