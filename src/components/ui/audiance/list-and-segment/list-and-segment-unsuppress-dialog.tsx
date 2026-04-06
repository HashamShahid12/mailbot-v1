import React from "react";
import { PrimitiveDialog } from "../../dailog-model";
import UiButton from "../../button";
import { UiText } from "../../text";
import UiTextLink from "../../text-link";
import { IoOpenOutline } from "react-icons/io5";
import { Icon } from "@chakra-ui/react";

interface ListAndSegmentUnsuppressDialogProps {
  listandsegment: any;
  unsuppressDialogOpen: boolean;
  setUnsuppressDialogOpen: (open: boolean) => void;
}

const ListAndSegmentUnsuppressDialog: React.FC<
  ListAndSegmentUnsuppressDialogProps
> = ({ unsuppressDialogOpen, setUnsuppressDialogOpen, listandsegment }) => {
  const label =
    listandsegment?.listandsegmenttype === "Segment"
      ? isNaN(Number(listandsegment?.listandsegmentname))
        ? `(${listandsegment?.listandsegmentname})`
        : `(Engaged ${listandsegment?.listandsegmentname} Days)`
      : `${listandsegment?.listandsegmentname} List`;

  return (
    <>
      <PrimitiveDialog
        onOpenChange={() => setUnsuppressDialogOpen(false)}
        open={unsuppressDialogOpen}
        size="xl"
        title={`Bulk unsuppress ${label}`}
        footer={
          <>
            <UiButton uiVariant="outline">Cancel</UiButton>
            <UiButton uiVariant="solid">Bulk unsuppress</UiButton>
          </>
        }
      >
        <UiText my="5">
          Remove any manual suppression associated with profiles in this
          segment. If profiles were suppressed due to a deliverability block, or
          due to unsubscribing from email, they will remain suppressed and
          unreachable{" "}
          <UiTextLink display="inline" value="Learn more">
            <Icon as={IoOpenOutline} boxSize="6" />
          </UiTextLink>
        </UiText>
        <UiText fontWeight="semibold" my="3">
          This action will only unsuppress profiles that are currently in this
          segment. Any new members that join after you take this action will not
          be impacted.
        </UiText>
      </PrimitiveDialog>
    </>
  );
};

export default ListAndSegmentUnsuppressDialog;
