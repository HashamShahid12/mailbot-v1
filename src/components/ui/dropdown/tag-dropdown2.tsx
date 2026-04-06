import { Box, Flex, Text } from "@chakra-ui/react";
import { FlexibleDropdown } from "./index";
import SearchBar from "../search-bar";
import Checkbox from "../check-box";
import UiLabel from "../UiLabel";

type Option = {
  label: string;
  value: string;
};

interface TagDropdownProps {
  options: Option[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  buttonWidth?: string;
  menuWidth?: string;
  placeholder?: string;
  label?: string;
}

const TagDropdown2: React.FC<TagDropdownProps> = ({
  options,
  selectedTags,
  onTagsChange,
  buttonWidth,
  placeholder = "Select Tags",
  menuWidth,
  label,
}) => {
  const handleTagClose = (value: string) => {
    onTagsChange(selectedTags.filter((v) => v !== value));
  };

  const handleCheckboxToggle = (value: string) => {
    onTagsChange(
      selectedTags.includes(value)
        ? selectedTags.filter((v) => v !== value)
        : [...selectedTags, value]
    );
  };
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

  return (
    <>
      <Box>
        {label && <UiLabel textStyle="md" mb="2" text={label} />}
        <FlexibleDropdown
          usePortal={false}
          border="sm"
          borderColor="blackAlpha.100"
          buttonWidth={buttonWidth}
          menuWidth={menuWidth}
          boxShadow="none"
          label={
            selectedTags.length === 0 ? (
              placeholder
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
            )
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
                checked={(selectedTags ?? []).includes(item.value)}
                onChange={() => handleCheckboxToggle(item.value)}
                _checked={{ bg: "blue.400" }}
              />
            ))}
          </Flex>
        </FlexibleDropdown>
      </Box>
    </>
  );
};

export default TagDropdown2;
