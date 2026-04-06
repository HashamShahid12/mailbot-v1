import { Box, Flex } from "@chakra-ui/react";
import { UiText } from "../../text";
import { UiBadge } from "../../badge";
import { MdStars } from "react-icons/md";
import { UiTab } from "../../tabs";
import OverviewBenchmarks from "./overview";

const BenchmarksHeader = () => {
  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "businessPerformance", label: "Business Performance" },
    { value: "campaigns", label: "Campaigns" },
    { value: "flows", label: "Flows" },
    { value: "signUpForms", label: "Sign-up forms" },
  ];

  const tabContent = {
    overview: <OverviewBenchmarks />,
    businessPerformance: <div>Business Performance</div>,
    campaigns: <div>Campaigns</div>,
    flows: <div>Flows</div>,
    signUpForms: <div>Sign-up forms</div>,
  };
  return (
    <>
      <Box px="5" py="3" bg="white ">
        <Flex gap="3" align="center" _dark={{ bg: "gray.900" }}>
          <UiText variant="heading2">Benchmarks</UiText>
          <UiBadge icon={<MdStars />} status="achievement">
            Mailbot AI
          </UiBadge>
        </Flex>
      </Box>
      <UiTab
        tabs={tabs}
        defaultValue="overview"
        variant="minimal"
        tabContent={tabContent}
      />
    </>
  );
};

export default BenchmarksHeader;
