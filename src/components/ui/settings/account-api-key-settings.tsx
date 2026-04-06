import { useState } from "react";
import {
  Box,
  Stack,
  Icon,
  Separator,
  Center,
  Image,
  RadioGroup,
  Link,
  Text,
} from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";
import { CircleAlert, CircleCheck, Info, Lightbulb } from "lucide-react";
import Tables from "../table";
import { mockSettingsApiKey } from "@/api/mock/dashboard-mock";
import UiTextLink from "../text-link";
import { UiBadge } from "../badge";

const columns = [
  { header: "Company Name", key: "company-name", width: "33.3%" },
  { header: "Public Api Key", key: "public-api-key", width: "33.3%" },
  { header: "Permissions", key: "permissions", width: "33.3%" },
];

interface PrivateApiKey {
  name: string;
  key: string;
  status: string;
}

const AccountApiKeySettings = () => {
  const items = mockSettingsApiKey.map((item) => ({
    "company-name": item.companyName,
    "public-api-key": item.apiKey,
    permissions: item.permissions,
  }));

  const privateKeys: PrivateApiKey[] = [];

  const [optInType, setOptInType] = useState<"double" | "single">("double");
  const [savedOptInType, setSavedOptInType] = useState<"double" | "single">(
    "double",
  );

  const isOptInDirty = optInType !== savedOptInType;

  const handleSaveOptIn = () => {
    setSavedOptInType(optInType);
  };
  const OPT_IN_OPTIONS = [
    {
      id: "double",
      title: "Double opt-in",
      description: "Profiles need to confirm their subscription.",
    },
    {
      id: "single",
      title: "Single opt-in",
      description: "Profiles don’t need to confirm their subscription.",
    },
  ];

  const KEY_GUIDELINES = [
    {
      title: "Do:",
      color: "green",
      icon: CircleCheck,
      badgeBgColor: "#d9fae3",
      points: [
        "Treat your private key like a password. Only share it with a person or party you trust.",
        "Name your private key so you can easily find, delete, and recreate the key if it’s compromised.",
      ],
    },
    {
      title: "Don't:",
      color: "red",
      icon: CircleAlert,
      badgeBgColor: "#ffedeb",
      points: [
        "Expose your private key in a public place.",
        "Share your private key via email or direct message.",
        "Type (i.e., hardcode) your private key directly into your source code.",
      ],
    },
  ];

  return (
    <Stack maxW="720px" gap={6}>
      <UiText variant="heading2">API Keys</UiText>

      <UiBox>
        <Stack direction="row" gap="4" align="center" justify="space-between">
          <Stack direction="row" gap="4" align="center">
            <UiText variant="heading2">Public API Key / site ID</UiText>
            <Info />
          </Stack>
          <UiButton uiVariant="outline">Manage Permissions</UiButton>
        </Stack>
        <Tables columns={columns} rows={items} rowpadding="4" />
      </UiBox>

      <UiBox>
        <Stack direction="row" gap="4" align="center" justify="space-between">
          <Stack direction="row" gap="4" align="center">
            <UiText variant="heading2">Private API Keys</UiText>
            <Info />
          </Stack>
          <UiButton uiVariant="outline">Create Private Api Keys</UiButton>
        </Stack>
        <Box mt={8}>
          <Box
            display="inline-block"
            borderBottom="2px solid black"
            pb={2}
            px={2}
            mx={4}
            cursor="pointer"
          >
            <UiText fontWeight="600" fontSize="md">
              Used
            </UiText>
          </Box>
          <Separator mt="-1px" />
          {privateKeys.length === 0 ? (
            <Center py={20} flexDirection="column">
              <Box mb={6} opacity={0.4}>
                <Image
                  src="/images/emptyApiKeyImage.svg"
                  alt="EmptyApiKeyImage"
                  width={260}
                  height={260}
                />
              </Box>

              <UiText fontWeight="semibold" fontSize="2xl" mb={1}>
                No data available
              </UiText>
              <UiText color="gray.400" fontSize="xl">
                Refresh the page to try again.
              </UiText>
            </Center>
          ) : (
            <Box p={4}>
              <Tables columns={[]} rows={privateKeys} />
            </Box>
          )}
        </Box>
      </UiBox>

      <UiBox>
        <Stack direction="row" gap="4" align="center" justify="space-between">
          <Stack>
            <Stack direction="row" gap="4" align="center">
              <UiText variant="heading2">Default opt-in settings</UiText>
              <Info />
            </Stack>
            <UiText color="gray.400">
              This setting applies to all profiles who opt-in through any of
              your API keys and are not also added to a list.{" "}
              <UiTextLink
                href="https://chakra-ui.com"
                icon
                value="Learn more"
                color="blue.150"
              />
            </UiText>
          </Stack>
          <UiButton
            uiVariant="solid"
            onClick={handleSaveOptIn}
            disabled={!isOptInDirty}
          >
            Save
          </UiButton>
        </Stack>

        <Box mt={8}>
          <RadioGroup.Root
            value={optInType}
            onValueChange={(details) =>
              setOptInType(details.value as "double" | "single")
            }
          >
            <Stack gap={4}>
              {OPT_IN_OPTIONS.map((option) => {
                const isSelected = optInType === option.id;

                return (
                  <RadioGroup.Item
                    key={option.id}
                    value={option.id}
                    cursor="pointer"
                    borderWidth="3px"
                    borderRadius="xl"
                    p={4}
                    alignItems="flex-start"
                    transition="all 0.2s"
                    borderColor={isSelected ? "blue.150" : "gray.300"}
                    _hover={{
                      borderColor: isSelected ? "blue.150" : "blue.600",
                    }}
                  >
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator
                      boxSize="5"
                      borderRadius="full"
                      border="2px solid"
                      borderColor="gray.300"
                      bg="white"
                      _checked={{
                        borderWidth: "6px",
                        borderColor: "blue.150",
                        bg: "white",
                      }}
                      mt="0.5"
                    />

                    <RadioGroup.ItemText ml={3}>
                      <Stack gap={0}>
                        <UiText fontWeight="medium" fontSize="xl">
                          {option.title}
                        </UiText>
                        <UiText color="black" fontSize="lg">
                          {option.description}
                        </UiText>
                      </Stack>
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                );
              })}
            </Stack>
          </RadioGroup.Root>
        </Box>
      </UiBox>

      <UiBox>
        <Stack gap={2}>
          <Stack direction="row" align="center" gap={3}>
            <Icon as={Lightbulb} boxSize={5} />
            <UiText variant="heading2">Protect your private API keys</UiText>
          </Stack>

          <Stack direction={["column", "row"]} gap={4}>
            {KEY_GUIDELINES.map((section) => {
              const IconComponent = section.icon;
              return (
                <Box key={section.title} flex={1} p={4}>
                  <UiText fontWeight="semibold" mb={2}>
                    <UiBadge
                      color={`${section.color}.600`}
                      bg={`${section.badgeBgColor}`}
                      icon={<IconComponent size={18} />}
                      paddingBlock="2"
                      paddingInline="3"
                    >
                      {section.title}
                    </UiBadge>
                  </UiText>

                  <Stack as="ul" gap={2} listStyleType="inherit">
                    {section.points.map((point, index) => (
                      <UiText as="li" key={index} fontSize="md" ml={6}>
                        {point}
                      </UiText>
                    ))}
                  </Stack>
                </Box>
              );
            })}
          </Stack>

          <UiTextLink
            href="https://chakra-ui.com"
            value="What to do if your Private API key was exposed."
            color="blue.150"
            icon
          />
        </Stack>
      </UiBox>
    </Stack>
  );
};

export default AccountApiKeySettings;
