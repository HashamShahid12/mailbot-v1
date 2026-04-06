import PerformanceCard from "@/components/ui/analytics/deliverability/perfomance-card";
import UiBox from "@/components/ui/box";
import UiLink from "@/components/ui/link";
import { UiText } from "@/components/ui/text";
import { Flex, Icon, Stack, List } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";

const SftpSetup = () => {
  const credentials = [
    { label: "URL", value: "sftp://sftp.Mailbot.com" },
    { label: "Server", value: "sftp.Mailbot.com" },
    { label: "Port", value: "22" },
    { label: "Username", value: "X75rxx_ViDy34" },
  ];
  return (
    <>
      <Stack maxW="5xl" p="5" gap="5" m="auto">
        <UiBox>
          <UiText variant="subheading" fontWeight="semibold" mb="4">
            SFTP Credentials
          </UiText>
          {credentials.map((cred, index) => (
            <Flex key={index} gap="2" align="center" mb="2">
              <UiText fontWeight="semibold">{cred.label}:</UiText>
              <UiText>{cred.value}</UiText>
              <Icon
                p="2"
                boxSize="9"
                rounded="md"
                border="sm"
                borderColor="gray.300"
                cursor="pointer"
                as={MdContentCopy}
                onClick={() => {
                  navigator.clipboard.writeText(cred.value);
                }}
                _hover={{ bg: "gray.600" }}
              />
            </Flex>
          ))}
        </UiBox>
        <PerformanceCard
          heading="SSH keys"
          linkHref="#"
          linkTitle="Add SSH key"
          emptyTable={false}
          subtitle="You can create and store up to 10 keys on Mailbot."
        >
          <UiText variant="heading2">No SSH key found</UiText>
          <UiText m="auto" mb="5" maxW="2xl" color="gray.400">
            Add an SSH key to connect with Mailbot
          </UiText>
        </PerformanceCard>
        <UiBox>
          <Flex align="center" justify="space-between" mb="8">
            <UiText variant="subheading" fontWeight="semibold">
              SFTP Credentials
            </UiText>
            <UiLink href="#">
              Learn more <LuExternalLink />
            </UiLink>
          </Flex>
          <List.Root ml="5" color="gray.400">
            <List.Item>Generate a new SSH key on your local machine.</List.Item>
            <List.Item>
              Add your key to your Mailbot to enable authentication.
            </List.Item>
            <List.Item>
              Open your SFTP client and paste in your SFTP username.
            </List.Item>
            <List.Item>Connect to sftp.Mailbot.com with a SSH key.</List.Item>
            <List.Item>
              Once authenticated, make sure your files follow the recommended
              guidelines and structures before importing.
            </List.Item>
          </List.Root>
        </UiBox>
      </Stack>
    </>
  );
};

export default SftpSetup;
