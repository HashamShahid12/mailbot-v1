import { UiText } from "@/components/ui/text";
import {
  Box,
  Link,
  Stack,
  HStack,
  Center,
  Image,
  Separator,
} from "@chakra-ui/react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import UiBox from "../../components/ui/box";

const MonitorSettingsAlertLog = () => {
  const navigate = useNavigate();

  return (
    <Stack gap={4} p={5}>
      {/* 1. Top Navigation & Header */}
      <Box>
        <Link
          display="flex"
          alignItems="center"
          gap={1}
          color="blue.200"
          fontSize="sm"
          w="fit-content"
          _hover={{ textDecoration: "underline" }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/settings");
          }}
        >
          <GoArrowLeft />
          Monitors
        </Link>
        <UiText variant="heading2" mt={2}>
          Alert log
        </UiText>
      </Box>
      <Separator borderColor="gray.100" />
      {/* 2. Main Alert Log Card */}
      <UiBox p={0}>
        {/* Card Header Section */}
        <HStack p={6} gap={4} align="flex-start">
          {/* Grey Bell Icon Circle */}
          <Center
            boxSize="10"
            borderRadius="full"
            bg="gray.50"
            border="1px solid"
            borderColor="gray.100"
            flexShrink={0}
          >
            <Bell size={18} color="#718096" />
          </Center>

          <Stack gap={0}>
            <UiText fontWeight="bold" fontSize="md" color="black">
              Alert log
            </UiText>
            <UiText fontSize="sm" color="gray.400">
              Timeline view of alerts created by your monitors.
            </UiText>
          </Stack>
        </HStack>

        <Separator borderColor="gray.100" />

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
            You have no alerts
          </UiText>
          <UiText color="gray.400" fontSize="md" textAlign="center">
            When your monitors create alerts, they will appear here.
          </UiText>
        </Center>
      </UiBox>
    </Stack>
  );
};

export default MonitorSettingsAlertLog;
