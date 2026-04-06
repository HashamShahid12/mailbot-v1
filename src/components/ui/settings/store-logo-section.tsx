import React, { useState } from "react";
import { Flex, Stack, Image, Spinner } from "@chakra-ui/react";
import UiBox from "@/components/ui/box";
import { UiText } from "@/components/ui/text";
import UiFileUpload from "@/components/ui/file-upload";
import UiButton from "@/components/ui/button";
import { uploadShopLogo } from "@/api/shop";
import { useShop, useShopStore } from "@/store/shop-store";
import { toaster } from "@/components/ui/toaster";

// interface StoreLogoSectionProps {
// //   logo: string | null;
// }

export const StoreLogoSection: React.FC = () => {
  const [isReplacing, setIsReplacing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { shop, setLogo } = useShop();

  const logo = shop?.logo;
  const showLogo = logo && !isReplacing;

  const handleFileUpload = async (details: { files: File[] }) => {
    const file = details.files[0];
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    console.log(file);

    formData.append("image", file);

    try {
      const data = await uploadShopLogo(formData);

      console.log(data, "data-- - -  - - - -  - - - - ");
      if (data) {
        if (shop) {
          setLogo(data.data.logo);
        }

        toaster.create({
          title: "Logo uploaded successfully",
          type: "success",
        });
        setIsReplacing(false);
      }
    } catch (error) {
      console.error("Failed to upload logo:", error);
      toaster.create({
        title: "Failed to upload logo",
        description: "Please try again.",
        type: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <UiBox>
      {showLogo ? (
        <>
          <Flex
            direction="column"
            align="center"
            justify="center"
            border="2px dashed"
            borderColor="gray.200"
            borderRadius="lg"
            p="10"
            bg="gray.50"
            minH="200px"
          >
            <Image
              src={logo}
              alt="Store Logo"
              maxH="100px"
              objectFit="contain"
              mb="4"
            />
            <UiButton
              uiVariant="outline"
              onClick={() => setIsReplacing(true)}
              size="sm"
            >
              Replace Logo
            </UiButton>
          </Flex>
          <Stack textAlign="center" mt="4" gap="1">
            <UiText variant="body" color="gray.700">
              Ideal size: 200x200 (px)
            </UiText>
            <UiText variant="body" color="gray.700">
              Allowed max file size: 2MB
            </UiText>
          </Stack>
        </>
      ) : (
        <Stack gap="4">
          {isUploading && (
            <Flex justify="center" align="center" p="4">
              <Spinner color="blue.500" />
              <UiText ml="2">Uploading...</UiText>
            </Flex>
          )}
          {!isUploading && (
            <UiFileUpload
              maxFiles={1}
              acceptedFormats=".png, .jpg"
              dropLabel="Drag and drop logo here"
              buttonLabel="Select Logo"
              helperText="Ideal size: 200x200 (px)"
              helperText2="Allowed max file size: 5MB"
              onFileAccept={handleFileUpload}
            />
          )}
          {isReplacing && !isUploading && (
            <UiButton
              size="sm"
              variant="ghost"
              onClick={() => setIsReplacing(false)}
              alignSelf="center"
            >
              Cancel
            </UiButton>
          )}
        </Stack>
      )}
    </UiBox>
  );
};
