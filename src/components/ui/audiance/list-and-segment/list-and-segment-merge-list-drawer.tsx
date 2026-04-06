import React, { useState } from "react";
import { DrawerWrapper } from "../../drawer";
import { Box, Flex } from "@chakra-ui/react";
import { UiText } from "../../text";
import FormField from "../../input";
import { UiSelect } from "../../select";
import UiButton from "../../button";

export interface ListAndSegmentMergeListDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const items = [
  {
    label: "Email List",
    value: "email",
    description: "WM9Ecj",
  },
  {
    label: "Preview List",
    value: "preview",
    description: "XWyv6b",
  },
  {
    label: "SMS List",
    value: "sms",
    description: "Ruvg2g",
  },
];

const ListAndSegmentMergeListDrawer: React.FC<
  ListAndSegmentMergeListDrawerProps
> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const [sourceList, setSourceList] = useState<string | undefined>();
  const [destinationList, setDestinationList] = useState<string | undefined>();
  const filteredItemsForDestination = sourceList
    ? items.filter((item) => item.value !== sourceList)
    : items;

  return (
    <>
      <DrawerWrapper
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        title="Merge lists"
        footer={[
          <UiButton key="merge" uiVariant="solid">
            Merge
          </UiButton>,
          <UiButton
            key="cancel"
            uiVariant="outline"
            onClick={() => setIsDrawerOpen(false)}
          >
            Cancel
          </UiButton>,
        ]}
      >
        <Flex flexDirection="column" gap="8" p="5">
          <UiText>
            Profiles on multiple lists will appear in the destination list once.
            This action will not trigger any flows or double opt-in emails, nor
            modify any profile data.
          </UiText>
          <Box>
            <FormField title="Source lists to merge" input={false} required />
            <UiText color="gray.400">
              All profiles from this list will merge into your destination list.
              Select up to 5 lists.
            </UiText>
            <Box mt="1">
              <UiSelect
                searchBar
                width="full"
                selectedItem={destinationList}
                items={filteredItemsForDestination}
                onChange={(value) => setDestinationList(value)}
              />
            </Box>
          </Box>
          <Box>
            <FormField
              title="Destination list to merge into"
              input={false}
              required
            />
            <UiText color="gray.400">
              All profiles from your source lists will be added to this list.
            </UiText>
            <Box mt="1">
              <UiSelect
                searchBar
                width="full"
                items={items}
                selectedItem={sourceList}
                onChange={(value) => setSourceList(value)}
              />
            </Box>
          </Box>
        </Flex>
      </DrawerWrapper>
    </>
  );
};

export default ListAndSegmentMergeListDrawer;
