import { UiTab } from "@/components/ui/tabs";
import { UiText } from "@/components/ui/text";
import { Box, Flex } from "@chakra-ui/react";
import Brand from "./brand";
import Default from "./default";
import ImagesLibrary from "./images-library";

const ImagesBrand = () => {
  const tabs = [
    { value: "images", label: "Images" },
    { value: "brand", label: "Brand" },
    { value: "defaults", label: "Defaults" },
  ];

  const tabContent = {
    images: <ImagesLibrary />,
    brand: <Brand />,
    defaults: <Default />,
  };
  return (
    <>
      <Flex px="5" py="3" bg="white" justify="space-between" align="center">
        <Box>
          <UiText variant="heading2">Images & brand</UiText>
          <UiText variant="caption">
            Create and send messages faster by adding and assigning your primary
            brand assets.
          </UiText>
        </Box>
      </Flex>
      <UiTab
        tabs={tabs}
        defaultValue="brand"
        variant="minimal"
        tabContent={tabContent}
      />
    </>
  );
};

export default ImagesBrand;
