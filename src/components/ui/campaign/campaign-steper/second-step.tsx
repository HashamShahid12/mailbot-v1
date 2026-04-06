import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  SimpleGrid,
  Card,
  Image,
  Heading,
  Badge,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { useCampaignStore } from "@/store/useCampaignStore";
import { useNavigate } from "react-router-dom";
import { getTemplates, type EmailTemplate } from "@/api/email-templates";
import { toaster } from "@/components/ui/toaster";
import { RiGalleryView } from "react-icons/ri";

const EmailTemplates = () => {
  const { campaignForm, setCampaignForm, currentStep, setCurrentStep } =
    useCampaignStore();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await getTemplates();
      if (res.success && res.data && res.data.email_templates) {
        // Combine custom and default templates
        const allTemplates = [
          ...(res.data.email_templates.custom_templates || []),
          ...(res.data.email_templates.default_templates || []),
        ];
        setTemplates(allTemplates);
      }
    } catch (error) {
      console.error("Failed to fetch templates:", error);
      toaster.create({
        title: "Error fetching templates",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Sync selected template from store
  useEffect(() => {
    if (
      templates.length > 0 &&
      (campaignForm.template_id || campaignForm.template_name)
    ) {
      const found = templates.find(
        (t) =>
          (campaignForm.template_id && t.id === campaignForm.template_id) ||
          t.name === campaignForm.template_name,
      );
      if (found && found.id !== selectedTemplate?.id) {
        setSelectedTemplate(found);
      }
    }
  }, [templates, campaignForm.template_id, campaignForm.template_name]);

  const handleSelectTemplate = (template: EmailTemplate) => {
    if (selectedTemplate?.id === template.id) {
      setSelectedTemplate(null);
      // Clear template from form when deselected
      setCampaignForm({
        template_id: undefined,
        template_json: {},
        template_html: { html: "" },
        template_name: "",
        template_image: "",
      });
    } else {
      setSelectedTemplate(template);

      // Update form immediately when selected
      const htmlContent =
        typeof template.html === "string"
          ? { html: template.html }
          : template.html || { html: "" };

      setCampaignForm({
        template_id: template.id,
        template_json: template.email_template_json || {},
        template_html: htmlContent,
        template_name: template.name,
        template_image: template.image,
      });
    }
  };

  const handleEditTemplate = (e: React.MouseEvent, template: EmailTemplate) => {
    e.stopPropagation();
    navigate(`/editor?id=${template.id}&source=campaign`);
  };

  return (
    <Box p="6" bg="gray.50" minH="calc(100vh - 200px)">
      <Flex justify="space-between" align="center" mb="6">
        <Text fontSize="xl" fontWeight="bold">
          Select a Template
        </Text>
        <Flex gap="4">
          <Button
            p="4"
            bg="gray.300"
            color="black"
            variant="outline"
            onClick={() => navigate("/editor?source=campaign")}
          >
            Create New Template
          </Button>
        </Flex>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" />
        </Flex>
      ) : templates.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="400px"
          gap="4"
        >
          <Text fontSize="xl" fontWeight="medium">
            You haven't created any templates yet
          </Text>
          <Text color="gray.700">
            Once created, your saved templates will appear here.
          </Text>
          <Button
            colorScheme="blue"
            onClick={() => navigate("/editor?source=campaign")}
          >
            Create First Template
          </Button>
        </Flex>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
          {templates.map((template) => (
            <Card.Root
              key={template.id}
              cursor="pointer"
              onClick={() => handleSelectTemplate(template)}
              _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
              transition="all 0.2s"
              overflow="hidden"
              borderWidth={selectedTemplate?.id === template.id ? "2px" : "1px"}
              borderColor={
                selectedTemplate?.id === template.id ? "blue.500" : "gray.200"
              }
            >
              <Box position="relative" height="200px" bg="gray.100">
                {/* Overlay Edit Button */}
                {selectedTemplate?.id === template.id && (
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="blackAlpha.300"
                    zIndex="1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.2s"
                  >
                    <Button
                      colorScheme="whiteAlpha"
                      variant="solid"
                      size="sm"
                      p="4"
                      onClick={(e) => handleEditTemplate(e, template)}
                      _hover={{ bg: "white", color: "black" }}
                    >
                      Edit Template
                    </Button>
                  </Box>
                )}

                {template.image ? (
                  <Image
                    src={template.image}
                    alt={template.name}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    fallbackSrc="https://via.placeholder.com/400x300?text=No+Preview"
                  />
                ) : (
                  <Flex
                    height="100%"
                    align="center"
                    justify="center"
                    color="gray.400"
                    flexDirection="column"
                    gap={2}
                  >
                    <Icon as={RiGalleryView} boxSize={10} />
                    <Text fontSize="sm">No Preview</Text>
                  </Flex>
                )}
                {template.type && (
                  <Badge
                    position="absolute"
                    top="2"
                    right="2"
                    px="2"
                    rounded="full"
                    color="white"
                    bg={template.type === "custom" ? "blue.700" : "green"}
                  >
                    {template.type}
                  </Badge>
                )}
              </Box>
              <Card.Body p="4">
                <Heading size="sm" noOfLines={1} title={template.name}>
                  {template.name}
                </Heading>
                <Text fontSize="xs" color="gray.700" mt="1">
                  Last updated:{" "}
                  {new Date(
                    template.updated_at || template.created_at || Date.now(),
                  ).toLocaleDateString()}
                </Text>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default EmailTemplates;
