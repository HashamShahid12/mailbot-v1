import { UiAvatar } from "@/components/ui/avatar";
import UiLink from "@/components/ui/link";
import { UiText } from "@/components/ui/text";
import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { useState } from "react";
import { GoQuestion } from "react-icons/go";
const mailbot = "/mailbotfavicon.png";
import { MdInbox } from "react-icons/md";
import { NewDropDown } from "@/components/ui/dropdown/new-dropdown";
import { ChevronDown } from "lucide-react";

const InboxSidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Flex
        p="5"
        top="0"
        left="0"
        bg="white"
        zIndex="10"
        minH="100vh"
        align="center"
        borderRight="sm"
        direction="column"
        position="absolute"
        borderColor="gray.100"
        justify="space-between"
        transition="all 0.3s ease"
        w={isHovered ? "48" : "20"}
        minW={isHovered ? "48" : "20"}
        shadow={isHovered ? "md" : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Flex
          w="full"
          align="center"
          direction="column"
          gap={isHovered ? "2" : "2"}
        >
          <NewDropDown
            buttonTitle={
              <Flex
                gap="2"
                role="group"
                align="center"
                mr={isHovered ? "20px" : undefined}
              >
                <Flex
                  align="center"
                  flexShrink={0}
                  mr={!isHovered ? "5" : undefined}
                >
                  <Image src={mailbot} boxSize="5" />
                </Flex>

                {isHovered && (
                  <UiText whiteSpace="nowrap" flexShrink={0}>
                    Mailbot
                  </UiText>
                )}

                {isHovered && (
                  <Box display="flex" alignItems="center" ml="auto">
                    <Icon
                      boxSize="5"
                      as={ChevronDown}
                      transition="transform 0.2s ease"
                      transform={open ? "rotate(180deg)" : "rotate(0deg)"}
                    />
                  </Box>
                )}
              </Flex>
            }
            border="none"
            links={[
              {
                href: "#",
                title: "Service",
                subtitle: "Mailbot Service",
              },
              {
                title: "Marketing",
                href: "/dashboard",
                subtitle: "Mailbot Marketing",
              },
            ]}
          />

          <UiLink
            px="3"
            bg="blue.400"
            uiVariant="plain"
            href="/campaigns"
            _hover={{ bg: "blue.600" }}
            w={isHovered ? "full" : undefined}
          >
            <Icon as={MdInbox} boxSize="6" />
            {isHovered && <UiText>Inbox</UiText>}
          </UiLink>
        </Flex>

        <Flex
          w="full"
          align="center"
          direction="column"
          gap={isHovered ? "1" : undefined}
        >
          <UiLink uiVariant="plain" px="3" w={isHovered ? "full" : undefined}>
            <Icon as={GoQuestion} boxSize="5" />
            {isHovered && <UiText>Support</UiText>}
          </UiLink>
          <UiLink uiVariant="plain" px="2" w={isHovered ? "full" : undefined}>
            <UiAvatar name="Adex" size="2xs" />
            {isHovered && <UiText>Adex 360</UiText>}
          </UiLink>
        </Flex>
      </Flex>
    </>
  );
};

export default InboxSidebar;
