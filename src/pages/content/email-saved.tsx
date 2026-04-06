import { SearchBar, PopoverMenu } from "@/components/ui";
import { UiTab } from "@/components/ui/tabs";
import { UiText } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import {
  Box,
  Flex,
  Icon,
  Image,
  Stack,
  Spinner,
  SimpleGrid,
  Card,
  Heading,
  IconButton,
  Text,
  Badge,
} from "@chakra-ui/react";
import { FaListUl, FaEllipsisV, FaTrash, FaCopy } from "react-icons/fa";
import { RiGalleryView } from "react-icons/ri";
import EmptyTemplate from "../../assets/empty-template.svg";
import UiButton from "@/components/ui/button";
import EmailSavedImportDialog from "./email-saved-import-dialog";
import {
  getTemplates,
  deleteTemplate,
  type EmailTemplate,
} from "@/api/email-templates";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";

const EmailSaved = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isImportDialog, setIsImportDialog] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"gallery" | "list">("gallery");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this template?")) return;

    try {
      await deleteTemplate(id);
      toaster.create({
        title: "Template deleted",
        type: "success",
      });
      // Remove from state or refetch
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete template:", error);
      toaster.create({
        title: "Error deleting template",
        type: "error",
      });
    }
  };

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    toaster.create({
      title: "ID copied to clipboard",
      type: "success",
    });
    setOpenMenuId(null);
  };

  const handleEdit = (id: string) => {
    navigate(`/editor?id=${id}`);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" />
        </Flex>
      );
    }

    if (templates.length === 0) {
      return (
        <Flex
          mt="10"
          gap="3"
          align="center"
          justify="center"
          direction="column"
        >
          <Image src={EmptyTemplate} alt="Empty Template" />
          <UiText variant="heading">
            You haven't created any templates yet
          </UiText>
          <UiText color="gray.400">
            Once created, your saved templates will appear here.
          </UiText>
        </Flex>
      );
    }

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredTemplates = normalizedQuery
      ? templates.filter((template) =>
          template.name.toLowerCase().includes(normalizedQuery),
        )
      : templates;

    if (filteredTemplates.length === 0) {
      return (
        <Flex
          mt="10"
          gap="3"
          align="center"
          justify="center"
          direction="column"
        >
          <UiText variant="heading">No templates match your search</UiText>
          <UiText color="gray.400">
            Try a different name or clear the search.
          </UiText>
        </Flex>
      );
    }

    const isListView = viewMode === "list";

    return (
      <SimpleGrid columns={isListView ? [1] : [1, 2, 3, 4]} gap={6}>
        {filteredTemplates.map((template) => (
          <Card.Root
            key={template.id}
            cursor="pointer"
            onClick={() => handleEdit(template.id)}
            _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
            transition="all 0.2s"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.200"
          >
            {isListView ? (
              <Flex>
                <Box
                  position="relative"
                  w="260px"
                  minW="260px"
                  h="160px"
                  bg="gray.100"
                >
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
                  <Box position="absolute" top="2" right="2">
                    <PopoverMenu
                      isOpen={openMenuId === template.id}
                      onOpenChange={(open) =>
                        setOpenMenuId(open ? template.id : null)
                      }
                      placement="bottom-end"
                      contentProps={{ padding: "0", minW: "150px" }}
                      trigger={
                        <IconButton
                          aria-label="Options"
                          variant="ghost"
                          size="sm"
                          bg="gray.200"
                          _hover={{ bg: "gray.100" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaEllipsisV />
                        </IconButton>
                      }
                    >
                      <Box py="1">
                        <Flex
                          align="center"
                          gap="2"
                          px="3"
                          py="2"
                          cursor="pointer"
                          _hover={{ bg: "gray.100" }}
                          onClick={(e) => handleCopyId(template.id, e)}
                        >
                          <Icon as={FaCopy} />
                          <Text fontSize="sm">Copy ID</Text>
                        </Flex>
                        <Flex
                          align="center"
                          gap="2"
                          px="3"
                          py="2"
                          cursor="pointer"
                          color="red.500"
                          _hover={{ bg: "gray.100" }}
                          onClick={(e) => handleDelete(template.id, e)}
                        >
                          <Icon as={FaTrash} />
                          <Text fontSize="sm">Delete</Text>
                        </Flex>
                      </Box>
                    </PopoverMenu>
                  </Box>
                  {template.type && (
                    <Badge
                      position="absolute"
                      top="2"
                      left="2"
                      p="2"
                      bg="blue.200"
                      color="white"
                      colorScheme={
                        template.type === "custom" ? "blue" : "green"
                      }
                    >
                      {template.type}
                    </Badge>
                  )}
                </Box>
                <Card.Body
                  p="4"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  flex="1"
                >
                  <Box>
                    <Heading size="sm" noOfLines={1} title={template.name}>
                      {template.name}
                    </Heading>
                    <Text fontSize="xs" color="gray.700" mt="1">
                      Last updated:{" "}
                      {new Date(
                        template.updated_at ||
                          template.created_at ||
                          Date.now(),
                      ).toLocaleDateString()}
                    </Text>
                  </Box>
                </Card.Body>
              </Flex>
            ) : (
              <>
                <Box position="relative" height="200px" bg="gray.100">
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
                  <Box position="absolute" top="2" right="2">
                    <PopoverMenu
                      isOpen={openMenuId === template.id}
                      onOpenChange={(open) =>
                        setOpenMenuId(open ? template.id : null)
                      }
                      placement="bottom-end"
                      contentProps={{ padding: "0", minW: "150px" }}
                      trigger={
                        <IconButton
                          aria-label="Options"
                          variant="ghost"
                          size="sm"
                          bg="gray.200"
                          _hover={{ bg: "gray.100" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaEllipsisV />
                        </IconButton>
                      }
                    >
                      <Box py="1">
                        <Flex
                          align="center"
                          gap="2"
                          px="3"
                          py="2"
                          cursor="pointer"
                          _hover={{ bg: "gray.100" }}
                          onClick={(e) => handleCopyId(template.id, e)}
                        >
                          <Icon as={FaCopy} />
                          <Text fontSize="sm">Copy ID</Text>
                        </Flex>
                        <Flex
                          align="center"
                          gap="2"
                          px="3"
                          py="2"
                          cursor="pointer"
                          color="red.500"
                          _hover={{ bg: "gray.100" }}
                          onClick={(e) => handleDelete(template.id, e)}
                        >
                          <Icon as={FaTrash} />
                          <Text fontSize="sm">Delete</Text>
                        </Flex>
                      </Box>
                    </PopoverMenu>
                  </Box>
                  {template.type && (
                    <Badge
                      position="absolute"
                      top="2"
                      left="2"
                      p="2"
                      bg="blue.200"
                      color="white"
                      colorScheme={
                        template.type === "custom" ? "blue" : "green"
                      }
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
              </>
            )}
          </Card.Root>
        ))}
      </SimpleGrid>
    );
  };

  return (
    <>
      <Stack gap="5" mx="7" my="10">
        <Flex justify="space-between">
          <SearchBar
            w="3xs"
            placeholder="Search templates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Flex gap="2">
            {/* <UiTab
              tabs={[
                {
                  value: "gallery",
                  label: (
                    <Tooltip
                      showArrow
                      content={
                        <Box>
                          <UiText fontWeight="semibold" color="white">
                            Gallery
                          </UiText>
                        </Box>
                      }
                      contentProps={{
                        borderRadius: "md",
                        p: 3,
                        textAlign: "center",
                        lineHeight: "1.5rem",
                      }}
                    >
                      <Icon as={RiGalleryView} boxSize="6" />
                    </Tooltip>
                  ),
                },
                {
                  value: "list",
                  label: (
                    <Tooltip
                      showArrow
                      content={
                        <Box>
                          <UiText fontWeight="semibold" color="white">
                            List
                          </UiText>
                        </Box>
                      }
                      contentProps={{
                        borderRadius: "md",
                        p: 3,
                        textAlign: "center",
                        lineHeight: "1.5rem",
                      }}
                    >
                      <Icon as={FaListUl} boxSize="5" />
                    </Tooltip>
                  ),
                },
              ]}
              defaultValue="gallery"
              onChange={(val) => setViewMode(val as "gallery" | "list")}
            /> */}
          </Flex>
        </Flex>

        {renderContent()}
      </Stack>
    </>
  );
};

export default EmailSaved;
