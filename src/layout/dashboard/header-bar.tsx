import { Box, Flex, Image, Link, IconButton } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { SearchBar } from "@/components/ui";
import { PopoverMenu } from "@/components/ui";
import { BellIcon } from "lucide-react";
import { UiText } from "@/components/ui/text";
import UiButton from "@/components/ui/button";
import { ColorModeButton } from "@/components/ui/color-mode";

export function Header() {
  const { pathname } = useLocation();
  const isAuthPage = ["/login", "/signup", "/twofactor"].includes(pathname);

  return (
    <Flex
      px="4"
      gap="3"
      h="8xs"
      as="header"
      align="center"
      bg="#1D1E20"
      boxShadow="sm"
      justify="space-between"
    >
      {!isAuthPage && (
        <Flex align="center" justify="center" gap="4" w="332px">
          <SearchBar placeholder="Search" />
        </Flex>
      )}
      <Image src="/mailbot.svg" alt="Mailbot" height="30px" />

      <Flex
        align="center"
        justify="end"
        gap="4"
        color="white"
        position="relative"
        w="332px"
      >
        {!isAuthPage && (
          <>
            <PopoverMenu
              contentProps={{
                minW: "400px",
                minH: "400px",
              }}
              placement="bottom-end"
              trigger={
                <IconButton
                  aria-label="Notifications"
                  _hover={{ bg: "gray.400" }}
                  _dark={{ bg: "gray.900" }}
                >
                  <BellIcon color="white" />
                </IconButton>
              }
            >
              <Flex direction="column">
                <Box borderBottom="1px solid" w="100%" borderColor="#bcc3c7">
                  <UiText paddingX="4" paddingY="5">
                    Notifications
                  </UiText>
                </Box>
                <Box textAlign="center">
                  <UiText paddingY="5">You're up to date!</UiText>
                  <UiText>You don't have any new notifications.</UiText>
                </Box>
              </Flex>
            </PopoverMenu>
            <ColorModeButton />
            <UiButton
              uiVariant="solid"
              border="sm"
              borderColor="whiteAlpha.100"
            >
              Account Plans
            </UiButton>
          </>
        )}

        {!isAuthPage ? (
          <Link
            href="#"
            fontWeight="medium"
            py="1"
            px="2"
            borderRadius="md"
            color="white"
            _hover={{ bg: "whiteAlpha.200", textDecoration: "none" }}
          >
            Support
          </Link>
        ) : (
          <Link
            href="#"
            fontWeight="medium"
            fontSize="sm"
            py="5"
            px="2"
            color="whiteAlpha.300"
            _hover={{ bg: "whiteAlpha.400", textDecoration: "underline" }}
          >
            Contact Support
          </Link>
        )}
      </Flex>
    </Flex>
  );
}
