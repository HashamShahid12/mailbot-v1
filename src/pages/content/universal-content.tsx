import { SearchBar } from "@/components/ui";
import PerformanceCard from "@/components/ui/analytics/deliverability/perfomance-card";
import UiButton from "@/components/ui/button";
import { TagMultiSelectDropdown } from "@/components/ui/dropdown/tag-multiselect-dropdown";
import { UiTab } from "@/components/ui/tabs";
import { UiText } from "@/components/ui/text";
import UiTextLink from "@/components/ui/text-link";
import { Tooltip } from "@/components/ui/tooltip";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FaListUl } from "react-icons/fa";
import { RiGalleryView } from "react-icons/ri";

const UniversalContent = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [content, setContent] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const hasFilter =
    search.trim() !== "" || selectedStatus.length > 0 || content.length > 0;

  const handelReset = () => {
    setSelectedStatus([]);
    setContent([]);
    setSearch("");
  };

  const device = [
    { label: "Desktop and mobile", value: "desktop-and-mobile" },
    { label: "Desktop only", value: "desktop" },
    { label: "Mobile only", value: "mobile" },
  ];
  const method = [
    { label: "Section", value: "section" },
    { label: "Text", value: "text" },
    { label: "Image", value: "image" },
    { label: "Button", value: "button" },
    { label: "Social Links", value: "social-links" },
    { label: "Split", value: "split" },
    { label: "Table", value: "table" },
    { label: "Product", value: "product" },
    { label: "Spacer", value: "spacer" },
    { label: "Drop Shadow", value: "drop-shadow" },
    { label: "Divider", value: "divider" },
    { label: "Header bar", value: "header-bar" },
    { label: "Review quote", value: "review-quote" },
    { label: "HTML", value: "html" },
    { label: "Video", value: "video" },
  ];
  return (
    <>
      <Box p="5" bg="white" borderBottom="sm" borderColor="gray.600">
        <UiText variant="heading2">Universal content</UiText>
      </Box>
      <Box mx="7" my="10">
        <Flex justify="space-between">
          <Flex gap="2">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <TagMultiSelectDropdown
              selected={selectedStatus}
              onChange={setSelectedStatus}
              searchBar={false}
              menuWidth="4xs"
              bg="white"
              checkbox={false}
              placeHolder="Device"
              options={device}
            />
            <TagMultiSelectDropdown
              selected={content}
              searchBar={false}
              onChange={setContent}
              menuWidth="4xs"
              placeHolder="Content"
              options={method}
            />
            {hasFilter && (
              <Button
                variant="plain"
                px="1"
                color="blue.200"
                _hover={{ color: "blue.100", textDecoration: "underline" }}
                _focus={{
                  outline: "none",
                }}
                onClick={handelReset}
              >
                Clear
              </Button>
            )}
          </Flex>
          <UiTab
            tabs={[
              {
                value: "gallery",
                label: (
                  <Tooltip
                    showArrow
                    content={
                      <Box>
                        <UiText fontWeight="semibold" color="white">
                          Gallery
                        </UiText>
                      </Box>
                    }
                    contentProps={{
                      borderRadius: "md",
                      p: 3,
                      textAlign: "center",
                      lineHeight: "1.5rem",
                    }}
                  >
                    <Icon as={RiGalleryView} boxSize="6" />
                  </Tooltip>
                ),
              },
              {
                value: "label",
                label: (
                  <Tooltip
                    showArrow
                    content={
                      <Box>
                        <UiText fontWeight="semibold" color="white">
                          List
                        </UiText>
                      </Box>
                    }
                    contentProps={{
                      borderRadius: "md",
                      p: 3,
                      textAlign: "center",
                      lineHeight: "1.5rem",
                    }}
                  >
                    <Icon as={FaListUl} boxSize="5" />
                  </Tooltip>
                ),
              },
            ]}
            defaultValue="gallery"
          />
        </Flex>
        {!hasFilter && (
          <Flex
            justify="center"
            align="center"
            direction="column"
            m="auto"
            maxW="lg"
            mt="20"
            textAlign="center"
          >
            <UiText variant="heading2" mb="3">
              Save time with universal content
            </UiText>
            <UiText
              color="gray.400"
              borderBottom="sm"
              borderColor="gray.100"
              pb="5"
            >
              Universal content lets you easily reuse blocks or sections, such
              as footers, in future emails.
            </UiText>
            <UiText my="5" color="gray.400">
              Select a section or block in a template, then click the ⭐️ icon.
              Your universal content will appear here.
            </UiText>
            <UiTextLink value="Learn more about universal content" icon />
          </Flex>
        )}
        {hasFilter && (
          <PerformanceCard
            border="none"
            shadow="none"
            bg="none"
            emptyTable={false}
          >
            <UiText variant="heading2">No results found</UiText>
            <UiText m="auto" mb="10" maxW="2xl" color="gray.400">
              Try adjusting your filters to find what you are looking for.
            </UiText>
            <UiButton uiVariant="solid" onClick={handelReset}>
              Clear filters
            </UiButton>
          </PerformanceCard>
        )}
      </Box>
    </>
  );
};

export default UniversalContent;
