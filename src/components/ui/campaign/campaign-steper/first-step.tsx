import { Box, Flex, Stack, Text, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FlexibleDropdown } from "@/components/ui/dropdown";
import { SearchBar } from "@/components/ui";
import Checkbox from "@/components/ui/check-box";
import { useCampaignStore } from "@/store/useCampaignStore";
import { useShopStore } from "@/store/shop-store";
import { useSegmentStore } from "@/store/segment-store";
import { getSegments } from "@/api/segments";

export default function FirstStep() {
  const [showExcludeDropdown, setShowExcludeDropdown] = useState(false);
  const [isAudienceOpen, setIsAudienceOpen] = useState(false);
  const { campaignForm, setCampaignForm } = useCampaignStore();
  const { segments, hasSegments, setSegments } = useSegmentStore();
  const { shop } = useShopStore();

  const [segmentOptions, setSegmentOptions] = useState<
    { label: string; value: string; count: number }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSegments = async () => {
      if (!hasSegments && shop) {
        try {
          const res = await getSegments();
          if (res) {
            setSegments(res);
          }
        } catch (error) {
          console.error("Failed to fetch segments", error);
        }
      }
    };
    fetchSegments();
  }, [hasSegments, setSegments, shop]);

  useEffect(() => {
    if (segments) {
      const options = [
        ...(segments.shopify_segments || []),
        ...(segments.defaults_custom_segments || []),
      ].map((s) => ({
        label: s.name,
        value: s.id,
        count: s.subscriber_count || 0,
      }));
      setSegmentOptions(options);

      // Select first segment by default if none selected
      if (!campaignForm.segment_id && options.length > 0) {
        setCampaignForm({ segment_id: options[0].value });
      }
    }
  }, [segments]); // Removed campaignForm.segment_id from deps to avoid loop if I were setting it differently, but here it's fine.

  const handleSegmentChange = (value: string) => {
    setCampaignForm({ segment_id: value });
    setIsAudienceOpen(false); // Close dropdown on selection
  };

  const filteredOptions = segmentOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedSegmentCount =
    segmentOptions.find((o) => o.value === campaignForm.segment_id)?.count || 0;

  return (
    <Box bg="gray.50" p="6" maxW="1080px" mx="auto">
      <Flex gap="5">
        <Flex gap="6" flexDirection="column" flex="1">
          <Stack flex="1">
            <Box bg="white" p="6" rounded="lg" shadow="sm">
              {/* <Stack gap="4" mb="6">
                <Box>
                  <Text fontWeight="semibold" mb="2">
                    Campaign Name
                  </Text>
                  <Input
                    placeholder="e.g. Summer Sale 2025"
                    value={campaignForm.title}
                    onChange={(e) => setCampaignForm({ title: e.target.value })}
                  />
                </Box>
              </Stack> */}

              <Text fontWeight="semibold" mb="2" fontSize="xl">
                Audience
              </Text>
              <Text fontSize="sm" color="gray.700" mb="2">
                Send to
              </Text>
              <FlexibleDropdown
                label={
                  segmentOptions.find(
                    (o) => o.value === campaignForm.segment_id,
                  )?.label || "Select Audience"
                }
                buttonWidth="100%"
                buttonHeight="40px"
                background="transparent !important"
                border="1px solid !important"
                borderColor="#E2E8F0 !important"
                menuWidth="100%"
                menuPadding="1rem"
                isOpen={isAudienceOpen}
                onOpen={() => setIsAudienceOpen(true)}
                onClose={() => setIsAudienceOpen(false)}
              >
                <SearchBar
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                />
                <Text pb="3" pt="2" fontWeight="medium">
                  List
                </Text>
                <Flex direction="column" gap={1} maxH="200px" overflowY="auto">
                  {filteredOptions.map((status) => (
                    <Box
                      key={status.value}
                      p="2"
                      cursor="pointer"
                      bg={
                        campaignForm.segment_id === status.value
                          ? "blue.50"
                          : "transparent"
                      }
                      _hover={{ bg: "gray.100" }}
                      onClick={() => handleSegmentChange(status.value)}
                      rounded="md"
                    >
                      <Text>{status.label}</Text>
                    </Box>
                  ))}
                </Flex>
              </FlexibleDropdown>

              <Stack gap="4" mt="6">
                <Box>
                  <Text fontWeight="semibold" mb="2">
                    Subject Line{" "}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </Text>
                  <Input
                    px="3"
                    placeholder="Enter subject line"
                    value={campaignForm.subject}
                    onChange={(e) =>
                      setCampaignForm({ subject: e.target.value })
                    }
                  />
                </Box>
                <Box>
                  <Text fontWeight="semibold" mb="2">
                    Preview Text
                  </Text>
                  <Input
                    px="3"
                    placeholder="Enter preview text"
                    value={campaignForm.preview_text}
                    onChange={(e) =>
                      setCampaignForm({ preview_text: e.target.value })
                    }
                  />
                </Box>
              </Stack>

              <Flex justify="space-between" align="center" pt="6">
                <Text fontSize="sm" fontWeight="medium">
                  Turn on Smart Sending
                </Text>
              </Flex>
              <Text fontSize="xs" color="gray.700" mt="2">
                This campaign will not be sent to profiles who received a
                message from you in the past <strong>16 hours</strong>. Smart
                sending timeframes can be updated in{" "}
                <a href="#" style={{ color: "#3182ce" }}>
                  account settings
                </a>
                .
              </Text>
            </Box>

            <Box bg="white" p="6" rounded="lg" shadow="sm">
              <Text fontWeight="semibold" mb="3">
                Tracking
              </Text>
              <Flex justify="space-between" align="center">
                <Text fontSize="sm">Enable UTM Tracking</Text>
              </Flex>
              <Text fontSize="xs" color="gray.700" mt="2">
                Links will include additional tracking info using{" "}
                <a href="#" style={{ color: "#3182ce" }}>
                  UTM parameters
                </a>{" "}
                for tools like Google Analytics.
              </Text>
            </Box>
          </Stack>
        </Flex>

        <Box w="300px" mt="2">
          <Box p="6" textAlign="center" bg="white" rounded="lg" shadow="sm">
            <Text fontSize="sm" color="gray.700">
              Estimated recipients
            </Text>
            <Text fontSize="3xl" fontWeight="bold" mt="2">
              {selectedSegmentCount}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
