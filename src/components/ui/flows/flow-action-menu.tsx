import React, { useState } from "react";
import { NewDropDown } from "../dropdown/new-dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DrawerWrapper } from "../drawer";
import UiButton from "../button";
import { UiText } from "../text";
import { PrimitiveDialog } from "../dailog-model";
import FormField from "../input";
import { SelectableCardGroup } from "../selectable-card-group";
import { Box, Flex } from "@chakra-ui/react";
import { UiSelect } from "../select";
import UiLabel from "../UiLabel";
import type { FlowTableProps } from "@/types/user-type";
import { useNavigate } from "react-router-dom";

interface FlowActionMenuProps {
  FlowActionMenu?: any;
  selectedOption: string;
  setSelectedOption: (val: string) => void;
  flow: FlowTableProps;
}
const listItems = [
  { value: "created", label: "Created" },
  { value: "firstActive", label: "First Active" },
  { value: "lastActive", label: "Last Active" },
];
const FlowActionMenu: React.FC<FlowActionMenuProps> = ({
  selectedOption,
  setSelectedOption,
  flow,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editDetailsOpen, setEditDetailsOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [drawerDialogOpen, setDrawerDialogOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<string | undefined>();
  const navigate = useNavigate();

  return (
    <>
      <NewDropDown
        buttonTitle={<BsThreeDotsVertical />}
        p="2"
        links={[
          {
            title: "Customize",
            onClick: () => {
              navigate(`/createflow/create?type=${flow.type}`);
            },
          },
        ]}
      />
      <DrawerWrapper
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        title="Clone FLow"
        footer={[
          <UiButton
            key="clone"
            uiVariant="solid"
            onClick={(e) => {
              e.preventDefault();
              setDrawerDialogOpen(true);
              setIsDrawerOpen(false);
            }}
          >
            Continue
          </UiButton>,
          <UiButton
            key="cancel"
            uiVariant="outline"
            onClick={(e) => {
              e.preventDefault();
              setIsDrawerOpen(false);
            }}
          >
            Cancel
          </UiButton>,
        ]}
      >
        <Box p="3">
          <SelectableCardGroup
            value={selectedOption}
            onChange={setSelectedOption}
            options={[
              {
                value: "flyout",
                label: "Flyout",
                description: "The form slides from the edge of a page.",
              },
            ]}
          />
        </Box>
      </DrawerWrapper>

      <PrimitiveDialog
        open={drawerDialogOpen}
        onOpenChange={setDrawerDialogOpen}
        size="lg"
        title="Clone Flow"
        footer={
          <>
            <UiButton
              uiVariant="outline"
              onClick={() => setDrawerDialogOpen(false)}
            >
              Cancel
            </UiButton>
            <UiButton uiVariant="solid">Update Flow</UiButton>
          </>
        }
      >
        <FormField
          label="Clone Name"
          placeholder="e.g. Welcome series, Post purchase"
        />
        <Flex mt="7" gap="2" direction="column">
          <UiLabel textStyle="md" text="Trigger" />
          <UiSelect
            width="full"
            selectedItem={selectedList}
            items={listItems}
            searchBar
            onChange={(val) => setSelectedList(val)}
          />
        </Flex>
      </PrimitiveDialog>

      <PrimitiveDialog
        open={editDetailsOpen}
        onOpenChange={setEditDetailsOpen}
        size="lg"
        title="Edit details"
        footer={
          <>
            <UiButton
              uiVariant="outline"
              onClick={() => setEditDetailsOpen(false)}
            >
              Cancel
            </UiButton>
            <UiButton uiVariant="solid">Update Flow</UiButton>
          </>
        }
      >
        <FormField
          label="Name"
          placeholder="e.g. Welcome series, Post purchase"
        />
      </PrimitiveDialog>

      <PrimitiveDialog
        open={archiveDialogOpen}
        onOpenChange={setArchiveDialogOpen}
        size="lg"
        title="Archive Live Flow"
        footer={
          <>
            <UiButton
              uiVariant="outline"
              onClick={() => setArchiveDialogOpen(false)}
            >
              Cancel
            </UiButton>
            <UiButton uiVariant="solid">Archive</UiButton>
          </>
        }
      >
        <UiText mb="5">
          You are about to archive <strong>{flow?.name || "flow"}</strong>
        </UiText>
        <UiText>
          This flow is currently set to{" "}
          <strong>
            {flow.status === "draft"
              ? "Draft"
              : flow.status === "sent"
                ? "Active"
                : undefined}
          </strong>{" "}
          Archiving this flow will update all its action statuses to Draft and
          end any live A/B tests.
        </UiText>
      </PrimitiveDialog>
    </>
  );
};

export default FlowActionMenu;
