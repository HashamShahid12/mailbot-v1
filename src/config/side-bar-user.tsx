import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { PopoverMenu } from "@/components/ui";
import { Tooltip } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/api/dashboard-api";
import type { User } from "@/types/user-type";
import { useAuthStore } from "@/store/auth-store";
import { useNavigate } from "react-router-dom";
import { UiText } from "@/components/ui/text";
import { logoutRequest } from "@/api/auth";

const SidebarUser = () => {
  const { user, refreshToken } = useAuthStore();
  // const [user, setUser] = useState<User | null>(null);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutRequest(refreshToken || "");
    } catch (error) {
      console.error("[SidebarUser] Logout request failed:", error);
    } finally {
      logout();
      localStorage.removeItem("auth-storage");
      navigate("/login");
      setLoading(false);
    }
  };

  if (!user) return null;
  return (
    <>
      <PopoverMenu
        placement="right-start"
        trigger={
          <Flex
            px="3"
            py="4"
            borderTop="sm"
            borderColor="gray.600"
            mt="auto"
            align="center"
            gap="2"
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
          >
            <Avatar.Root size="xs" bg="gray.800" color="white">
              <Avatar.Fallback name={user.name} />
            </Avatar.Root>
            <Tooltip
              showArrow
              content={
                <Box>
                  <Text fontWeight="semibold">{user.name}</Text>
                  <Text fontWeight="semibold">{user.email}</Text>
                </Box>
              }
              contentProps={{
                borderRadius: "md",
                px: 3,
                py: 3,
                textAlign: "center",
                lineHeight: "1.5rem",
              }}
            >
              <Text fontSize="sm" fontWeight="medium">
                {user.name}
              </Text>
            </Tooltip>
          </Flex>
        }
      >
        <Box border="sm" borderColor="gray.300" borderRadius="xs" minW="250px">
          <Flex align="center" gap="3" bg="gray.500" p="3">
            <Avatar.Root bg="gray.800" color="white">
              <Avatar.Fallback name="Adex360" />
            </Avatar.Root>

            <Tooltip
              content={
                <Box>
                  <Text color="gray.400">{user.name}</Text>
                </Box>
              }
              contentProps={{
                p: 2,
                bg: "white",
                textAlign: "center",
                border: "sm",
                borderColor: "black",
                lineHeight: "1.5rem",
              }}
            >
              <Box>
                <UiText fontWeight="medium">{user.name}</UiText>
                <Text fontSize="sm" color="gray.400">
                  {user.email}
                </Text>
              </Box>
            </Tooltip>
          </Flex>

          <Box borderY="sm" borderColor="gray.600">
            <Text py="3" pl="3" _hover={{ bg: "gray.200", cursor: "pointer" }}>
              What's new?
            </Text>
            <Text py="3" pl="3" _hover={{ bg: "gray.200", cursor: "pointer" }}>
              Billing
            </Text>
            <Text
              onClick={() => {
                navigate("/settings");
              }}
              py="3"
              pl="3"
              _hover={{ bg: "gray.200", cursor: "pointer" }}
            >
              Settings
            </Text>
          </Box>

          <Box
            p="3"
            m="2"
            border="sm"
            borderColor="blue.300"
            bg="blue.400"
            rounded="md"
            fontSize="sm"
            color="blue.100"
          >
            Integrations has moved to the main menu.
          </Box>

          <Flex
            borderTop="sm"
            borderColor="gray.600"
            justify="space-between"
            fontSize="sm"
            color="blue.200"
            p="4"
          >
            <Text
              _hover={{
                color: "blue.100",
                textDecoration: "underline",
                cursor: "button",
              }}
              onClick={handleLogout}
            >
              {loading ? "Logging out..." : "Log out"}
            </Text>
            <Text
              _hover={{
                textDecoration: "underline",
                color: "blue.100",
                cursor: "button",
              }}
            >
              Legal
            </Text>
          </Flex>
        </Box>
      </PopoverMenu>
    </>
  );
};

export default SidebarUser;
