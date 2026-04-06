import React, { useEffect, useMemo, useState } from "react";
import UiBox from "../box";
import { UiText } from "../text";
import UiButton from "../button";
import { Box, HStack, Image, Stack } from "@chakra-ui/react";
import { SelectableCardGroup } from "../selectable-card-group";
import { getPoweredImages } from "@/api/shop";

const MOCK_POWERED_IMAGES = [
  {
    id: "3ac19b2b-8d58-4755-804c-23e39835057e",
    name: "Transparent",
    url: "https://all-dev-development.s3.amazonaws.com/email-bot/email-bot-content/powered-4.jpeg",
    created_at: "2024-09-20T10:14:50.906Z",
    updated_at: "2024-09-20T10:14:50.906Z",
  },
  {
    id: "5bce4465-6269-4417-a13a-93eacd7fa382",
    name: "Blue",
    url: "https://all-dev-development.s3.amazonaws.com/email-bot/email-bot-content/powered-1.jpeg",
    created_at: "2024-09-20T10:14:50.906Z",
    updated_at: "2024-09-20T10:14:50.906Z",
  },
  {
    id: "9a4c90ea-e72d-4252-ba00-ac0522bb6b94",
    name: "Black",
    url: "https://all-dev-development.s3.amazonaws.com/email-bot/email-bot-content/powered-3.jpeg",
    created_at: "2024-09-20T10:14:50.906Z",
    updated_at: "2024-09-20T10:14:50.906Z",
  },
  {
    id: "c00dfa35-c155-4bf7-bc32-8363a47c2cf8",
    name: "Purple",
    url: "https://all-dev-development.s3.amazonaws.com/email-bot/email-bot-content/powered-2.jpeg",
    created_at: "2024-09-20T10:14:50.906Z",
    updated_at: "2024-09-20T10:14:50.906Z",
  },
];

const EmailSenderInfo = () => {
  const [selected, setSelected] = useState(MOCK_POWERED_IMAGES[0]?.name ?? "");

  const options = useMemo(
    () =>
      MOCK_POWERED_IMAGES.map((item) => ({
        label: item.name,
        value: item.name,
        description: (
          <Box pt={2}>
            <Image
              src={item.url}
              alt={`${item.name} powered footer preview`}
              maxW="260px"
              w="full"
              h="auto"
              borderRadius="sm"
              border="sm"
              borderColor="blackAlpha.100"
            />
          </Box>
        ),
      })),
    [],
  );

  const handleSelectionChange = (value: string) => {
    setSelected(value);
    const selectedImage = MOCK_POWERED_IMAGES.find(
      (item) => item.name === value,
    );
    console.log("Selected powered image:", selectedImage);
  };

  useEffect(() => {
    const fetchPoweredImges = async () => {
      try {
        const data = await getPoweredImages();
        console.log(data);
      } catch (error) {
        console.error("Error fetching powered images:", error);
      } finally {
        //   setIsLoading(false);
      }
    };
    fetchPoweredImges();
  }, []);

  return (
    <Stack maxW={"720px"}>
      <HStack justifyContent="space-between">
        <UiText variant="heading2">Sender information</UiText>
        <UiButton uiVariant="solid">Save</UiButton>
      </HStack>
      <UiBox
        showLayout
        heading="Mailbot footer"
        actions={
          <>
            <UiButton uiVariant="outline">Upgrade Plan</UiButton>
          </>
        }
      >
        <UiText mb={2} variant="body">
          By default, all accounts on a free plan have Mailbot branding
          displayed below the footer of emails. You can change this branding by
          selecting from one of the following options. If you would like to
          remove the Mailbot branding entirely, you can upgrade in billing.
        </UiText>

        <SelectableCardGroup
          value={selected}
          onChange={handleSelectionChange}
          options={options}
        />
      </UiBox>
    </Stack>
  );
};

export default EmailSenderInfo;
