import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCampaignStore } from "@/store/useCampaignStore";
import { getSegments } from "@/api/segments";
import { sendTestEmail } from "@/api/campaigns";
import { toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/auth-store";
import DateTimeInput from "@/components/ui/date-time-input";

const ReviewStep = () => {
  const { campaignForm, setCampaignForm } = useCampaignStore();
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [segmentName, setSegmentName] = useState("");

  useEffect(() => {
    const fetchSegmentName = async () => {
      if (campaignForm.segment_id) {
        try {
          const res = await getSegments();
          if (res) {
            const allSegments = [
              ...(res.shopify_segments || []),
              ...(res.defaults_custom_segments || []),
            ];
            const found = allSegments.find(
              (s) => s.id === campaignForm.segment_id,
            );
            if (found) {
              setSegmentName(found.name);
            }
          }
        } catch (error) {
          console.error("Failed to fetch segments for name lookup", error);
        }
      }
    };
    fetchSegmentName();
  }, [campaignForm.segment_id]);

  const handleSendTestEmail = async () => {
    if (!testEmailAddress) {
      toaster.create({
        title: "Error",
        description: "Please enter an email address",
        type: "error",
      });
      return;
    }

    setIsSendingTest(true);
    try {
      const user = useAuthStore.getState().user;

      const htmlContent =
        campaignForm.template_html?.html ||
        (typeof campaignForm.template_html === "string"
          ? campaignForm.template_html
          : "") ||
        campaignForm.template_html?.body ||
        campaignForm.template_html?.content;

      await sendTestEmail({
        to: testEmailAddress,
        subject: campaignForm.subject || "Test Email",
        template_html: htmlContent,
        preview_text: campaignForm.preview_text || "",
      });

      toaster.create({
        title: "Success",
        description: "Test email sent successfully",
        type: "success",
      });
      setShowTestEmail(false);
      setTestEmailAddress("");
    } catch (error) {
      console.error("Failed to send test email", error);
      toaster.create({
        title: "Error",
        description: "Failed to send test email",
        type: "error",
      });
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <Box p={6} bg="white" rounded="lg" shadow="sm" maxW="800px" mx="auto">
      <Box
        mb={8}
        p={5}
        borderWidth="1px"
        borderStyle="dashed"
        borderColor="gray.300"
        rounded="md"
      >
        {!showTestEmail ? (
          <Button
            onClick={() => setShowTestEmail(true)}
            variant="outline"
            width="full"
            colorScheme="blue"
          >
            Send Test Email
          </Button>
        ) : (
          <Stack gap={4}>
            <Text fontWeight="bold">Send Test Email</Text>
            <Input
              placeholder="Enter email address"
              value={testEmailAddress}
              onChange={(e) => setTestEmailAddress(e.target.value)}
              bg="white"
            />
            <HStack justifyContent="flex-end">
              <Button
                variant="ghost"
                onClick={() => setShowTestEmail(false)}
                disabled={isSendingTest}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSendTestEmail}
                isLoading={isSendingTest}
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
              >
                Send
              </Button>
            </HStack>
          </Stack>
        )}
      </Box>

      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Review and Schedule
      </Text>

      <Stack gap={6}>
        <Box>
          <Text fontWeight="medium" mb={2}>
            Sending Option
          </Text>
          <Flex gap={4}></Flex>
        </Box>

        <Box bg="gray.50" p={4} rounded="md">
          <Text fontWeight="bold" mb={2}>
            Summary
          </Text>
          <Stack gap={1}>
            <Text>
              <strong>Campaign:</strong> {campaignForm.title}
            </Text>
            <Text>
              <strong>Subject:</strong> {campaignForm.subject || "No subject"}
            </Text>

            <Text>
              <strong>Audience:</strong>{" "}
              {segmentName || campaignForm.segment_id || "None selected"}
            </Text>

            <Text>
              <strong>Template:</strong>{" "}
              {campaignForm.template_name || "Untitled"}
            </Text>
            {campaignForm.template_image && (
              <Box mt={2}>
                <Text fontSize="sm" mb={1} fontWeight="medium">
                  Template Preview:
                </Text>
                <Box
                  border="1px solid"
                  borderColor="gray.200"
                  rounded="md"
                  overflow="hidden"
                  maxW="200px"
                >
                  <img
                    src={campaignForm.template_image}
                    alt="Template Preview"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </Box>
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ReviewStep;
