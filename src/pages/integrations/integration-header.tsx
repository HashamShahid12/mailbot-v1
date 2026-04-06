import UiButton from "@/components/ui/button";
import { NewDropDown } from "@/components/ui/dropdown/new-dropdown";
import { UiText } from "@/components/ui/text";
import { Box, Flex } from "@chakra-ui/react";

const IntegrationHeader = () => {
  return (
    <>
      <Flex
        p="5"
        justify="space-between"
        align="center"
        borderBottom="sm"
        borderColor="gray.200"
      >
        <Box>
          <UiText variant="heading2" fontWeight="semibold">
            Integrations
          </UiText>
          <UiText variant="caption" color="gray.400">
            Manage apps that sync your activity and data to and from Mailbot.
          </UiText>
        </Box>
        <Flex gap="2">
          <NewDropDown
            buttonTitle={<UiText fontWeight="semibold">Manage data</UiText>}
            icon
            links={[
              { title: "Import via CSV", href: "/integration/upload-csv" },
              { title: "Sftp data transfer", href: "/sftp" },
              { title: "Set up web tracking", href: "#" },
            ]}
          />
          <NewDropDown
            buttonTitle={<UiText fontWeight="semibold">Developers</UiText>}
            icon
            links={[
              {
                title: "Developer tools",
                subtitle: "Speed up your development workflow using our tools.",
                href: "/developer-tools",
              },
              {
                title: "Manage apps",
                subtitle: "Create and manage your applications.",
                href: "/manage-apps",
              },
            ]}
          />
          <UiButton uiVariant="solid" fontWeight="semibold">
            Add integrations
          </UiButton>
        </Flex>
      </Flex>
    </>
  );
};

export default IntegrationHeader;
