import { SearchBar } from "@/components/ui";
import { StatusDropdown } from "@/components/ui/dropdown/status-dropdown";
import { Flex } from "@chakra-ui/react";
import React from "react";
import TagDropdown2 from "../dropdown/tag-dropdown2";

interface CreateFlowFormProps {
  statusFilter: string | null;
  setStatusFilter: (val: string | null) => void;
  selectedTags: string[];
  setSelectedTags: (val: string[]) => void;
  searchFilter: string;
  setSearchFilter: (val: string) => void;
}

const CreateFlowForm: React.FC<CreateFlowFormProps> = ({
  statusFilter,
  setStatusFilter,
  selectedTags,
  setSelectedTags,
  searchFilter,
  setSearchFilter,
}) => {
  return (
    <>
      <Flex gap="2">
        <SearchBar
          placeholder="Search flows"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <TagDropdown2
          placeholder="Select one or more integrations"
          options={[{ label: "Shopify", value: "shopify" }]}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />
        <StatusDropdown
          label="Select a channel"
          borderStyle="normal"
          buttonWidth="2xs"
          menuWidth="2xs"
          selected={statusFilter}
          onChange={setStatusFilter}
          options={[
            { label: "All", value: "all" },
            { label: "SMS", value: "sms" },
            { label: "Email", value: "email" },
            { label: "Email and SMS", value: "emailAndSms" },
          ]}
        />
      </Flex>
    </>
  );
};

export default CreateFlowForm;
