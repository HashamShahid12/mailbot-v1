import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NewDropDown } from "../dropdown/new-dropdown";
import { PrimitiveDialog } from "../dailog-model";
import UiButton from "../button";
import { UiText } from "../text";
import FormField from "../input";

interface AccountTagsSettingsActionsProps {
  tag: {
    id: string;
    name: string;
  };
}

const AccountTagsSettingsActions: React.FC<AccountTagsSettingsActionsProps> = ({
  tag,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Initialize with the tag name
  const [tagName, setTagName] = useState(tag.name);

  // Logic: Disable if the name is empty OR if it hasn't changed from the original
  const isInvalid = tagName.trim() === "" || tagName === tag.name;

  const handleEdit = () => {
    console.log("Updating tag:", tagName);
    setEditOpen(false);
  };

  // Reset tagName when the dialog opens/closes to ensure it stays in sync
  const handleOpenChange = (open: boolean) => {
    setEditOpen(open);
    if (open) {
      setTagName(tag.name);
    }
  };

  const handleDelete = () => {
    // Logic to delete tag
    console.log("Deleting tag:", tag.id);
    setDeleteOpen(false);
  };

  return (
    <>
      <NewDropDown
        buttonTitle={<BsThreeDotsVertical />}
        p="2"
        links={[
          {
            title: "Edit",
            onClick: () => setEditOpen(true),
          },
          {
            title: "Delete",
            color: "red",
            onClick: () => setDeleteOpen(true),
          },
        ]}
      />

      <PrimitiveDialog
        open={editOpen}
        onOpenChange={handleOpenChange} // Use the new handler
        size="md"
        title="Edit Tag"
        footer={
          <>
            <UiButton uiVariant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </UiButton>
            <UiButton
              uiVariant="solid"
              onClick={handleEdit}
              disabled={isInvalid} // Button is disabled if no changes or empty
            >
              Update Tag
            </UiButton>
          </>
        }
      >
        <FormField
          label="Tag Name"
          labelmb={2}
          value={tagName}
          // FIX: Your FormField sends (name, value).
          // We use "_" for the name since we don't need it here.
          onChange={(_, val) => setTagName(val)}
          placeholder="Enter tag name"
        />
      </PrimitiveDialog>

      {/* 3. Delete Tag Dialog */}
      <PrimitiveDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        size="md"
        title="Delete Tag"
        footer={
          <>
            <UiButton uiVariant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </UiButton>
            <UiButton
              uiVariant="solid"
              bg="red.600"
              _hover={{ bg: "red.700" }}
              onClick={handleDelete}
            >
              Delete tag
            </UiButton>
          </>
        }
      >
        <UiText>
          You are about to delete this tag. This action will remove this tag
          from all associated items. Are you sure you want to delete the tag{" "}
          <strong>"{tag.name}"</strong>?
        </UiText>
      </PrimitiveDialog>
    </>
  );
};

export default AccountTagsSettingsActions;
