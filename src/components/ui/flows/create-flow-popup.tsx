import React, { useState, useEffect } from "react";
import { PrimitiveDialog } from "../dailog-model";
import UiButton from "../button";
import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { UiText } from "../text";
import { UiBadge } from "../badge";
import FormField from "../input";
import { MdInfo } from "react-icons/md";
import UiTextLink from "../text-link";
import shopifyIcon from "../../../assets/shopifyicon.svg";
import TagDropdown2 from "../dropdown/tag-dropdown2";

interface CreateFlowPopupProps {
  editDetailsOpen: boolean;
  setEditDetailsOpen: (open: boolean) => void;
  title: string;
  subtitle: String;
  description: string;
}

const CreateFlowPopup: React.FC<CreateFlowPopupProps> = ({
  editDetailsOpen,
  setEditDetailsOpen,
  title,
  subtitle,
  description,
}) => {
  const [flowName, setFlowName] = useState(`${title} - ${subtitle}`);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (editDetailsOpen) {
      setFlowName(`${title} - ${subtitle}`);
      setSelectedTags([]);
    }
  }, [editDetailsOpen, title, subtitle]);

  return (
    <>
      <PrimitiveDialog
        open={editDetailsOpen}
        onOpenChange={setEditDetailsOpen}
        size="xl"
        title={title}
        pr="0 !important"
        footer={
          <>
            <Flex gap="3" pr="5">
              <UiButton
                uiVariant="outline"
                onClick={() => setEditDetailsOpen(false)}
              >
                Cancel
              </UiButton>
              <UiButton uiVariant="solid" disabled>
                Use template
              </UiButton>
            </Flex>
          </>
        }
      >
        <Flex h="70vh" overflowY="auto" pr="5">
          <Box w="3/10" minW="3/10" mt="3" pr="5" flexShrink="1">
            <UiText mb="1" variant="caption" fontWeight="semibold">
              Description
            </UiText>
            <UiText
              variant="caption"
              color="blackAlpha.400"
              fontWeight="semibold"
            >
              {description}
            </UiText>
            <Flex mt="2" gap="2" flexFlow="wrap">
              <UiBadge status="pending" icon>
                Shopify
              </UiBadge>
              <UiBadge status="pending" icon>
                Nurture Prospects
              </UiBadge>
              <UiBadge status="pending" icon>
                Convert Sales
              </UiBadge>
              <UiBadge status="pending" icon>
                Abandoned Cart
              </UiBadge>
              <UiBadge status="pending" icon>
                Email and SMS
              </UiBadge>
              <UiBadge status="pending" icon>
                Prevent lost sales
              </UiBadge>
              <UiBadge status="pending" icon>
                EN
              </UiBadge>
            </Flex>
            <Box mt="5" py="5" borderTop="sm" borderColor="gray.300">
              <Flex direction="column" gap="5">
                <FormField
                  label="Name"
                  fontSize="sm"
                  input
                  placeholder="Name your flow"
                  value={flowName}
                  onChange={(_, val) => setFlowName(val)}
                />
                <TagDropdown2
                  label="Tag"
                  buttonWidth="full"
                  menuWidth="3xs"
                  options={[
                    { label: "Sales", value: "sales" },
                    { label: "Email", value: "email" },
                    { label: "SMS", value: "sms" },
                  ]}
                  selectedTags={selectedTags}
                  onTagsChange={setSelectedTags}
                />
              </Flex>
              <UiText my="1" pt="10" variant="caption" fontWeight="semibold">
                Trigger
              </UiText>
              <Flex gap="3" pb="5">
                <Image src={shopifyIcon} w="6" />
                <UiText variant="caption" color="blackAlpha.400">
                  Checkout Started
                </UiText>
              </Flex>
              <UiText mb="1" variant="caption" fontWeight="semibold">
                Prerequisites
              </UiText>
              <Flex gap="3">
                <Icon as={MdInfo} boxSize="6" color="info.200" />
                <UiText variant="caption" color="blackAlpha.400">
                  To get started, enable your Shopify integration{" "}
                  <UiTextLink value="here." />
                </UiText>
              </Flex>
            </Box>
          </Box>
          <Box minW="0" w="7/10" h="lg" mt="3" bg="black"></Box>
        </Flex>
      </PrimitiveDialog>
    </>
  );
};

export default CreateFlowPopup;
