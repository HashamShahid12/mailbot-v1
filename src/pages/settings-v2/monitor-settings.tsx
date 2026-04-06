import { UiBadge } from "@/components/ui/badge";
import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import { Box, Stack, HStack, Image, Center, Button } from "@chakra-ui/react";
import MailbotAiIcon from "/images/mailbot-ai-icon.svg";
import { SearchBar } from "@/components/ui";
import { TagMultiSelectDropdown } from "@/components/ui/dropdown/tag-multiselect-dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UiTextLink from "@/components/ui/text-link";

const statusFallbackOptions = [
  { label: "Active", value: "active" },
  { label: "Disabled", value: "disabled" },
  { label: "Alert", value: "alert" },
];
const monitorTypeFallbackOptions = [
  { label: "Flow Messages", value: "messages" },
  { label: "Flow Trigger", value: "trigger" },
  { label: "Campaign deliverability", value: "deliverability" },
];

const MonitorSettings = () => {
  const [selectedStatusTags, setSelectedStatusTags] = useState<string[]>([]);
  const [monitorType, setMonitorType] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const hasFilters =
    search !== "" || selectedStatusTags.length > 0 || monitorType.length > 0;
  const handleClear = () => {
    setSearch("");
    setSelectedStatusTags([]);
    setMonitorType([]);
  };
  return (
    <Box px="6" py="5">
      <Stack gap={6}>
        <HStack justify="space-between" mb="5">
          <Stack>
            <HStack>
              <UiText variant="heading2">Auto monitors</UiText>
              <UiBadge
                icon={<Image src={MailbotAiIcon} boxSize="14px" />}
                bg="linear-gradient(136deg,#FDCFCA52 0%,#ABA8FF52 63.89%,#C2C2FF52 88.5%,#FDCFCA52 98.43%), white"
                borderRadius="full"
                px="8px"
                py="4px"
              >
                <Box mixBlendMode="color-burn" fontWeight="300" color="black">
                  Mailbot AI
                </Box>
              </UiBadge>
            </HStack>
            <UiText variant="caption">
              Spot unexpected changes and quickly address issues with your
              customer communications.{" "}
              <UiTextLink value="Learn more" href="/" />{" "}
            </UiText>
          </Stack>
          <UiButton
            uiVariant="outline"
            onClick={() => navigate("/monitor-alert")}
          >
            Alert Log
          </UiButton>
        </HStack>
        <HStack gap={2}>
          <SearchBar
            w="2xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            h="-webkit-fill-available"
          />
          <TagMultiSelectDropdown
            placeHolder="Select"
            selected={selectedStatusTags}
            onChange={setSelectedStatusTags}
            options={statusFallbackOptions}
            searchBar={false}
            menuWidth="fit"
          />
          <TagMultiSelectDropdown
            placeHolder="Monitor Type"
            selected={monitorType}
            onChange={setMonitorType}
            options={monitorTypeFallbackOptions}
            searchBar={false}
            menuWidth="fit"
            label="Auto Monitors"
          />
          {hasFilters && (
            <Button
              variant="plain"
              border="none"
              color="blue.200"
              _hover={{ color: "blue.100", textDecoration: "underline" }}
              _focus={{ outline: "none" }}
              onClick={handleClear}
            >
              Clear
            </Button>
          )}
        </HStack>
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
            You don't have any auto monitors
          </UiText>
          <UiText
            color="gray.400"
            fontSize="md"
            maxW="sm"
            m="auto"
            textAlign="center"
          >
            Send a flow or campaign to start seeing auto monitors within 24
            hours.
          </UiText>
        </Center>
      </Stack>
    </Box>
  );
};

export default MonitorSettings;
