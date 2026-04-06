import React, { useState } from "react";
import {
  Box,
  Stack,
  Collapsible,
  HStack,
  Checkbox,
  Center,
  Image,
} from "@chakra-ui/react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";
import SkeletonLoader from "../skeletons";
import { CollapsibleIcon } from "../collapsible-icon";
import SearchBar from "../search-bar";
import Tables from "../table";
import AccountTagsSettingsActions from "./account-tags-settings-actions";
import { PrimitiveDialog } from "../dailog-model";
import FormField from "../input";

const column = [
  {
    header: "Tag",
    width: "30%",
    key: "tag",
  },
  { header: "Campaigns", width: "24%", key: "campaigns" },
  {
    header: "List/Segments",
    width: "24%",
    key: "list_segments",
  },
  {
    header: "Flows",
    width: "23%",
    key: "flows",
  },
  {
    header: "",
    width: "6%",
    key: "dropdown",
    isNumeric: true,
    cell: (row: any) => (
      <AccountTagsSettingsActions
        tag={{
          id: row.id,
          name: row.tag,
        }}
      />
    ),
  },
];

const items = [
  {
    id: "1",
    tag: "hello",
    campaigns: "0",
    list_segments: "0",
    flows: "1",
  },
];

const AccountTagsSettings = () => {
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [isSingleAssignment, setIsSingleAssignment] = useState(false);

  const filteredItems = items.filter((item) =>
    item.tag.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateGroup = () => {
    console.log("Creating Group:", { groupName, isSingleAssignment });
    setIsGroupOpen(false);
    setGroupName("");
    setTagInput("");
    setIsSingleAssignment(false);
  };

  const handleCreateTag = () => {
    console.log("Creating new tag:", newTagName);
    setIsAddTagOpen(false);
    setNewTagName("");
  };
  return (
    <Stack maxW="720px" gap={6}>
      <Stack direction="row" align="center" justify="space-between">
        <UiText variant="heading2">Tags</UiText>
        <UiButton uiVariant="solid" onClick={() => setIsGroupOpen(true)}>
          New tag group
        </UiButton>
      </Stack>
      <SearchBar
        placeholder="Search Tags"
        w="xs"
        py={5}
        value={searchQuery}
        onChange={(e: any) => setSearchQuery(e.target.value)}
      />

      <UiBox _dark={{ bg: "gray.950" }}>
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger asChild cursor="pointer">
            <HStack justify="space-between">
              <HStack gap="4">
                <Box
                  as={CollapsibleIcon}
                  boxSize="8"
                  bg="gray.600"
                  borderRadius="2xl"
                />
                <UiText fontWeight="semibold" variant="subheading">
                  Ungrouped tags
                </UiText>
              </HStack>
              <UiButton
                uiVariant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddTagOpen(true);
                }}
              >
                Add tag
              </UiButton>
            </HStack>
          </Collapsible.Trigger>
          <SkeletonLoader
            boxHeight={0}
            showAvatar={false}
            lineCount={3}
            w="full"
            h="9xs"
          >
            <Collapsible.Content mt="5">
              {filteredItems.length > 0 ? (
                <Tables
                  cellPadding="3"
                  headerPadding="3"
                  rowpadding="5"
                  columns={column}
                  rows={filteredItems}
                />
              ) : (
                <Center py={20} flexDirection="column">
                  <Box mb={6} opacity={0.4}>
                    <Image
                      src="/images/emptyApiKeyImage.svg"
                      alt="EmptyApiKeyImage"
                      width={260}
                      height={260}
                    />
                  </Box>

                  <UiText fontWeight="semibold" fontSize="2xl" mb={1}>
                    No tags created
                  </UiText>
                  <UiText color="gray.400" fontSize="xl">
                    Add a tag to this group to get started.
                  </UiText>
                </Center>
              )}
            </Collapsible.Content>
          </SkeletonLoader>
        </Collapsible.Root>
      </UiBox>

      <PrimitiveDialog
        open={isGroupOpen}
        onOpenChange={setIsGroupOpen}
        size="lg"
        title="Create tag group"
        footer={
          <>
            <UiButton uiVariant="outline" onClick={() => setIsGroupOpen(false)}>
              Cancel
            </UiButton>
            <UiButton
              uiVariant="solid"
              onClick={handleCreateGroup}
              disabled={groupName.trim() === ""}
            >
              Create tag group
            </UiButton>
          </>
        }
      >
        <Stack gap={5}>
          {/* Group Name Input */}
          <FormField
            label="Tag group name"
            labelmb={2}
            placeholder="Enter tag group name"
            value={groupName}
            onChange={(_, val) => setGroupName(val)}
          />

          {/* Tags Input with Inline Button */}
          <Stack gap={2}>
            <UiText fontWeight="medium" fontSize="sm">
              Tags
            </UiText>
            <HStack gap={2}>
              <Box flex={1}>
                <FormField
                  placeholder="Add tags..."
                  value={tagInput}
                  onChange={(_, val) => setTagInput(val)}
                />
              </Box>
              <UiButton
                uiVariant="outline"
                disabled={tagInput.trim() === ""}
                height="42px" // Match input height
              >
                Add tag
              </UiButton>
            </HStack>
          </Stack>

          {/* Checkbox Section */}
          <HStack align="flex-start" gap={3} py={2}>
            <Checkbox.Root
              checked={isSingleAssignment}
              onCheckedChange={(e) => setIsSingleAssignment(!!e.checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label fontSize="sm" cursor="pointer" userSelect="none">
                Only allow one tag from this group to be assigned to an item
              </Checkbox.Label>
            </Checkbox.Root>
          </HStack>
        </Stack>
      </PrimitiveDialog>

      <PrimitiveDialog
        open={isAddTagOpen}
        onOpenChange={(open) => {
          setIsAddTagOpen(open);
          if (!open) setNewTagName(""); // Clear if closed
        }}
        size="md"
        title="Create Tag"
        footer={
          <>
            <UiButton
              uiVariant="outline"
              onClick={() => setIsAddTagOpen(false)}
            >
              Cancel
            </UiButton>
            <UiButton
              uiVariant="solid"
              onClick={handleCreateTag}
              disabled={newTagName.trim() === ""} // Disabled if empty
            >
              Create Tag
            </UiButton>
          </>
        }
      >
        <FormField
          label="Tag Name"
          labelmb={2}
          value={newTagName}
          onChange={(_, val) => setNewTagName(val)} // Fixed onChange
          placeholder="Enter tag name"
        />
      </PrimitiveDialog>
    </Stack>
  );
};

export default AccountTagsSettings;
