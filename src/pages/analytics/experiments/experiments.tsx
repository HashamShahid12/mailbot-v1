import { SearchBar } from "@/components/ui";
import { ChannelDropDown } from "@/components/ui/analytics/drop-downs/channel-dropdown";
import { SignificantDropDown } from "@/components/ui/analytics/drop-downs/significant-dropdown";
import { TimeDropdown } from "@/components/ui/analytics/drop-downs/time-dropdown";
import { UiText } from "@/components/ui/text";
import { Box, Button, Flex, SegmentGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const toggleItems = [
  {
    label: "Campaigns",
    value: "React",
    width: "6rem",
  },
  {
    label: "Flow",
    value: "Vue",
    width: "4rem",
  },
];

export const Experiments = () => {
  const navigate = useNavigate();
  const tocampaign = () => {
    navigate("/campaigns");
  };
  return (
    <>
      <Box padding="16px 24px" borderBottom="1px solid rgb(221, 224, 224)">
        <UiText fontSize="2xl">Experiments</UiText>
      </Box>
      <Box padding="24px">
        <SegmentGroup.Root defaultValue="React" width="5">
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            items={toggleItems.map(({ label, value, width }) => ({
              value,
              label: (
                <Box gap="2" w={width} p=".5rem">
                  {label}
                </Box>
              ),
            }))}
            height="2.55rem"
          />
        </SegmentGroup.Root>
        <Flex gap={2} mb={4} pt="24px" wrap="wrap">
          <SearchBar placeholder="Search campaigns" w="17rem" />
          <TimeDropdown />
          <SignificantDropDown />
          <ChannelDropDown />
        </Flex>
      </Box>
      <Flex
        height="calc(50vh - 10px)"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Box textAlign="center">
          <UiText fontSize="xl" fontWeight="bold">
            No data available
          </UiText>
          <UiText fontSize="lg">Start a campaign A/B test</UiText>
          <Button p="4" mt={4} onClick={tocampaign}>
            Go to campaign
          </Button>
        </Box>
      </Flex>
    </>
  );
};
