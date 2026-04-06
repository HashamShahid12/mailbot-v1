import { FormField } from "@/components/ui";
import UiButton from "@/components/ui/button";
import { PrimitiveDialog } from "@/components/ui/dailog-model";
import { NewDropDown } from "@/components/ui/dropdown/new-dropdown";
import type React from "react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export interface ImagesLibraryActionMenuProps {
  ImagesLibraryAction?: any;
}

const ImagesLibraryActionMenu: React.FC<ImagesLibraryActionMenuProps> = ({
  ImagesLibraryAction,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const menuItems = [
    {
      title: "Rename",
      onClick: () => {
        setOpen(true);
        setInputValue(ImagesLibraryAction?.imageName);
      },
    },
    {
      title: "Preview",
      onClick: () => {
        if (ImagesLibraryAction?.imageUrl) {
          window.open(ImagesLibraryAction.imageUrl, "_blank");
        }
      },
    },
    { title: "Delete", color: "red", borderTop: true },
  ];
  return (
    <>
      <NewDropDown
        p="2"
        buttonTitle={<BsThreeDotsVertical />}
        links={menuItems}
      />
      <PrimitiveDialog
        onOpenChange={() => setOpen(false)}
        open={open}
        size="xl"
        title="Edit Image Name"
        footer={
          <>
            <UiButton uiVariant="outline" onClick={() => setOpen(false)}>
              Cancel
            </UiButton>
            <UiButton
              uiVariant="solid"
              onClick={() => {
                setOpen(false);
              }}
            >
              Update Image
            </UiButton>
          </>
        }
      >
        <FormField label="Image name" type="text" defaultValue={inputValue} />
      </PrimitiveDialog>
    </>
  );
};

export default ImagesLibraryActionMenu;
