import UiBox from "@/components/ui/box";
import { UiText } from "@/components/ui/text";
import { useShopStore } from "@/store/shop-store";
import { Box, Button } from "@chakra-ui/react";

const ThemeExtension = () => {
  const { shop } = useShopStore();

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
      <UiText variant="heading" mb="6">
        Theme Extension
      </UiText>
      <UiBox>
        <UiText variant="body" mb="6">
          You have to enable "MailBot" extension to the application able to work
          with your online store. Click the "Enable MailBot" button to enable
          the extension automatically
        </UiText>
        <Button
          onClick={() => {
            window.open(shop?.theme_link, "_blank");
          }}
          bg="black"
          color="white"
          p="4"
        >
          Enable Theme Extension
        </Button>
      </UiBox>
    </Box>
  );
};

export default ThemeExtension;
