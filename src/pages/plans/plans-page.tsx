import { Box, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPlans, subscribeExtraEmails } from "@/api/plans";
import type { PlansResponse } from "@/api/plans";
import { PlansCard } from "@/components/ui/plans/plans-card";
import { UiText } from "@/components/ui/text";
import UiButton from "@/components/ui/button";
import { UiSelect } from "@/components/ui/select";
import { PrimitiveDialog } from "@/components/ui/dailog-model";
import { useShopStore } from "@/store/shop-store";
import { businessEmailsOptions, enterpriseEmailsOptions } from "@/constants";
import { toaster } from "@/components/ui/toaster";

const PlansPage = () => {
  const [plans, setPlans] = useState<PlansResponse["plans"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const { shop } = useShopStore();

  const [addMoreEmails, setAddMoreEmails] = useState(
    shop?.plan?.type === "enterprise" ? "15000" : "10000",
  );

  const handleEmailsChange = (value: string) => setAddMoreEmails(value);

  useEffect(() => {
    getPlans()
      .then((data) => {
        setPlans(data.plans);
      })
      .catch((err) => {
        console.error("Failed to fetch plans", err);
        toaster.create({
          title: "Error",
          description: "Failed to fetch plans",
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleMoreEmails = async () => {
    setBtnLoading(true);
    try {
      const { confirmation_url } = await subscribeExtraEmails(addMoreEmails);
      if (confirmation_url) {
        window.location.href = confirmation_url;
      }
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to add emails",
        type: "error",
      });
    } finally {
      setBtnLoading(false);
      setModalOpen(false);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const emailOptions =
    shop?.plan?.type === "enterprise"
      ? enterpriseEmailsOptions
      : businessEmailsOptions;

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
      <Flex justify="space-between" align="center" mb={6}>
        <UiText variant="heading2">Plans</UiText>
        {shop?.plan?.type !== "free" && (
          <PrimitiveDialog
            title="Add More Emails"
            open={modalOpen}
            onOpenChange={setModalOpen}
            trigger={
              <UiButton uiVariant="solid" onClick={() => setModalOpen(true)}>
                Add more emails
              </UiButton>
            }
            footer={
              <Flex gap={2}>
                <UiButton uiVariant="plain" onClick={() => setModalOpen(false)}>
                  Cancel
                </UiButton>
                <UiButton
                  uiVariant="solid"
                  loading={btnLoading}
                  onClick={handleMoreEmails}
                >
                  Add emails
                </UiButton>
              </Flex>
            }
          >
            <Box py={4}>
              <UiSelect
                items={emailOptions}
                onChange={handleEmailsChange}
                defaultValue={addMoreEmails}
                width="full"
                label="Select amount"
                showLabel
              />
            </Box>
          </PrimitiveDialog>
        )}
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {plans && (
          <>
            <PlansCard plans={plans.free || []} title="Free" />
            <PlansCard plans={plans.business || []} title="Business" />
            <PlansCard plans={plans.enterprise || []} title="Enterprise" />
          </>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default PlansPage;
