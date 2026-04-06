import { Box, Stack } from "@chakra-ui/react";
import { UiText } from "@/components/ui/text";
import { useShop } from "@/store/shop-store";
import { StoreLogoSection } from "@/components/ui/settings/store-logo-section";
import { WarmupPeriodSection } from "@/components/ui/settings/warmup-period-section";
import { StoreInformationSection } from "@/components/ui/settings/store-information-section";
import { getWarmupData } from "@/api/shop";
import { useEffect } from "react";
import type { WarmupData } from "@/types/shop-types";

const StoreInfo = () => {
  const { shop, setWarmupData, warmupData } = useShop();

  if (!shop) {
    return (
      <Box p="4">
        <UiText>Loading shop information...</UiText>
      </Box>
    );
  }

  useEffect(() => {
    const fetchWarmupData = async () => {
      try {
        const response = await getWarmupData();
        if (response.success && response.data) {
          // Assuming response.data matches WarmupData structure,
          // otherwise we might need to cast or transform it.
          // Based on user input, we treat it as matching.
          setWarmupData(response.data as unknown as WarmupData);
        }
      } catch (error) {
        console.error("Failed to fetch warmup data", error);
      }
    };
    fetchWarmupData();
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
      <Stack gap="6" maxW="container.lg" mx="auto" pb="10">
        <UiText variant="heading2">Store Info</UiText>

        {/* Logo Section */}
        <StoreLogoSection />

        {/* Warmup Period Section */}
        {warmupData && <WarmupPeriodSection warmUpDetails={warmupData} />}

        {/* Store Information Form Section */}
        <StoreInformationSection shop={shop} />
      </Stack>
    </Box>
  );
};

export default StoreInfo;
