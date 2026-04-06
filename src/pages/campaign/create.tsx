import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Text, Button, HStack, Stack } from "@chakra-ui/react";
import { Check } from "lucide-react";
import FirstStep from "@/components/ui/campaign/campaign-steper/first-step";
import EmailTemplates from "@/components/ui/campaign/campaign-steper/second-step";
import ReviewStep from "@/components/ui/campaign/campaign-steper/review-step";
import { useCampaignStore } from "@/store/useCampaignStore";
import {
  startCampaign,
  sendTestEmail,
  saveDraft,
  getCampaign,
} from "@/api/campaigns";
import { getSegments } from "@/api/segments";
import { getTemplateById } from "@/api/email-templates";
import { toaster } from "@/components/ui/toaster";
import { useSegmentStore } from "@/store/segment-store";

const steps = [
  { title: "Audience", description: "Who are you sending to?" },
  { title: "Content", description: "Design your email" },
  { title: "Review", description: "Ready to send?" },
];

const CampaignWizard = () => {
  const {
    currentCampaignId,
    updateCampaignStatus,
    campaignForm,
    setCampaignForm,
    setCurrentCampaignId,
    resetCampaignForm,
    currentStep,
    setCurrentStep,
  } = useCampaignStore();
  const [searchParams] = useSearchParams();

  const location = useLocation();
  const { initialData } = location.state || {};

  const navigate = useNavigate();

  const { hasSegments, setSegments } = useSegmentStore();

  useEffect(() => {
    const isNew = searchParams.get("new") === "true";
    if (isNew && !initialData) {
      navigate("/campaigns");
    }
  }, [initialData]);

  useEffect(() => {
    const fetchSegments = async () => {
      if (!hasSegments) {
        console.log("[Campaigns] Fetching segments...");
        try {
          const res = await getSegments();
          if (res.success) {
            const filterActive = (list: any[]) =>
              list.filter((s) => s.status === "active");

            const filteredData = {
              shopify_segments: filterActive(res.data.shopify_segments),
              defaults_custom_segments: filterActive(
                res.data.defaults_custom_segments,
              ),
              archived: filterActive(res.data.archived),
            };
            setSegments(filteredData);
            console.log(
              "[Campaigns] Segments fetched and stored (active only).",
            );
          }
        } catch (error) {
          console.error("[Campaigns] Failed to fetch segments:", error);
        }
      } else {
        console.log("[Campaigns] Segments already loaded. Skipping fetch.");
      }
    };
    fetchSegments();
  }, [hasSegments, setSegments]);

  useEffect(() => {
    const isNew = searchParams.get("new") === "true";
    const campaignId = searchParams.get("id");
    const duplicatedCampaignId = searchParams.get("duplicatedCampaignId");
    const stepParam = searchParams.get("step");

    if (stepParam) {
      const step = parseInt(stepParam, 10);
      if (!isNaN(step) && step >= 0 && step < steps.length) {
        setCurrentStep(step);
      }
    }

    const loadCampaign = async (id: string, isDuplicate: boolean) => {
      try {
        console.log("Loading campaign:", { id, isDuplicate });
        const res = await getCampaign(id);
        console.log("Load campaign response:", res);

        // Handle nested data structure if necessary (e.g. res.data.data vs res.data)
        // Check if campaign is wrapped in 'campaign' property or 'data' property
        const campaignData = res.data?.campaign || res.data?.data || res.data;

        if (res.success && campaignData) {
          const campaign = campaignData;
          console.log("Using campaign data:", campaign);
          setCampaignForm({
            title: isDuplicate ? `${campaign.title} (Copy)` : campaign.title,
            subject: campaign.subject,
            segment_id: campaign.segment_id,
            preview_text: campaign.preview_text,
            template_html: campaign.template_html,
            template_json: campaign.template_json,
            sending_option: campaign.sending_option,
            scheduled_date: campaign.scheduled_date,
          });

          if (!isDuplicate) {
            setCurrentCampaignId(campaign.id);
          } else {
            setCurrentCampaignId(""); // New ID will be generated
          }
        } else {
          console.error("Campaign data missing in response", res);
          toaster.create({
            title: "Error",
            description: "Campaign data missing in response",
            type: "error",
          });
        }
      } catch (err) {
        console.error("Failed to load campaign", err);
        toaster.create({
          title: "Error",
          description: "Failed to load campaign data",
          type: "error",
        });
      }
    };

    if (isNew) {
      resetCampaignForm();

      // Check for initial data from state (e.g. from CreateCampaignByType)
      if (location.state?.initialData) {
        const init = location.state.initialData;
        setCampaignForm({
          title: init.title,
          scheduled_date: init.scheduledDate,
          sending_option: init.sendingOption,
        });
      } else {
        setCampaignForm({
          title: `Campaign - ${new Date().toLocaleString()}`,
        });
      }
    } else if (campaignId) {
      loadCampaign(campaignId, false);
    } else if (duplicatedCampaignId) {
      const isBackend = searchParams.get("fromBackend") === "true";
      loadCampaign(duplicatedCampaignId, !isBackend);
    }
  }, [
    searchParams,
    location.state,
    resetCampaignForm,
    setCampaignForm,
    setCurrentCampaignId,
  ]);

  const goToStep = (stepIndex: number) => {
    console.log("Changing step to:", stepIndex);
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  };

  const handleDraft = async () => {
    try {
      await saveDraft(campaignForm);

      toaster.create({
        title: "Success",
        description: "Campaign saved as draft",
        type: "success",
      });

      if (currentCampaignId) {
        updateCampaignStatus(currentCampaignId, "Draft");
      }
      navigate("/campaigns");
    } catch (error) {
      console.error("Failed to save draft", error);
      toaster.create({
        title: "Error",
        description: "Failed to save draft",
        type: "error",
      });
    }
  };

  const handleFinish = async () => {
    try {
      await startCampaign(campaignForm);

      toaster.create({
        title: "Success",
        description: "Campaign started successfully",
        type: "success",
      });

      if (currentCampaignId) {
        updateCampaignStatus(
          currentCampaignId,
          campaignForm.sending_option === "scheduled" ? "Scheduled" : "Active", // Or "Completed" based on user pref
        );
      }
      navigate("/campaigns");
    } catch (error) {
      console.error("Failed to start campaign", error);
      toaster.create({
        title: "Error",
        description: "Failed to start campaign.",
        type: "error",
      });
    }
  };

  const handleNext = async () => {
    // Logic for proceeding to next step
    if (currentStep === 1) {
      // Step 2 -> Step 3: Fetch full template details if we have a template_id
      if (campaignForm.template_id) {
        try {
          const res = await getTemplateById(campaignForm.template_id);

          if (res.success && res.data && res.data.email_templates) {
            const tmpl = res.data.email_templates;

            // Ensure html is in correct format
            const htmlContent =
              typeof tmpl.html === "string"
                ? { html: tmpl.html }
                : tmpl.html || { html: "" };

            setCampaignForm({
              template_json: tmpl.email_template_json || {},
              template_html: htmlContent,
              template_name: tmpl.name,
              template_image: tmpl.image,
            });
          }
        } catch (error) {
          console.error("Failed to fetch full template details", error);
        }
      }
    }

    if (currentStep === steps.length - 1) {
      handleFinish();
    } else {
      goToStep(Math.min(steps.length - 1, currentStep + 1));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <FirstStep />;
      case 1:
        return <EmailTemplates />;
      case 2:
        return <ReviewStep />;
      default:
        return <Text>Invalid step</Text>;
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 0) {
      return !campaignForm.subject;
    }
    if (currentStep === 1) {
      return !campaignForm.template_name;
    }
    return false;
  };

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Flex
        bg="white"
        h="16"
        px="8"
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Flex align="center" gap="8">
          <Text fontWeight="semibold" fontSize="lg">
            Create Campaign
          </Text>
          <HStack gap="2">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <Flex
                  key={step.title}
                  align="center"
                  gap="2"
                  color={isActive || isCompleted ? "blue.600" : "gray.400"}
                >
                  <Flex
                    w="6"
                    h="6"
                    align="center"
                    justify="center"
                    rounded="full"
                    bg={isActive || isCompleted ? "blue.700" : "gray.200"}
                    color="white"
                    fontSize="xs"
                  >
                    {isCompleted ? <Check size={12} /> : index + 1}
                  </Flex>
                  <Text
                    fontSize="sm"
                    color={isActive || isCompleted ? "blue.700" : "gray.400"}
                    fontWeight={isActive ? "semibold" : "medium"}
                  >
                    {step.title}
                  </Text>
                  {index < steps.length - 1 && (
                    <Box w="8" h="1px" bg="gray.300" />
                  )}
                </Flex>
              );
            })}
          </HStack>
        </Flex>

        <Flex gap="3">
          <Button
            variant="outline"
            onClick={() => goToStep(Math.max(0, currentStep - 1))}
            p="4"
            disabled={currentStep === 0}
          >
            Back
          </Button>
          {currentStep === steps.length - 1 && (
            <Button
              variant="outline"
              onClick={handleDraft}
              p="4"
              bg="blue.500"
              borderColor="blue.700"
              color="white"
              _hover={{ bg: "blue.600" }}
            >
              Save as Draft
            </Button>
          )}
          <Button
            p="4"
            colorScheme="blackAlpha"
            disabled={isNextDisabled()}
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      </Flex>

      <Box>{renderStepContent()}</Box>
    </Box>
  );
};

export default CampaignWizard;
