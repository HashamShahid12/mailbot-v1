import { Box, Stack, HStack, Flex } from "@chakra-ui/react";
import { Users, UserPlus, Mail, LogOut, MoreVertical } from "lucide-react";
import UiBox from "../box";
import UiButton from "../button";
import { UiText } from "../text";
import { NewDropDown } from "../dropdown/new-dropdown";
import UiTextLink from "../text-link";

// 1. Data structure for the pages
const CONSENT_PAGES = [
  {
    title: "Preference page",
    description:
      "Customize your customers’ experience when they manage their email preferences.",
    icon: <Users size={18} />,
    hasMenu: true,
  },
  {
    title: "Subscribe page",
    description: "Customize your customers’ experience when they subscribe.",
    icon: <UserPlus size={18} />,
    hasMenu: true,
  },
  {
    title: "Email confirmation",
    description:
      "Customize your customers’ experience when they confirm their subscription.",
    icon: <Mail size={18} />,
    hasMenu: false, // Image shows no dots for this item
  },
  {
    title: "Email unsubscribe page",
    description: "Customize your customers’ experience when they unsubscribe.",
    icon: <LogOut size={18} />,
    hasMenu: true,
  },
];

const OtherConsentSettings = () => {
  return (
    <Stack maxW="720px" gap={5}>
      <UiText variant="heading2">Consent pages</UiText>

      {CONSENT_PAGES.map((page, index) => (
        <UiBox key={index}>
          <Flex justify="space-between" align="flex-start">
            <HStack align="flex-start" gap={4}>
              <Box pt={2} color="black">
                {page.icon}
              </Box>

              <Stack gap={0.5}>
                <UiText
                  variant="subheading"
                  fontWeight="semibold"
                  color="black"
                >
                  {page.title}
                </UiText>
                <UiText color="gray.400" fontSize="sm">
                  {page.description}
                </UiText>
              </Stack>
            </HStack>

            <HStack gap={0}>
              <UiButton
                uiVariant="outline"
                size="sm"
                px={4}
                borderRightRadius={page.hasMenu ? "none" : "md"}
              >
                Edit Page
              </UiButton>

              {page.hasMenu && (
                <Box borderLeft="none">
                  <NewDropDown
                    buttonTitle={<MoreVertical size={16} />}
                    p="2"
                    borderLeftRadius="none"
                    borderLeft="none"
                    links={[{ title: "Use Hosted Page", onClick: () => {} }]}
                  />
                </Box>
              )}
            </HStack>
          </Flex>
        </UiBox>
      ))}

      <UiBox>
        <Stack gap={2}>
          <UiText fontWeight="bold" fontSize="md" color="black">
            Global unsubscribe page
          </UiText>
          <UiText color="gray.400" fontSize="sm">
            You can use this address to direct anyone to opt-out of all future
            emails.
          </UiText>

          <UiTextLink
            href="http://manage.kmail-lists.com/subscriptions/unsubscribe?cy=X75rxx"
            value="http://manage.kmail-lists.com/subscriptions/unsubscribe?cy=X75rxx"
            icon
            fontSize="sm"
            color="blue.200"
            mt={2}
          />
        </Stack>
      </UiBox>
    </Stack>
  );
};

export default OtherConsentSettings;
