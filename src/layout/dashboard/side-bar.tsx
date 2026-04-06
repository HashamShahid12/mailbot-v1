import {
  Box,
  Flex,
  Text,
  Icon,
  VStack,
  Collapsible,
  useDisclosure,
  Link,
  ProgressCircle,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "@/config/side-bar-items";
import SidebarUser from "@/config/side-bar-user";
// import { Progress } from "@/components/ui/progress";
import type React from "react";
import type { NavItemProps } from "@/types/nav-item-props";
import { useOnboardingProgress } from "@/store/onboardingProgress";
import { onboardingFlow } from "@/onboarding/OnboardingFlow";
import { useColorModeValue } from "@/components/ui/color-mode";

const NavItem: React.FC<NavItemProps> = ({ icon, label, children, path }) => {
  const location = useLocation();
  const hasChildren = !!children?.length;
  const isParentActive = path && location.pathname === path;
  const isAnyChildActive = hasChildren
    ? children?.some((child) => child.path && location.pathname === child.path)
    : false;
  const isActive = isParentActive || isAnyChildActive;
  const { open, onToggle } = useDisclosure();

  return (
    <Box w="full">
      <Collapsible.Root open={open} onOpenChange={onToggle}>
        <Collapsible.Trigger asChild>
          <Flex
            align="center"
            cursor="pointer"
            _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
            borderRadius="md"
            justify="space-between"
            onClick={hasChildren ? onToggle : undefined}
            bg={useColorModeValue(
              isParentActive ? "gray.600" : "transparent",
              isParentActive ? "gray.800" : "gray.900"
            )}
            _dark={{ color: "gray.500" }}
          >
            <NavLink to={path || "#"} style={{ width: "100%" }}>
              <Flex px="4" py="2">
                <Flex align="center" gap="3">
                  <Icon as={icon} boxSize="4" />
                  <Text fontSize="sm" fontWeight={isActive ? "bold" : "normal"}>
                    {label}
                  </Text>
                </Flex>
              </Flex>
            </NavLink>
            {hasChildren && (
              <Icon as={open ? FiChevronDown : FiChevronRight} boxSize="4" />
            )}
          </Flex>
        </Collapsible.Trigger>

        {hasChildren && (
          <Collapsible.Content>
            <VStack gap="0">
              {children.map((child, i) => {
                const isChildActive =
                  child.path && location.pathname === child.path;
                return (
                  <NavLink
                    key={i}
                    to={child.path || "#"}
                    style={{ width: "100%" }}
                  >
                    <Box
                      borderRadius="md"
                      _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                      bg={useColorModeValue(
                        isParentActive ? "gray.600" : "transparent",
                        isParentActive ? "gray.800" : "gray.900"
                      )}
                    >
                      <Flex
                        px="5"
                        align="center"
                        py="2"
                        ml="5.5"
                        position="relative"
                        borderLeft="sm"
                        borderColor={isChildActive ? "black" : "gray.300"}
                      >
                        <Text
                          fontSize="sm"
                          fontWeight={isChildActive ? "semibold" : "normal"}
                        >
                          {child.label}
                        </Text>
                      </Flex>
                    </Box>
                  </NavLink>
                );
              })}
            </VStack>
          </Collapsible.Content>
        )}
      </Collapsible.Root>
    </Box>
  );
};

export const Sidebar = () => {
  const { getCompletedSections } = useOnboardingProgress();
  const { completed, total } = getCompletedSections(onboardingFlow);
  const progress = (completed / total) * 100;

  return (
    <Box
      w="250px"
      h="93vh"
      bg="white"
      _dark={{ bg: "gray.950" }}
      borderRight="sm"
      borderColor="gray.200"
      pt="3"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box overflow="auto">
        <Box
          mx="2"
          borderRadius="md"
          _hover={{ bg: "gray.200" }}
          _focus={{ bg: "gray.600" }}
          mb="3"
        >
          <Link
            textDecoration="none"
            href="/onboarding"
            w="full"
            _focus={{ outline: "none" }}
          >
            <Flex px="2" gap="2" alignItems="center">
              <ProgressCircle.Root value={progress} size="md">
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range stroke="green" />
                </ProgressCircle.Circle>
              </ProgressCircle.Root>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.400">
                  Get started
                </Text>
                <Text fontSize="xs" color="gray.400" fontWeight="normal">
                  {completed}/{total} complete
                </Text>
              </Box>
            </Flex>
          </Link>
        </Box>
        {sidebarLinks.map((item, index) => (
          <Box key={item.label || index} px="2">
            <NavItem
              icon={item.icon}
              label={item.label}
              path={item.path}
              children={item.children}
            />
          </Box>
        ))}
      </Box>
      <SidebarUser />
    </Box>
  );
};
