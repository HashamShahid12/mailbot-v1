import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiTrendingUp } from "react-icons/fi";
import contentProductSetting from "../../assets/contnet-product-setting.svg";
import contentProductBook from "../../assets/contnet-product-setting.svg";
import contentProductUpdating from "../../assets/contnet-product-setting.svg";
import { BiRightArrowAlt } from "react-icons/bi";

const Products = () => {
  const navigate = useNavigate();
  const reportCards = [
    {
      image: contentProductSetting,
      title: "Setting up an Integration",
      description:
        "Set up an integration to use Product Feeds and Product Blocks in emails.",
      href: "/flows",
    },
    {
      image: contentProductBook,
      title: "Add Custom Products",
      description:
        "Add custom Products to use Products Feeds and Product Blocks in emails.",
      href: "#",
    },
    {
      image: contentProductUpdating,
      title: "Updating Your Items",
      description:
        "Learn how to review and update your products to send your latest items.",
      href: "#",
    },
  ];
  return (
    <>
      <Box position="relative">
        <Box
          h="md"
          bg="gray.100"
          w="full"
          overflowX="auto"
          position="absolute"
        ></Box>
        <Box
          w="5xl"
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          py="20"
        >
          <UiText variant="heading2" fontWeight="semibold" mb="3">
            Products
          </UiText>
          <UiText variant="heading" fontWeight="semibold" mb="3">
            Send product emails with confidence
          </UiText>
          <UiText mb="7">
            Review or update your products to ensure you send emails with your
            latest (and greatest) items.
          </UiText>
          <UiText variant="caption">
            <Icon as={FiTrendingUp} boxSize="5" mr="3" /> Mailbot users update
            over 100 million items per month using Products.
          </UiText>
          <Flex gap="3" my="6">
            <UiButton uiVariant="solid">Set up an Integration</UiButton>
            <UiButton uiVariant="outline" bg="white">
              Add Custom Products
            </UiButton>
          </Flex>
          <Box bg="white" border="sm" borderRadius="md" borderColor="gray.300">
            <Box p="4">
              <UiText fontWeight="semibold">
                Get to know more about Products inside of Mailbot
              </UiText>
              <UiText color="gray.400">
                Check out a few of our articles to get you up to speed about
                your products inside of Mailbot.
              </UiText>
            </Box>
            <Flex p="6" pt="4" pr="4" gap="3">
              {reportCards.map((card, index) => (
                <Box
                  w="sm"
                  key={index}
                  border="sm"
                  cursor="button"
                  overflow="hidden"
                  borderRadius="md"
                  borderColor="gray.300"
                  onClick={() => {
                    navigate(card.href);
                  }}
                >
                  <Image src={card.image} w="full" alt="Product Image" />
                  <Flex align="center">
                    <UiText m="3" fontWeight="semibold">
                      {card.title}
                    </UiText>
                    <Icon as={BiRightArrowAlt} boxSize="6" />
                  </Flex>
                  <UiText m="3" minH="8xs" color="gray.400">
                    {card.description}
                  </UiText>
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Products;
