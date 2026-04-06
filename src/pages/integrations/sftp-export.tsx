import PerformanceCard from "@/components/ui/analytics/deliverability/perfomance-card";
import UiBox from "@/components/ui/box";
import UiLink from "@/components/ui/link";
import PopoverMenu from "@/components/ui/popover";
import { UiText } from "@/components/ui/text";
import { Box, Flex, Icon, Stack, Switch } from "@chakra-ui/react";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { LuExternalLink } from "react-icons/lu";

const SftpExport = () => {
  return (
    <>
      <Stack gap="5" p="5" m="auto" maxW="5xl">
        <Flex justify="space-between" align="center">
          <UiText variant="heading2">Data export</UiText>
          <UiLink href="#">
            Learn more <LuExternalLink />
          </UiLink>
        </Flex>
        <UiBox>
          <Flex justify="space-between" align="center">
            <Box>
              <UiText variant="heading2">Scheduled Export</UiText>
              <UiText color="gray.400">
                Automatically export data to your SFTP clients at scheduled
                intervals.
              </UiText>
            </Box>
            <Flex gap="2">
              <Switch.Root disabled>
                <Switch.HiddenInput />
                <Switch.Control />
                <Switch.Label>off</Switch.Label>
              </Switch.Root>
              <PopoverMenu
                placement="bottom-start"
                trigger={<Icon as={HiMiniQuestionMarkCircle} boxSize="5" />}
              >
                <Box p="5">Set up SFTP to start exporting data</Box>
              </PopoverMenu>
            </Flex>
          </Flex>
        </UiBox>
        <PerformanceCard
          heading="Historical Export"
          linkHref="#"
          linkTitle="Create export"
          emptyTable={false}
          subtitle="One-time export of your historical data."
        >
          <UiText variant="heading2">No historical export found</UiText>
          <UiText m="auto" mb="10" maxW="2xl" color="gray.400">
            Past one-time exports on this account will appear here
          </UiText>
        </PerformanceCard>
      </Stack>
    </>
  );
};

export default SftpExport;
