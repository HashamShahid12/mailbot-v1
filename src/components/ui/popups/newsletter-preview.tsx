import { Box, Flex, Image, IconButton, Stack } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { UiText } from "@/components/ui/text";
import FormField from "@/components/ui/input";
import { useShopStore } from "@/store/shop-store";

interface NewsletterPreviewProps {
  config: {
    title: string;
    description: string;
    buttonText: string;
    buttonTextColor: string;
    buttonBgColor: string;
    image: string;
    imagePosition: string;
  };
}

const NewsletterPreview = ({ config }: NewsletterPreviewProps) => {
  const { shop } = useShopStore();

  return (
    <Box
      flex="1"
      bg="gray.300"
      borderRadius="lg"
      p="8"
      position="relative"
      h="full" // Take full height
      overflow="hidden" // Prevent scroll
    >
      <Flex
        h="full"
        align="center"
        justify="center"
        // minH="600px" // Removed minH to fit container
      >
        {/* Popup Preview Card */}
        <Flex
          bg="white"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="xl"
          w="800px"
          h="450px"
          direction={config.imagePosition === "Right" ? "row-reverse" : "row"}
        >
          {/* Image Side */}
          <Box w="40%" bg="gray.100" position="relative">
            {config.image ? (
              <Image
                src={config.image}
                alt="Background"
                h="full"
                w="full"
                objectFit="cover"
              />
            ) : (
              <Flex h="full" align="center" justify="center" color="gray.400">
                <UiText>No Image</UiText>
              </Flex>
            )}
          </Box>

          {/* Right Content Side */}
          <Box w="60%" p="8" position="relative">
            <IconButton
              aria-label="Close"
              position="absolute"
              top="4"
              right="4"
              size="sm"
              variant="ghost"
              rounded="full"
            >
              <IoClose />
            </IconButton>

            <Stack gap="6" h="full" justify="center" align="center">
              {/* Logo */}
              {shop?.logo && (
                <Image
                  src={shop.logo}
                  alt="Logo"
                  h="50px"
                  objectFit="contain"
                  mb="2"
                />
              )}
              {!shop?.logo && (
                <UiText
                  fontWeight="bold"
                  fontSize="2xl"
                  fontFamily="cursive" // Mocking a logo text style
                >
                  {shop?.name || "Shop Name"}
                </UiText>
              )}

              <Box textAlign="center">
                <UiText fontWeight="bold" fontSize="lg" mb="2">
                  {config.title}
                </UiText>
                <UiText color="gray.700" fontSize="sm" lineHeight="tall">
                  {config.description}
                </UiText>
              </Box>

              <Stack w="full" gap="3">
                <FormField placeholder="First name" bg="gray.50" />
                <FormField placeholder="Enter your email" bg="gray.50" />
                <Box
                  as="button"
                  w="full"
                  py="3"
                  px="4"
                  borderRadius="md"
                  fontWeight="medium"
                  fontSize="sm"
                  bg={config.buttonBgColor}
                  color={config.buttonTextColor}
                  _hover={{ opacity: 0.9 }}
                  transition="all 0.2s"
                >
                  {config.buttonText}
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NewsletterPreview;
