import { UiSelect } from "@/components/ui/select";
import { UiText } from "@/components/ui/text";
import { Button, Flex } from "@chakra-ui/react";

export const status = [
  { label: "All Statuses", value: "all-statuses" },
  { label: "All success codes", value: "all-success-codes" },
  { label: "200", value: "200" },
  { label: "201", value: "201" },
  { label: "202", value: "202" },
  { label: "204", value: "204" },
  { label: "All failed codes", value: "all-failed-codes" },
  { label: "All 4xx codes", value: "all-4xx-codes" },
  { label: "400", value: "400" },
  { label: "401", value: "401" },
  { label: "403", value: "403" },
  { label: "404", value: "404" },
  { label: "422", value: "422" },
  { label: "429", value: "429" },
  { label: "All 5xx codes", value: "all-5xx-codes" },
  { label: "500", value: "500" },
  { label: "502", value: "502" },
];

export const time = [
  { label: "Last 30 minutes", value: "last-30-minutes" },
  { label: "Last 3 hours", value: "last-3-hours" },
  { label: "Last 24 hours", value: "last-24-hours" },
  { label: "Last 3 days", value: "last-3-days" },
  { label: "Last 7 days", value: "last-7-days" },
  { label: "Last 30 days", value: "last-30-days" },
  { label: "Last 90 days", value: "last-90-days" },
  { label: "Last 180 days", value: "last-180-days" },
];

const DeveloperToolsDashboardForm = () => {
  return (
    <>
      <form>
        <Flex gap="2">
          <UiSelect
            width="3xs"
            placeholder="All endpoints"
            bgTrigger="white"
            searchBar
          >
            <UiText p="2" borderTop="sm" borderColor="gray.300">
              No options available
            </UiText>
          </UiSelect>
          <UiSelect
            width="3xs"
            items={status}
            defaultValue="all-statuses"
            searchBar
            bgTrigger="white"
            placeholder="All Statuses"
          />
          <UiSelect
            width="3xs"
            items={time}
            defaultValue="last-24-hours"
            bgTrigger="white"
            placeholder="Select time range"
          />
          <Button
            variant="plain"
            type="reset"
            color="blue.200"
            _hover={{ color: "blue.100", textDecoration: "underline" }}
            _focus={{
              outline: "none",
            }}
          >
            Clear
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default DeveloperToolsDashboardForm;
