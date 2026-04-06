import { Flex, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchBar from "@/components/ui/search-bar";
import { TagMultiSelectDropdown } from "@/components/ui/dropdown/tag-multiselect-dropdown";
import { status } from "./developer-tools-dashboard-form";
import { RadioDropdown } from "@/components/ui/dropdown/radio-dropdown";
import { NewDropDown } from "@/components/ui/dropdown/new-dropdown";
import { CiFilter } from "react-icons/ci";

const method = [
  { label: "GET", value: "get" },
  { label: "POST", value: "post" },
  { label: "PUT", value: "put" },
  { label: "PATCH", value: "patch" },
  { label: "DELETE", value: "delete" },
];

const source = [
  { label: "Mailbot onsite tracking", value: "onsite", subtitle: "X75rxx" },
  { label: "Mailbot mobile tracking", value: "mobile", subtitle: "X75rxx" },
  { label: "Other", value: "other", subtitle: "X75rxx" },
];

const revision = [
  { label: "v2025-07-15.pre", value: "v2025-07-15.pre", badge: "Beta" },
  { label: "v2025-07-15", value: "v2025-07-15", badge: "Stable" },
  { label: "v2025-04-15.pre", value: "v2025-04-15.pre", badge: "Beta" },
  { label: "v2025-04-15", value: "v2025-04-15" },
  { label: "v2025-01-15.pre", value: "v2025-01-15.pre", badge: "Beta" },
  { label: "v2025-01-15", value: "v2025-01-15" },
  { label: "v2024-10-15.pre", value: "v2024-10-15.pre", badge: "Beta" },
  { label: "v2024-10-15", value: "v2024-10-15" },
  { label: "v2024-07-15.pre", value: "v2024-07-15.pre", badge: "Beta" },
  { label: "v2024-07-15", value: "v2024-07-15" },
  { label: "v2024-06-15", value: "v2024-06-15" },
  { label: "v2024-05-15.pre", value: "v2024-05-15.pre", badge: "Beta" },
  { label: "v2024-05-15", value: "v2024-05-15" },
  { label: "v2024-02-15", value: "v2024-02-15" },
  { label: "v2023-12-15", value: "v2023-12-15" },
  { label: "v2023-10-15", value: "v2023-10-15" },
  { label: "v2023-09-15", value: "v2023-09-15" },
  { label: "v2023-08-15.pre", value: "v2023-08-15.pre", badge: "Beta" },
  { label: "v2023-08-15", value: "v2023-08-15" },
  { label: "v2023-07-15", value: "v2023-07-15" },
  { label: "v2023-06-15", value: "v2023-06-15" },
  { label: "v2023-02-22", value: "v2023-02-22" },
  { label: "v2023-01-24", value: "v2023-01-24" },
  { label: "v2022-10-17", value: "v2022-10-17" },
];

const DeveloperToolsLogsForm: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string[]>([]);
  const [selectedRevision, setSelectedRevision] = useState<string[]>([]);
  const [selectedRadio, setSelectedRadio] = useState<string[]>([]);

  const showRevisionInline = useBreakpointValue({ base: false, "4xl": true });
  const showSourceInline = useBreakpointValue({ base: false, "3xl": true });
  const showMethodInline = useBreakpointValue({ base: false, "2xl": true });
  const showTimeInline = useBreakpointValue({ base: false, xl: true });
  const showCodeInline = useBreakpointValue({ base: false, lg: true });
  const shouldShowDropdown =
    !showRevisionInline ||
    !showSourceInline ||
    !showMethodInline ||
    !showTimeInline ||
    !showCodeInline;

  return (
    <>
      <Flex gap="2">
        <SearchBar w="3xs" />
        {showCodeInline && (
          <TagMultiSelectDropdown
            selected={selectedStatus}
            onChange={setSelectedStatus}
            placeHolder="Status code"
            options={status}
          />
        )}
        {showTimeInline && (
          <RadioDropdown
            options={[
              { label: "Last 30 minutes", value: "30-minutes" },
              { label: "Last 3 hours", value: "3-hours" },
              { label: "Last 24 hours", value: "24-hours" },
              { label: "Last 3 days", value: "3-days" },
              { label: "Last 7 days", value: "7-days" },
            ]}
            selected={selectedRadio}
            onChange={setSelectedRadio}
            menuWidth="5xs"
            defaultValue="24-hours"
            placeHolder="Last 24 hours"
          />
        )}
        {showMethodInline && (
          <TagMultiSelectDropdown
            selected={selectedMethod}
            onChange={setSelectedMethod}
            placeHolder="Method"
            menuWidth="fit"
            searchBar={false}
            options={method}
          />
        )}
        {showSourceInline && (
          <TagMultiSelectDropdown
            selected={selectedSource}
            onChange={setSelectedSource}
            placeHolder="Source"
            options={source}
          />
        )}
        {showRevisionInline && (
          <TagMultiSelectDropdown
            selected={selectedRevision}
            onChange={setSelectedRevision}
            placeHolder="Revision"
            options={revision}
            bg="white"
          />
        )}
      </Flex>
      {shouldShowDropdown && (
        <NewDropDown ml="2" buttonTitle={<CiFilter />} p="2">
          <Flex direction="column" p="2" gap="2">
            {!showCodeInline && (
              <TagMultiSelectDropdown
                selected={selectedStatus}
                buttonWidth="full"
                onChange={setSelectedStatus}
                placeHolder="Status code"
                options={status}
              />
            )}
            {!showTimeInline && (
              <RadioDropdown
                options={[
                  { label: "Last 30 minutes", value: "30-minutes" },
                  { label: "Last 3 hours", value: "3-hours" },
                  { label: "Last 24 hours", value: "24-hours" },
                  { label: "Last 3 days", value: "3-days" },
                  { label: "Last 7 days", value: "7-days" },
                ]}
                selected={selectedRadio}
                onChange={setSelectedRadio}
                menuWidth="5xs"
                buttonWidth="full"
                defaultValue="24-hours"
                placeHolder="Last 24 hours"
              />
            )}
            {!showMethodInline && (
              <TagMultiSelectDropdown
                selected={selectedMethod}
                onChange={setSelectedMethod}
                placeHolder="Method"
                buttonWidth="full"
                menuWidth="fit"
                searchBar={false}
                options={method}
              />
            )}
            {!showSourceInline && (
              <TagMultiSelectDropdown
                selected={selectedSource}
                onChange={setSelectedSource}
                placeHolder="Source"
                buttonWidth="full"
                options={source}
              />
            )}
            {!showRevisionInline && (
              <TagMultiSelectDropdown
                selected={selectedRevision}
                onChange={setSelectedRevision}
                buttonWidth="full"
                placeHolder="Revision"
                options={revision}
                bg="white"
              />
            )}
          </Flex>
        </NewDropDown>
      )}
    </>
  );
};

export default DeveloperToolsLogsForm;
