import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FormField } from "@/components/ui";
import { UiText } from "../../text";
import type { ListAndSegmentMenuProps } from "@/types/list-and-segment-menu-props";
import { NewDropDown } from "../../dropdown/new-dropdown";
import { PrimitiveDialog } from "../../dailog-model";
import UiButton from "../../button";
import ListAndSegmentMergeListDrawer from "./list-and-segment-merge-list-drawer";
import ListAndSegmentUnsuppressDialog from "./list-and-segment-unsuppress-dialog";
import ListAndSegmentSuppressDialog from "./list-and-segment-suppress-dialog";
import {
  syncSegment,
  archiveSegment,
  syncShopifySegmentMembers,
} from "@/api/segments";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";

export const ListAndSegmentMenu: React.FC<ListAndSegmentMenuProps> = ({
  listandsegment,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [isSuppressDialogOpen, setIsSuppressDialogOpen] = useState(false);
  const [isUnSuppressDialogOpen, setIsUnSuppressDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const label =
    listandsegment?.listandsegmenttype !== "List"
      ? isNaN(Number(listandsegment?.listandsegmentname))
        ? `(${listandsegment?.listandsegmentname})`
        : `(Engaged ${listandsegment?.listandsegmentname} Days)`
      : `${listandsegment?.listandsegmentname} List`;
  const typeLabel =
    listandsegment?.listandsegmenttype !== "List" ? "Segment" : "List";
  const title = `Edit ${typeLabel} Name`;

  const handleCopyId = () => {
    if (listandsegment?.id) {
      navigator.clipboard.writeText(listandsegment.id);
      toaster.create({
        title: "Copied",
        description: "Segment ID copied to clipboard",
        type: "success",
      });
    }
  };

  const handleSync = async () => {
    if (listandsegment?.id) {
      try {
        if (listandsegment.listandsegmenttype === "shopify") {
          await syncShopifySegmentMembers(
            listandsegment.id,
            listandsegment.query || "",
          );
        } else {
          await syncSegment(listandsegment.id);
        }

        toaster.create({
          title: "Sync Started",
          description: "Segment sync has been initiated",
          type: "success",
        });
      } catch (error) {
        toaster.create({
          title: "Sync Failed",
          description: "Could not start segment sync",
          type: "error",
        });
      }
    }
  };

  const handleArchive = async () => {
    if (listandsegment?.id) {
      try {
        await archiveSegment(listandsegment.id);
        toaster.create({
          title: "Archived",
          description: "Segment has been archived",
          type: "success",
        });
      } catch (error) {
        toaster.create({
          title: "Archive Failed",
          description: "Could not archive segment",
          type: "error",
        });
      }
    }
  };

  // Menu Options Configuration

  // 1. All Subscribers (Custom Segment Exception)
  const allSubscribersOptions = [
    {
      title: "Copy segment ID",
      onClick: handleCopyId,
    },
  ];

  // 2. Shopify Segments
  const shopifyOptions = [
    {
      title: "Sync",
      onClick: handleSync,
    },
    {
      title: "Copy segment ID",
      onClick: handleCopyId,
    },
  ];

  // 3. Custom Segments (General)
  const customOptions = [
    {
      title: "Edit",
      onClick: () => {
        if (listandsegment?.id) {
          navigate(`/segmentation-edit-definition?id=${listandsegment.id}`);
        }
      },
    },
    {
      title: "Archive",
      onClick: handleArchive,
      color: "red",
      borderTop: true,
      delIcon: true,
    },
    {
      title: "Sync",
      onClick: handleSync,
    },
    {
      title: "Copy segment ID",
      onClick: handleCopyId,
    },
  ];

  // 4. List Options (Existing)
  const isList = [
    { title: "Import Data" },
    {
      title: "Edit List Name",
      onClick: () => {
        setIsEditDialogOpen(true);
        setSelectedLabel(label);
      },
    },
    { title: "List settings" },
    {
      title: "Merge List",
      onClick: () => {
        setIsDrawerOpen(true);
      },
    },
    { title: "Linked Integrations" },
    { title: "View campaigns", href: "/campaigns" },
    { title: "View excluded people" },
    { title: "View sign-up forms" },
    { title: "Delete List", color: "red", borderTop: true, delIcon: true },
  ];

  // Determine which menu to show
  let menuItems = [];

  if (listandsegment?.listandsegmenttype === "List") {
    menuItems = isList;
  } else if (listandsegment?.listandsegmenttype === "default") {
    menuItems = allSubscribersOptions;
  } else if (listandsegment?.listandsegmenttype === "shopify") {
    menuItems = shopifyOptions;
  } else if (listandsegment?.listandsegmenttype === "custom") {
    menuItems = customOptions;
  } else {
    // Fallback for other types (e.g. Archived) or unknown
    menuItems = [
      {
        title: "Copy segment ID",
        onClick: handleCopyId,
      },
    ];
  }

  return (
    <>
      <NewDropDown
        p="2"
        buttonTitle={<BsThreeDotsVertical />}
        links={menuItems}
      />
      <PrimitiveDialog
        onOpenChange={() => setIsEditDialogOpen(false)}
        open={isEditDialogOpen}
        size="lg"
        title={title}
        footer={
          <>
            <UiButton uiVariant="outline">Cancel</UiButton>
            <UiButton uiVariant="solid">Save name</UiButton>
          </>
        }
      >
        <UiText my="3">Update the name of this {typeLabel}:</UiText>
        <FormField
          label="Name"
          type="text"
          required
          defaultValue={selectedLabel}
        />
      </PrimitiveDialog>

      <ListAndSegmentSuppressDialog
        listandsegment={listandsegment}
        suppressDialogOpen={isSuppressDialogOpen}
        setSuppressDialogOpen={setIsSuppressDialogOpen}
      />

      <ListAndSegmentUnsuppressDialog
        listandsegment={listandsegment}
        unsuppressDialogOpen={isUnSuppressDialogOpen}
        setUnsuppressDialogOpen={setIsUnSuppressDialogOpen}
      />

      <ListAndSegmentMergeListDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};
