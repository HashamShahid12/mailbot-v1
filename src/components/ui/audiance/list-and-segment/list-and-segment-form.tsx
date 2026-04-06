import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { FlexibleDropdown } from "../../dropdown";
import SearchBar from "../../search-bar";
import type { ListAndSegmentFormProps } from "@/types/list-and-segment-form-props";
import TagDropdown2 from "../../dropdown/tag-dropdown2";
import UiButton from "@/components/ui/button";
import { useShop } from "@/store/shop-store";

const ListAndSegmentForm: React.FC<ListAndSegmentFormProps> = ({
  selectedType,
  onTypeChange,
  selectedTags,
  onTagsChange,
  searchTerm,
  onSearchTermChange,
  onSyncShopify,
  isSyncing,
}) => {
  const types = ["All Types", "Shopify", "Custom", "Archived"];
  const { shop } = useShop();

  const isSyncDisabled =
    shop?.customer_synched_status !== "COMPLETED" ||
    shop?.shopify_segments_synced_status === "PROCESSING" ||
    shop?.password_enabled ||
    shop?.plan?.type === "free";

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchTermChange("");
    onTagsChange([]);
    onTypeChange("All Types");
  };

  return (
    <>
      <Box px="6" py="8" _dark={{ bg: "gray.900" }}>
        <form onReset={handleReset}>
          <Flex flex="1" gap="4" align="center">
            {/* <SearchBar
              w="2xs"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchTermChange(e.target.value)
              }
            />

            <TagDropdown2
              options={[
                { label: "Tag 1", value: "tag1" },
                { label: "Tag 2", value: "tag2" },
                { label: "Tag 3", value: "tag3" },
              ]}
              selectedTags={selectedTags}
              onTagsChange={onTagsChange}
            /> */}

            <FlexibleDropdown
              border="sm"
              borderColor="blackAlpha.100"
              boxShadow="none"
              label={selectedType}
            >
              <Flex flexDirection="column">
                {types.map((type) => (
                  <Box
                    flexDirection="column"
                    key={type}
                    px="3"
                    py="2"
                    bg={selectedType === type ? "blue.400" : "transparent"}
                    borderLeft={selectedType === type ? "2lg" : "transparent"}
                    color={selectedType === type ? "blue.100" : "current"}
                    borderColor="blue.200"
                    _hover={{ bg: "gray.200", cursor: "button" }}
                    onClick={() => onTypeChange(type)}
                  >
                    {type}
                  </Box>
                ))}
              </Flex>
            </FlexibleDropdown>

            <Button
              variant="plain"
              type="reset"
              color="blue.200"
              _hover={{ color: "blue.100", textDecoration: "underline" }}
              _focus={{
                outline: "none",
              }}
            >
              Clear
            </Button>

            {selectedType === "Shopify" && onSyncShopify && (
              <UiButton
                uiVariant="solid"
                onClick={onSyncShopify}
                loading={isSyncing}
                disabled={isSyncDisabled}
                ml="auto"
              >
                Sync Shopify Segments
              </UiButton>
            )}
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default ListAndSegmentForm;
