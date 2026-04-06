import { Box, Flex, Text } from "@chakra-ui/react";
import Checkbox from "../../check-box";
import UiBox from "../../box";
import { UiText } from "../../text";
import FormField from "../../input";
import { useForm } from "react-hook-form";
import { FlexibleDropdown } from "../../dropdown";
import SearchBar from "../../search-bar";
import { FiTag } from "react-icons/fi";
import type React from "react";
import type {
  FormValues,
  ListAndSegmentFormProps,
} from "@/types/segment-builder-props";

const options = [
  { label: "Tag 1", value: "tag1" },
  { label: "Tag 2", value: "tag2" },
  { label: "Tag 3", value: "tag3" },
];

const TagInButton = ({
  label,
  onClose,
}: {
  label: string;
  onClose: () => void;
}) => (
  <Flex
    align="center"
    bg="gray.100"
    borderRadius="md"
    px="2"
    py="1"
    mr="1"
    gap="1"
    userSelect="none"
  >
    <Text fontSize="xs">{label}</Text>
    <Box
      as="span"
      cursor="pointer"
      onClick={(e) => {
        e.preventDefault();
        onClose();
      }}
      role="button"
      aria-label={`Remove ${label}`}
      _hover={{ color: "red.500" }}
      fontWeight="bold"
      lineHeight="1"
    >
      ×
    </Box>
  </Flex>
);

const SegmentBuilder: React.FC<ListAndSegmentFormProps> = ({
  selectedTags,
  onTagsChange,
}) => {
  const { register } = useForm<FormValues>({ mode: "onChange" });

  const handleTagClose = (value: string) => {
    onTagsChange(selectedTags.filter((v) => v !== value));
  };

  const handleCheckboxToggle = (value: string) => {
    onTagsChange(
      selectedTags.includes(value)
        ? selectedTags.filter((v) => v !== value)
        : [...selectedTags, value],
    );
  };
  return (
    <>
      <UiBox>
        <UiText variant="subheading">Segment builder</UiText>
        <UiText variant="caption">
          Segments allow you to track and analyze people who meet certain
          conditions.
        </UiText>
        <Flex mt="10" gap="4" direction="row" alignItems="end">
          <Box flex="1">
            <FormField
              type="text"
              label="Name"
              required
              register={register("text", {
                required: "Email is required",
              })}
            />
          </Box>
          <Box flex="1" w="full" maxW="full">
            <FlexibleDropdown
              border="sm"
              buttonWidth="full"
              menuWidth="full"
              borderColor="blackAlpha.100"
              boxShadow="none"
              label={
                <Flex align="center" gap="2">
                  <FiTag />
                  {selectedTags.length === 0 ? (
                    "Select Tags"
                  ) : (
                    <Flex wrap="wrap" gap="1" maxW="full" overflow="hidden">
                      {selectedTags.map((value) => {
                        const item = options.find((i) => i.value === value);
                        return (
                          <TagInButton
                            key={value}
                            label={item?.label || value}
                            onClose={() => handleTagClose(value)}
                          />
                        );
                      })}
                    </Flex>
                  )}
                </Flex>
              }
            >
              <Box p="3" pb="0">
                <SearchBar placeholder="Filter" />
              </Box>

              <Flex
                mt="4"
                borderTop="md"
                borderColor="gray.300"
                direction="column"
                bg="white"
              >
                {options.map((item) => (
                  <Checkbox
                    key={item.value}
                    px="4"
                    w="full"
                    py="2"
                    bg="gray.200"
                    cursor="pointer"
                    label={item.label}
                    checked={selectedTags.includes(item.value)}
                    onChange={() => handleCheckboxToggle(item.value)}
                    _checked={{ bg: "blue.400" }}
                  />
                ))}
              </Flex>
            </FlexibleDropdown>
          </Box>
        </Flex>
      </UiBox>
    </>
  );
};

export default SegmentBuilder;
