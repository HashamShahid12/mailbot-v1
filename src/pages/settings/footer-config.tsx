import { Box, Flex, Image, RadioGroup, Stack, Button } from "@chakra-ui/react";
import UiBox from "@/components/ui/box";
import { UiText } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { getPoweredImages, updatePoweredImage } from "@/api/shop";
import { useShopStore } from "@/store/shop-store";

// Mock data for UI development
const MOCK_POWERED_IMAGES = [
  {
    id: "3ac19b2b-8d58-4755-804c-23e39835057e",
    url: "https://all-dev-development.s3.amazonaws.com/email-bot/email-bot-content/powered-4.jpeg",
    created_at: "2024-09-20T10:14:50.906Z",
    updated_at: "2024-09-20T10:14:50.906Z",
  },
  {
    id: "5bce4465-6269-4417-a13a-93eacd7fa382",
    url: "https://all-dev-development.s3.amazonaws.com/email-bot/email-bot-content/powered-1.jpeg",
    created_at: "2024-09-20T10:14:50.906Z",
    updated_at: "2024-09-20T10:14:50.906Z",
  },
  {
    id: "9a4c90ea-e72d-4252-ba00-ac0522bb6b94",
    url: "https://all-dev-development.s3.amazonaws.com/email-bot/email-bot-content/powered-3.jpeg",
    created_at: "2024-09-20T10:14:50.906Z",
    updated_at: "2024-09-20T10:14:50.906Z",
  },
  {
    id: "c00dfa35-c155-4bf7-bc32-8363a47c2cf8",
    url: "https://all-dev-development.s3.amazonaws.com/email-bot/email-bot-content/powered-2.jpeg",
    created_at: "2024-09-20T10:14:50.906Z",
    updated_at: "2024-09-20T10:14:50.906Z",
  },
];

const FooterConfig = () => {
  const { shop, setShop } = useShopStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [selectedImageId, setSelectedImageId] = useState<string>("1");

  const selectedImage = MOCK_POWERED_IMAGES.find(
    (img) => img.id === selectedImageId,
  );

  const handleImageChange = async (url: string) => {
    if (!shop) return;
    setIsUpdating(true);
    try {
      await updatePoweredImage({ powered_image_url: url });
      setShop({ ...shop, powered_image_url: url });
    } catch (error) {
      console.error("Failed to update powered image url", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEnableToggle = async (value: boolean) => {
    if (!shop) return;
    setIsUpdating(true);
    try {
      await updatePoweredImage({ powered_image_enabled: value });
      setShop({ ...shop, powered_image_enabled: value });
    } catch (error) {
      console.error("Failed to update powered image status", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const fetchPoweredImges = async () => {
      setIsLoading(true);
      try {
        const data = await getPoweredImages();
        console.log(data);
      } catch (error) {
        console.error("Error fetching powered images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPoweredImges();
  }, []);

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
      <Flex justify="space-between" align="center" mb="6">
        <UiText variant="subheading" fontWeight="semibold">
          Email Footer Configuration
        </UiText>
        <Button
          p="4"
          size="sm"
          colorScheme="blackAlpha"
          bg={shop?.powered_image_enabled ? "red" : "black"}
          color="white"
          onClick={() => handleEnableToggle(!shop?.powered_image_enabled)}
          loading={isUpdating}
          disabled={isUpdating || isLoading}
        >
          {shop?.powered_image_enabled ? "Disable" : "Enable"}
        </Button>
      </Flex>
      <UiBox>
        <Flex gap="8" direction={{ base: "column", md: "row" }}>
          {/* Left Side: Image Selection */}
          <Box flex="1" maxW={{ md: "400px" }}>
            <UiText mb="4" variant="heading2" fontWeight="medium">
              Email Footer Image
            </UiText>
            <RadioGroup.Root
              value={shop?.powered_image_url || ""}
              onValueChange={(val) => {
                console.log(val);

                handleImageChange(val.value);
              }}
            >
              <Stack gap="4">
                {MOCK_POWERED_IMAGES.map((img) => (
                  <RadioGroup.Item
                    key={img.id}
                    value={img.url}
                    display="flex"
                    alignItems="center"
                    gap="4"
                    cursor="pointer"
                  >
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator
                      borderWidth="1px"
                      borderColor="gray.400"
                      _checked={{
                        borderColor: "blue.500",
                        bg: "blue.500",
                        color: "white",
                      }}
                    />
                    <RadioGroup.ItemText>
                      <Box
                        border="1px solid"
                        borderColor={
                          selectedImage?.url === img.url
                            ? "blue.500"
                            : "transparent"
                        }
                        p="2"
                        borderRadius="md"
                        _hover={{ borderColor: "blue.300" }}
                        transition="all 0.2s"
                      >
                        <Image
                          src={img.url}
                          alt={img.id}
                          h="50px"
                          w="160px"
                          objectFit="cover"
                        />
                      </Box>
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                ))}
              </Stack>
            </RadioGroup.Root>
          </Box>

          {/* Right Side: Email Preview */}
          <Box flex="1">
            <Box
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              p="6"
              bg="white"
            >
              <UiText variant="heading2" mb="4">
                Email Preview
              </UiText>

              <Box bg="gray.100" p="8" borderRadius="md" textAlign="center">
                {/* Mock Email Content */}
                <Box bg="white" maxW="320px" mx="auto" shadow="sm">
                  <Box p="8" textAlign="left">
                    <UiText
                      fontSize="2xl"
                      fontWeight="bold"
                      lineHeight="1.2"
                      mb="2"
                    >
                      Spend &
                      <br />
                      Save
                    </UiText>
                    <UiText
                      fontSize="xs"
                      color="gray.700"
                      mb="6"
                      lineHeight="1.5"
                    >
                      Spend more and save more here at MyBag with up to 30% off
                      your favourite brands.
                    </UiText>
                    <Button
                      size="xs"
                      colorScheme="blackAlpha"
                      bg="black"
                      color="white"
                      px="6"
                      borderRadius="none"
                    >
                      SHOP NOW
                    </Button>
                  </Box>

                  <Box bg="black" p="6" color="white" fontSize="xs">
                    <Stack gap="4" align="center">
                      <Flex gap="3">
                        <Box w="2" h="2" bg="white" borderRadius="full" />
                        <Box w="2" h="2" bg="white" borderRadius="full" />
                        <Box w="2" h="2" bg="white" borderRadius="full" />
                      </Flex>
                      <UiText fontSize="xx-small" color="gray.400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequatur vitae.
                      </UiText>
                      <Stack
                        direction="row"
                        gap="3"
                        fontSize="xx-small"
                        color="gray.400"
                      >
                        <Box as="span">Visit Us</Box>
                        <Box as="span">|</Box>
                        <Box as="span">Privacy Policy</Box>
                        <Box as="span">|</Box>
                        <Box as="span">Terms of Use</Box>
                      </Stack>
                      <UiText fontSize="xx-small" color="gray.500">
                        No longer want to receive these emails?{" "}
                        <Box as="span" textDecoration="underline">
                          Unsubscribe
                        </Box>
                      </UiText>
                      <UiText fontSize="xx-small" color="gray.600">
                        Powered by Mailbot
                      </UiText>
                    </Stack>
                  </Box>
                </Box>

                {/* Selected Footer Image in Preview */}
                {shop?.powered_image_url && (
                  <Box mt="8" display="flex" justifyContent="center">
                    <Box
                      border="1px solid"
                      borderColor="blue.400"
                      p="2"
                      bg="white"
                    >
                      <Image
                        src={shop?.powered_image_url}
                        alt="selected_img"
                        h="30px"
                        objectFit="contain"
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Flex>
      </UiBox>
    </Box>
  );
};

export default FooterConfig;
