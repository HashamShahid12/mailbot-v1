import { ActionBar, Dialog, Portal, Flex } from "@chakra-ui/react";
import type { ReusableActionBarProps } from "@/types/reusable-action-bar-props";
import React, { useState } from "react";
import { UiText } from "../text";
import UiButton from "../button";

export const ReusableActionBar: React.FC<ReusableActionBarProps> = ({
  itemCount = 0,
  onDelete,
  onAdd,
  onRemove,
  checked = false,
  onReset,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    onReset?.();
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleDelete = () => {
    onDelete?.();
    handleCloseDialog();
  };
  return (
    <>
      <ActionBar.Root open={checked && !isDialogOpen}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content
              bg="black"
              p="2"
              color="white"
              w="xl"
              shadow="xl"
            >
              <Flex w="full" align="center" justify="space-between">
                <ActionBar.SelectionTrigger pl="2" fontSize="md" border="none">
                  {itemCount} selected
                </ActionBar.SelectionTrigger>
                <Flex gap="2">
                  <UiButton
                    uiVariant="solid"
                    border="sm"
                    borderColor="whiteAlpha.100"
                    onClick={onAdd}
                  >
                    Add Tags
                  </UiButton>
                  <UiButton
                    uiVariant="solid"
                    border="sm"
                    borderColor="whiteAlpha.100"
                    onClick={onRemove}
                  >
                    Remove Tags
                  </UiButton>
                  <UiButton uiVariant="danger" onClick={handleOpenDialog}>
                    Delete
                  </UiButton>
                </Flex>
              </Flex>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
      <Dialog.Root
        open={isDialogOpen}
        placement="center"
        onOpenChange={({ open }) => {
          if (!open) {
            setIsDialogOpen(false);
          }
        }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content p="8" w="5xl">
              <Dialog.Header fontSize="xl">
                <UiText variant="subheading">Delete segment</UiText>
              </Dialog.Header>
              <Dialog.Body>
                <Dialog.Description my="3">
                  <UiText variant="body">
                    You are about to delete{" "}
                    <strong> Engaged (60 Days). </strong>
                    Deleting this list may affect existing campaigns, forms, or
                    flows associated with it. This action cannot be undone.
                  </UiText>
                </Dialog.Description>
              </Dialog.Body>
              <Dialog.Footer>
                <UiButton uiVariant="outline" onClick={handleCloseDialog}>
                  Cancel
                </UiButton>
                <UiButton uiVariant="danger" onClick={handleDelete}>
                  Delete
                </UiButton>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
