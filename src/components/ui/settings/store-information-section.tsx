import React from "react";
import { Stack, Grid } from "@chakra-ui/react";
import UiBox from "@/components/ui/box";
import { UiText } from "@/components/ui/text";
import FormField from "@/components/ui/input";
import type { Shop } from "@/types/shop-types";

interface StoreInformationSectionProps {
  shop: Shop;
}

export const StoreInformationSection: React.FC<StoreInformationSectionProps> = ({
  shop,
}) => {
  return (
    <UiBox>
      <Stack gap="6">
        <UiText variant="subheading" fontWeight="semibold">
          Store information
        </UiText>

        <Stack gap="4">
          <FormField
            label="Store name"
            value={shop.name || shop.shop_name || ""}
            disabled
            bg="gray.100"
            border="none"
          />

          <FormField
            label="Country"
            value={shop.country || ""}
            disabled
            bg="gray.100"
            border="none"
          />

          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
            <FormField
              label="Address 1"
              value={shop.address1 || ""}
              disabled
              bg="gray.100"
              border="none"
            />
            <FormField
              label="Address 2"
              value={shop.address2 || ""}
              disabled
              bg="gray.100"
              border="none"
            />
          </Grid>

          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
            <FormField
              label="City"
              value={shop.city || ""}
              disabled
              bg="gray.100"
              border="none"
            />
            <FormField
              label="Province"
              value={shop.province || ""}
              disabled
              bg="gray.100"
              border="none"
            />
          </Grid>

          <FormField
            label="Currency"
            value={shop.currency || ""}
            disabled
            bg="gray.100"
            border="none"
          />
        </Stack>
      </Stack>
    </UiBox>
  );
};
