import React from "react";
import { PrimitiveDialog } from "../../dailog-model";
import UiButton from "../../button";
import { UiText } from "../../text";
import UiTextLink from "../../text-link";
import { IoOpenOutline } from "react-icons/io5";
import { Icon } from "@chakra-ui/react";

interface ListAndSegmentSuppressDialogProps {
  listandsegment: any;
  suppressDialogOpen: boolean;
  setSuppressDialogOpen: (open: boolean) => void;
}

const ListAndSegmentSuppressDialog: React.FC<
  ListAndSegmentSuppressDialogProps
> = ({ suppressDialogOpen, setSuppressDialogOpen, listandsegment }) => {
  const label =
    listandsegment?.listandsegmenttype === "Segment"
      ? isNaN(Number(listandsegment?.listandsegmentname))
        ? `(${listandsegment?.listandsegmentname})`
        : `(Engaged ${listandsegment?.listandsegmentname} Days)`
      : `${listandsegment?.listandsegmentname} List`;
  const member = listandsegment?.members || 0;

  return (
    <>
      <PrimitiveDialog
        onOpenChange={() => setSuppressDialogOpen(false)}
        open={suppressDialogOpen}
        size="xl"
        title={`Bulk suppress ${label}`}
        footer={
          <>
            <UiButton uiVariant="outline">Cancel</UiButton>
            <UiButton uiVariant="outline"> Create sunset flow</UiButton>
            <UiButton uiVariant="danger">Bulk suppress</UiButton>
          </>
        }
      >
        <UiText my="5">
          Are you sure you want to suppress <strong>{member}</strong> profile
          from receiving email marketing? You may unsuppress them at any time,
          but must wait 90 days from today to suppress them again.
        </UiText>
        <UiText my="3">
          To avoid revenue risk, consider a sunset flow to re-engage inactive
          customers before suppressing.
          <UiTextLink
            display="inline"
            value="Learn how to create a sunset flow"
          >
            <Icon as={IoOpenOutline} boxSize="6" />
          </UiTextLink>
        </UiText>
      </PrimitiveDialog>
    </>
  );
};

export default ListAndSegmentSuppressDialog;
