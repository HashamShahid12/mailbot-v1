import { UiText } from "@/components/ui/text";
import {
  Box,
  Flex,
  Stack,
  Image,
  IconButton,
  Grid,
  GridItem,
  Skeleton,
  Spinner,
  Button,
} from "@chakra-ui/react";
import UiBox from "@/components/ui/box";
import FormField from "@/components/ui/input";
import UiFileUpload from "@/components/ui/file-upload";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { UiSelect } from "@/components/ui/select";
import {
  UpdateNewsletterById,
  enableNewsletterPopup,
  getNewsletterSettings,
  uploadTemplateImage,
} from "@/api/newsletter-settings";
import { uploadShopLogo } from "@/api/shop";
import { toaster } from "@/components/ui/toaster";
import { useShopStore } from "@/store/shop-store";
import NewsletterPreview from "./newsletter-preview";
import { hidePromptTimingsOptions, promptTimingsOptions } from "@/constants";

// Helper component for Position Grid
const PositionGrid = ({
  type,
  value,
  onChange,
}: {
  type: "desktop" | "mobile";
  value: string;
  onChange: (val: string) => void;
}) => {
  const isDesktop = type === "desktop";
  const rows = isDesktop ? 3 : 3;
  const cols = isDesktop ? 3 : 1;

  // Map grid indices to position values
  const getPositionValue = (row: number, col: number) => {
    if (!isDesktop) {
      // Mobile: Top, Center, Bottom
      if (row === 0) return "Top";
      if (row === 1) return "Center";
      return "Bottom";
    }
    // Desktop: Top-left, Top-center, Top-right, etc.
    const vPos = ["Top", "Center", "Bottom"][row];
    const hPos = ["left", "center", "right"][col];
    return `${vPos}-${hPos}`;
  };

  const isSelected = (row: number, col: number) => {
    return getPositionValue(row, col).toLowerCase() === value.toLowerCase();
  };

  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      p="2"
      w="fit-content"
    >
      <Grid
        templateRows={`repeat(${rows}, 1fr)`}
        templateColumns={`repeat(${cols}, 1fr)`}
        gap="2"
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const selected = isSelected(r, c);
            return (
              <GridItem
                key={`${r}-${c}`}
                w="10"
                h="6"
                bg={selected ? "gray.800" : "gray.200"}
                borderRadius="sm"
                cursor="pointer"
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => onChange(getPositionValue(r, c))}
                _hover={{ bg: selected ? "gray.700" : "gray.300" }}
              >
                {selected && (
                  <Box as="span" color="white" fontSize="xs">
                    ✓
                  </Box>
                )}
              </GridItem>
            );
          }),
        )}
      </Grid>
    </Box>
  );
};

const EmailPopupConfig = () => {
  const { shop } = useShopStore();

  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBg, setIsUploadingBg] = useState(false);
  const [config, setConfig] = useState({
    id: "",
    title: "Personalized Recommendations",
    description:
      "Receive personalized product recommendations tailored just for you.",
    buttonText: "Get Recommendations",
    buttonTextColor: "#FFFFFF",
    buttonBgColor: "#2563EB",
    image:
      "https://plus.unsplash.com/premium_photo-1673548917228-3729938b8d23?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Default mock image
    imagePosition: "Left",
    desktopDelay: "5",
    mobileDelay: "10",
    maxCountPerSession: "20",
    frequencyDays: "2",
    autoHideSeconds: "60",
    desktopPosition: "Top-center",
    mobilePosition: "Top",
    enable: false,
  });

  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = async (
    key: "logo" | "image",
    details: { files: File[] },
  ) => {
    const file = details.files[0];
    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    try {
      if (key === "logo") {
        setIsUploadingLogo(true);
        const data = await uploadShopLogo(formData);
        if (data?.data?.logo) {
          handleConfigChange(key, data.data.logo);
          toaster.create({
            title: "Logo uploaded successfully",
            type: "success",
          });
        }
      } else {
        setIsUploadingBg(true);
        const res = await uploadTemplateImage(formData);
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        if (data?.data?.response) {
          handleConfigChange(key, data.data.response);
          toaster.create({
            title: "Background image uploaded successfully",
            type: "success",
          });
        }
      }
    } catch (error) {
      console.error(`Error uploading ${key}:`, error);
      toaster.create({
        title: `Error uploading ${key === "logo" ? "logo" : "background image"}`,
        type: "error",
      });
    } finally {
      if (key === "logo") setIsUploadingLogo(false);
      else setIsUploadingBg(false);
    }
  };

  const fetchNewsletterSettings = async () => {
    try {
      const resp = await getNewsletterSettings();
      // @ts-ignore
      const data = resp.data;
      // @ts-ignore
      const optinForm = data?.settings?.find(
        (setting: any) => setting.type === "optin_form",
      );

      console.log(optinForm, "newsletterdata...");

      if (optinForm) {
        setConfig({
          id: optinForm.id,
          title: optinForm.custom_options?.title || "",
          description: optinForm.custom_options?.description || "",
          buttonText: optinForm.body?.heading || "Get Recommendations", // Mapping heading to button text as placeholder or if incorrect mapping let me know
          buttonTextColor: optinForm.custom_options?.textColor || "#FFFFFF",
          buttonBgColor: optinForm.custom_options?.backgroundColor || "#2563EB",
          image: optinForm.image || "",
          imagePosition:
            optinForm.image_position?.charAt(0).toUpperCase() +
              optinForm.image_position?.slice(1).toLowerCase() || "Left",
          desktopDelay: optinForm.desktop_timings?.toString() || "5",
          mobileDelay: optinForm.mobile_timings?.toString() || "10",
          maxCountPerSession: optinForm.max_count?.toString() || "20",
          frequencyDays: optinForm.frequency?.toString() || "2",
          autoHideSeconds: optinForm.hide_prompt?.toString() || "60",
          desktopPosition:
            optinForm.desktop_position?.charAt(0).toUpperCase() +
              optinForm.desktop_position?.slice(1).toLowerCase() ||
            "Top-center",
          mobilePosition:
            optinForm.mobile_position?.charAt(0).toUpperCase() +
              optinForm.mobile_position?.slice(1).toLowerCase() || "Top",
          enable: optinForm.enable || false,
        });
      }
    } catch (error) {
      console.error("Error fetching newsletter settings:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchNewsletterSettings();
  }, []);

  const createPayload = (overrideConfig: Partial<typeof config> = {}) => {
    const currentConfig = { ...config, ...overrideConfig };
    return {
      desktop_timings: parseInt(currentConfig.desktopDelay),
      mobile_timings: parseInt(currentConfig.mobileDelay),
      max_count: parseInt(currentConfig.maxCountPerSession),
      frequency: parseInt(currentConfig.frequencyDays),
      hide_prompt: parseInt(currentConfig.autoHideSeconds),
      desktop_position: currentConfig.desktopPosition.toUpperCase(),
      mobile_position: currentConfig.mobilePosition.toUpperCase(),
      image: currentConfig.image,
      image_position: currentConfig.imagePosition.toUpperCase(),
      custom_options: {
        title: currentConfig.title,
        description: currentConfig.description,
        textColor: currentConfig.buttonTextColor,
        backgroundColor: currentConfig.buttonBgColor,
      },
      is_custom_prompt: false,
      // body: {
      //   heading: currentConfig.buttonText,
      //   subheading: currentConfig.description,
      // },
    };
  };

  const handleSave = async () => {
    console.log(config, "config...");
    if (!config.id) return;
    setIsLoading(true);
    try {
      const payload = createPayload();
      await UpdateNewsletterById(config.id, payload);
      toaster.create({
        title: "Settings saved",
        type: "success",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toaster.create({
        title: "Error saving settings",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEnable = async (val: boolean) => {
    if (!config.id) return;
    // Optimistic update

    try {
      // Send full payload with new enable state to ensure consistency
      const payload = createPayload({ enable: val });
      await enableNewsletterPopup(config.id, val);
      toaster.create({
        title: val ? "Popup enabled" : "Popup disabled",
        type: "success",
      });
      handleConfigChange("enable", val);
    } catch (error) {
      console.error("Error toggling enable:", error);
      // Revert on error
      handleConfigChange("enable", !val);
      toaster.create({
        title: "Error updating status",
        type: "error",
      });
    }
  };

  return (
    <Box
      minW="940px"
      w="full"
      overflowX="auto"
      maxW="7xl"
      mx="auto"
      px="6"
      py="5"
    >
      <Flex justify="flex-end" gap="4" mb="4">
        <Button
          variant="solid"
          bg={config.enable ? "red" : "green"}
          color="white"
          p="4"
          onClick={() => toggleEnable(!config.enable)}
          loading={isLoading}
        >
          {config.enable ? "Disable" : "Enable"}
        </Button>
        <Button
          color="white"
          bg="black"
          p="4"
          onClick={handleSave}
          loading={isLoading}
        >
          Save Changes
        </Button>
      </Flex>
      <Flex
        gap="6"
        direction={{ base: "column", xl: "row" }}
        mt="6"
        h="calc(100vh - 200px)" // Fixed height for the container
        overflow="hidden" // Prevent container scroll
      >
        {isFetching ? (
          <>
            <UiBox flex="1" maxW={{ xl: "400px" }} h="full" pr="2">
              <Stack gap="6">
                <Skeleton height="200px" borderRadius="md" />
                <Skeleton height="40px" borderRadius="md" />
                <Skeleton height="80px" borderRadius="md" />
                <Skeleton height="150px" borderRadius="md" />
                <Skeleton height="100px" borderRadius="md" />
              </Stack>
            </UiBox>
            <Box
              flex="1"
              bg="gray.300"
              borderRadius="lg"
              p="8"
              position="relative"
              h="full"
            >
              <Flex h="full" align="center" justify="center">
                <Skeleton height="450px" width="800px" borderRadius="xl" />
              </Flex>
            </Box>
          </>
        ) : (
          <>
            {/* Left Panel: Configuration */}
            <UiBox
              flex="1"
              maxW={{ xl: "400px" }}
              overflowY="auto" // Enable scroll for settings
              h="full" // Take full height of container
              pr="2" // Add some padding for scrollbar
            >
              <Stack gap="6">
                {/* Logo Upload */}
                <Box>
                  <UiText fontWeight="medium" mb="2">
                    Shop Logo
                  </UiText>
                  {isUploadingLogo ? (
                    <Flex
                      justify="center"
                      align="center"
                      p="4"
                      border="1px dashed"
                      borderColor="gray.300"
                      borderRadius="md"
                      h="120px"
                    >
                      <Spinner color="blue.500" />
                      <UiText ml="2">Uploading Logo...</UiText>
                    </Flex>
                  ) : (
                    <Stack gap="3">
                      {shop?.logo && (
                        <Flex
                          p="4"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="md"
                          align="center"
                          justify="space-between"
                        >
                          <Image
                            src={shop.logo}
                            alt="Shop Logo"
                            maxH="60px"
                            objectFit="contain"
                          />
                          <IconButton
                            aria-label="Remove logo"
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => {
                              // We can't really "remove" it from shop store easily without an API
                              // But we can trigger re-upload
                            }}
                          >
                            {/* <IoClose /> */}
                          </IconButton>
                        </Flex>
                      )}
                      <UiFileUpload
                        dropLabel={shop?.logo ? "Change Logo" : "Upload Logo"}
                        helperText="Ideal size: 200x200 (px)"
                        helperText2="Allowed max file size: 5MB"
                        acceptedFormats="image/*"
                        onFileAccept={(details) =>
                          handleFileUpload("logo", details)
                        }
                      />
                    </Stack>
                  )}
                </Box>

                {/* Title */}
                <FormField
                  label="Title"
                  value={config.title}
                  onChange={(name, value) => handleConfigChange("title", value)}
                />

                {/* Description */}
                <FormField
                  label="Description"
                  value={config.description}
                  onChange={(name, value) =>
                    handleConfigChange("description", value)
                  }
                />

                {/* Allow Button Configuration */}
                <Box>
                  <UiText fontWeight="medium" mb="2">
                    Allow Button
                  </UiText>
                  <Stack gap="3">
                    <FormField
                      label="Button Text"
                      value={config.buttonText}
                      onChange={(name, value) =>
                        handleConfigChange("buttonText", value)
                      }
                    />
                    <Flex gap="4">
                      <FormField
                        label="Button text color"
                        type="color"
                        value={config.buttonTextColor}
                        onChange={(name, value) =>
                          handleConfigChange("buttonTextColor", value)
                        }
                      />
                      <FormField
                        label="Button background color"
                        type="color"
                        value={config.buttonBgColor}
                        onChange={(name, value) =>
                          handleConfigChange("buttonBgColor", value)
                        }
                      />
                    </Flex>
                  </Stack>
                </Box>

                {/* Background Image Upload */}
                <Box>
                  <UiText fontWeight="medium" mb="2">
                    Background Image
                  </UiText>
                  {isUploadingBg ? (
                    <Flex
                      justify="center"
                      align="center"
                      p="4"
                      border="1px dashed"
                      borderColor="gray.300"
                      borderRadius="md"
                      h="120px"
                    >
                      <Spinner color="blue.500" />
                      <UiText ml="2">Uploading Background...</UiText>
                    </Flex>
                  ) : (
                    <Stack gap="3">
                      {config.image && (
                        <Flex
                          p="4"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="md"
                          align="center"
                          justify="space-between"
                        >
                          <Image
                            src={config.image}
                            alt="Background Preview"
                            boxSize="60px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                          <IconButton
                            aria-label="Remove image"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleConfigChange("image", "")}
                          >
                            <IoClose />
                          </IconButton>
                        </Flex>
                      )}
                      <UiFileUpload
                        dropLabel={
                          config.image
                            ? "Change Background Image"
                            : "Upload Background Image"
                        }
                        acceptedFormats="image/*"
                        onFileAccept={(details) =>
                          handleFileUpload("image", details)
                        }
                      />
                    </Stack>
                  )}
                </Box>

                {/* Image Position */}
                <Box>
                  <UiSelect
                    label="Image position"
                    showLabel
                    width="full"
                    items={[
                      { label: "Left", value: "Left" },
                      { label: "Right", value: "Right" },
                    ]}
                    selectedItem={config.imagePosition}
                    onItemChange={(val) =>
                      handleConfigChange("imagePosition", val)
                    }
                  />
                </Box>

                {/* Prompt Timings */}
                <Box>
                  <UiText variant="subheading" fontWeight="bold" mb="1">
                    Prompt timings
                  </UiText>
                  <UiText color="gray.500" fontSize="sm" mb="4">
                    Set a timer according to when you want the prompt to be
                    shown
                  </UiText>
                  <Stack gap="4">
                    <Box>
                      <UiSelect
                        label="Desktop"
                        showLabel
                        width="full"
                        items={promptTimingsOptions.map((opt) => ({
                          label: opt.label,
                          value: String(opt.value),
                        }))}
                        selectedItem={String(config.desktopDelay)}
                        onItemChange={(val) =>
                          handleConfigChange("desktopDelay", val)
                        }
                        description={`Show prompt after ${config.desktopDelay} seconds`}
                      />
                    </Box>
                    <Box>
                      <UiSelect
                        label="Mobile"
                        showLabel
                        width="full"
                        items={promptTimingsOptions.map((opt) => ({
                          label: opt.label,
                          value: String(opt.value),
                        }))}
                        selectedItem={String(config.mobileDelay)}
                        onItemChange={(val) =>
                          handleConfigChange("mobileDelay", val)
                        }
                        description={`Show prompt after ${config.mobileDelay} seconds`}
                      />
                    </Box>
                    <Box>
                      <FormField
                        label="Max count per session"
                        type="number"
                        value={config.maxCountPerSession}
                        onChange={(name, val) =>
                          handleConfigChange("maxCountPerSession", val)
                        }
                        description={`Show the prompt maximum ${config.maxCountPerSession} times per session`}
                      />
                    </Box>
                    <Box>
                      <FormField
                        label="Frequency"
                        type="number"
                        value={config.frequencyDays}
                        onChange={(name, val) =>
                          handleConfigChange("frequencyDays", val)
                        }
                        description={`Hide the prompt for ${config.frequencyDays} days after it is shown to a visitor`}
                      />
                    </Box>
                    <Box>
                      <UiSelect
                        label="Hide Prompt"
                        showLabel
                        width="full"
                        items={hidePromptTimingsOptions.map((opt) => ({
                          label: opt.label,
                          value: String(opt.value),
                        }))}
                        selectedItem={String(config.autoHideSeconds)}
                        onItemChange={(val) =>
                          handleConfigChange("autoHideSeconds", val)
                        }
                        description={`Hide the prompt after ${config.autoHideSeconds} seconds`}
                      />
                    </Box>
                  </Stack>
                </Box>

                {/* Prompt Position */}
                <Box>
                  <UiText variant="subheading" fontWeight="bold" mb="1">
                    Prompt position
                  </UiText>
                  <UiText color="gray.700" fontSize="sm" mb="4">
                    Customize your prompt placement on your website
                  </UiText>

                  <Flex gap="6">
                    {/* Desktop Position */}
                    <Box>
                      <UiText fontSize="sm" fontWeight="medium" mb="2">
                        Desktop
                      </UiText>
                      <UiSelect
                        width="140px"
                        mb="2"
                        items={[
                          { label: "Top-left", value: "Top-left" },
                          { label: "Top-center", value: "Top-center" },
                          { label: "Top-right", value: "Top-right" },
                          { label: "Center-left", value: "Center-left" },
                          { label: "Center-center", value: "Center-center" },
                          { label: "Center-right", value: "Center-right" },
                          { label: "Bottom-left", value: "Bottom-left" },
                          { label: "Bottom-center", value: "Bottom-center" },
                          { label: "Bottom-right", value: "Bottom-right" },
                        ]}
                        selectedItem={config.desktopPosition}
                        onItemChange={(val) =>
                          handleConfigChange("desktopPosition", val)
                        }
                      />
                      <PositionGrid
                        type="desktop"
                        value={config.desktopPosition}
                        onChange={(val) =>
                          handleConfigChange("desktopPosition", val)
                        }
                      />
                    </Box>

                    {/* Mobile Position */}
                    <Box>
                      <UiText fontSize="sm" fontWeight="medium" mb="2">
                        Mobile
                      </UiText>
                      <UiSelect
                        width="100px"
                        mb="2"
                        items={[
                          { label: "Top", value: "Top" },
                          { label: "Center", value: "Center" },
                          { label: "Bottom", value: "Bottom" },
                        ]}
                        selectedItem={config.mobilePosition}
                        onItemChange={(val) =>
                          handleConfigChange("mobilePosition", val)
                        }
                      />
                      <PositionGrid
                        type="mobile"
                        value={config.mobilePosition}
                        onChange={(val) =>
                          handleConfigChange("mobilePosition", val)
                        }
                      />
                    </Box>
                  </Flex>
                </Box>
              </Stack>
            </UiBox>

            {/* Right Panel: Preview */}
            <NewsletterPreview config={config} />
          </>
        )}
      </Flex>
    </Box>
  );
};

export default EmailPopupConfig;
