import { UiTab } from "@/components/ui/tabs";
import { UiText } from "@/components/ui/text";
import { Box, Flex, Icon, Link } from "@chakra-ui/react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import UiTextLink from "@/components/ui/text-link";
import UiLink from "@/components/ui/link";
import { LuExternalLink } from "react-icons/lu";
import DeveloperToolsDashboard from "./developer-tools-dashboard";
import DeveloperToolsLogs from "./developer-tools-logs";
import DeveloperToolsSampleData from "./developer-tools-sample-data";

const DeveloperTools = () => {
  const navigate = useNavigate();
  const tabs = [
    { value: "dashboard", label: "Dashboard" },
    { value: "logs", label: "Logs" },
    { value: "sampleData", label: "Sample Data" },
  ];

  const tabContent = {
    dashboard: <DeveloperToolsDashboard />,
    logs: <DeveloperToolsLogs />,
    sampleData: <DeveloperToolsSampleData />,
  };
  return (
    <>
      <Flex px="5" py="3" bg="white" justify="space-between" align="center">
        <Box>
          <Link
            color="blue.200"
            w="fit"
            mb="2"
            textDecorationStyle="dotted"
            _hover={{ color: "blue.500", textDecoration: "underline" }}
            _focus={{ outline: "none" }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/integrations");
            }}
          >
            <GoArrowLeft />
            Integrations
          </Link>
          <UiText variant="heading2">Developer Tools</UiText>
          <UiText variant="caption">
            Speed up your development workflow using these tools.{" "}
            <UiTextLink value="Read our docs" href="#" icon />
          </UiText>
        </Box>
        <UiLink fontWeight="semibold" href="#">
          <Icon as={LuExternalLink} boxSize="5" />
          Manage API keys
        </UiLink>
      </Flex>
      <UiTab
        tabs={tabs}
        defaultValue="dashboard"
        variant="minimal"
        tabContent={tabContent}
      />
    </>
  );
};

export default DeveloperTools;
