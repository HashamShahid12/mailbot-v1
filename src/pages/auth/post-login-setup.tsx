import { FormField } from "@/components/ui";
import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import type { ApiEnvelope } from "@/api/client";
import {
  connectManualShop,
  refreshDomainStatus,
  registerDomain,
} from "@/api/shop";
import { useAuthStore } from "@/store/auth-store";
import { useShopStore } from "@/store/shop-store";
import type { Shop } from "@/types/shop-types";
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type StepOneValues = {
  shopName: string;
  storeDisplayName: string;
};

type StepTwoValues = {
  domain: string;
  subdomain: string;
  email: string;
  replyToEmail: string;
};

const cardBorderColor = "blackAlpha.100";

export default function PostLoginSetup() {
  const navigate = useNavigate();
  const {
    user,
    postLoginStepOneComplete,
    completePostLoginStepOne,
    completePostLoginStepTwo,
    setNeedsShopConnection,
  } = useAuthStore();
  const { setShop } = useShopStore();

  const [stepOneSubmitted, setStepOneSubmitted] = useState(false);
  const [stepTwoSubmitted, setStepTwoSubmitted] = useState(false);
  const [stepOneError, setStepOneError] = useState<string | null>(null);
  const [stepTwoError, setStepTwoError] = useState<string | null>(null);
  const [isStepOneSubmitting, setIsStepOneSubmitting] = useState(false);
  const [isStepTwoSubmitting, setIsStepTwoSubmitting] = useState(false);

  const currentStep = postLoginStepOneComplete ? 2 : 1;

  const stepOneForm = useForm<StepOneValues>({
    mode: "onChange",
    defaultValues: {
      shopName: "",
      storeDisplayName: user?.name ?? "",
    },
  });

  const stepTwoForm = useForm<StepTwoValues>({
    mode: "onChange",
    defaultValues: {
      domain: "",
      subdomain: "",
      email: user?.email ?? "",
      replyToEmail: user?.email ?? "",
    },
  });

  const handleStepOneSubmit = stepOneForm.handleSubmit(async (values) => {
    setStepOneError(null);
    setIsStepOneSubmitting(true);

    try {
      const response = await connectManualShop({
        shop_name: values.shopName.trim(),
        store_display_name: values.storeDisplayName.trim(),
        platform: "OTHER",
      });

      if (response.data) {
        setShop(response.data);
      }

      setNeedsShopConnection(false);
      setStepOneSubmitted(true);
      completePostLoginStepOne();
    } catch (error) {
      const apiError = error as ApiEnvelope<unknown>;
      setStepOneError(
        apiError.message || "Unable to connect your store. Please try again.",
      );
    } finally {
      setIsStepOneSubmitting(false);
    }
  });

  const handleStepTwoSubmit = stepTwoForm.handleSubmit(async (values) => {
    setStepTwoError(null);
    setIsStepTwoSubmitting(true);

    try {
      // TODO: API is disabled for now - will reconnect in future
      // Uncomment the API calls below when the backend is ready
      /*
      await registerDomain({
        domain: values.domain.trim(),
        email: values.email.trim(),
        subdomain: values.subdomain.trim(),
        reply_to_email: values.replyToEmail.trim(),
      });

      const refreshed = await refreshDomainStatus();
      const refreshedData = refreshed.data as { shop?: Shop } | null;
      if (refreshedData?.shop) {
        setShop(refreshedData.shop);
      }
      */

      setStepTwoSubmitted(true);
      completePostLoginStepTwo();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const apiError = error as ApiEnvelope<unknown>;
      setStepTwoError(
        apiError.message ||
          "Unable to save DNS configuration. Please check your values and try again.",
      );
    } finally {
      setIsStepTwoSubmitting(false);
    }
  });

  return (
    <Flex minH="100vh" bg="gray.50" align="center" justify="center" px="6">
      <Stack w="full" maxW="6xl" gap="8" py="10">
        <Stack gap="3" textAlign="center" align="center">
          <Badge
            px="3"
            py="1"
            borderRadius="full"
            bg="white"
            color="black"
            border="1px solid"
            borderColor={cardBorderColor}
          >
            Post-login setup
          </Badge>
          <UiText variant="heading" maxW="2xl">
            Complete both steps before entering the dashboard
          </UiText>
          <UiText maxW="3xl" color="gray.700">
            This stays on one setup screen. We show one step at a time, and the
            dashboard remains locked until both steps are submitted
            successfully.
          </UiText>
        </Stack>

        <Box
          bg="white"
          border="1px solid"
          borderColor={cardBorderColor}
          borderRadius="2xl"
          p="8"
          boxShadow="sm"
          maxW="2xl"
          mx="auto"
          w="full"
        >
          <Stack gap="6">
            <Stack gap="4">
              <HStack justify="space-between">
                <Badge
                  px="3"
                  py="1"
                  borderRadius="full"
                  bg="gray.100"
                  color="gray.700"
                >
                  Step {currentStep} of 2
                </Badge>
                <Text fontSize="sm" color="gray.600">
                  {currentStep === 1 ? "Business details" : "DNS configuration"}
                </Text>
              </HStack>

              <Progress.Root value={currentStep === 1 ? 50 : 100} size="sm">
                <Progress.Track borderRadius="full">
                  <Progress.Range borderRadius="full" />
                </Progress.Track>
              </Progress.Root>
            </Stack>

            {!postLoginStepOneComplete ? (
              <Stack gap="6">
                <Stack gap="2">
                  <Heading size="lg">Step 1</Heading>
                  <UiText color="gray.700">
                    Enter the required details first. After this is submitted,
                    the same setup screen will move to the DNS step.
                  </UiText>
                </Stack>

                <form onSubmit={handleStepOneSubmit}>
                  <Stack gap="4">
                    <FormField
                      name="shopName"
                      label="Shop domain"
                      placeholder="my-custom-store.com"
                      register={stepOneForm.register("shopName", {
                        required: "Shop domain is required",
                      })}
                      error={stepOneForm.formState.errors.shopName}
                    />
                    <FormField
                      name="storeDisplayName"
                      label="Store display name"
                      placeholder="My Custom Store"
                      register={stepOneForm.register("storeDisplayName", {
                        required: "Store display name is required",
                      })}
                      error={stepOneForm.formState.errors.storeDisplayName}
                    />
                    <Text fontSize="sm" color="gray.600">
                      Platform will be submitted as <strong>OTHER</strong> for
                      this setup step.
                    </Text>
                    {stepOneError && (
                      <Text fontSize="sm" color="red.500">
                        {stepOneError}
                      </Text>
                    )}
                    {stepOneSubmitted && (
                      <Text fontSize="sm" color="green.600">
                        Step 1 submitted successfully.
                      </Text>
                    )}
                    <UiButton
                      type="submit"
                      uiVariant="solid"
                      disabled={
                        !stepOneForm.formState.isValid || isStepOneSubmitting
                      }
                      loading={isStepOneSubmitting}
                      loadingText="Connecting store..."
                    >
                      Continue to Step 2
                    </UiButton>
                  </Stack>
                </form>
              </Stack>
            ) : (
              <Stack gap="6">
                <Stack gap="2">
                  <Heading size="lg">Step 2</Heading>
                  <UiText color="gray.700">
                    Add the DNS configuration to finish setup and continue to
                    the dashboard.
                  </UiText>
                </Stack>

                <form onSubmit={handleStepTwoSubmit}>
                  <Stack gap="4">
                    <FormField
                      name="domain"
                      label="Domain"
                      placeholder="example.com"
                      register={stepTwoForm.register("domain", {
                        required: "Domain is required",
                      })}
                      error={stepTwoForm.formState.errors.domain}
                    />
                    <FormField
                      name="subdomain"
                      label="Subdomain"
                      placeholder="mail.example.com"
                      register={stepTwoForm.register("subdomain", {
                        required: "Subdomain is required",
                      })}
                      error={stepTwoForm.formState.errors.subdomain}
                    />
                    <FormField
                      name="email"
                      label="Sender email"
                      type="email"
                      placeholder="sender@example.com"
                      register={stepTwoForm.register("email", {
                        required: "Sender email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email address",
                        },
                      })}
                      error={stepTwoForm.formState.errors.email}
                    />
                    <FormField
                      name="replyToEmail"
                      label="Reply-to email"
                      type="email"
                      placeholder="reply@example.com"
                      register={stepTwoForm.register("replyToEmail", {
                        required: "Reply-to email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email address",
                        },
                      })}
                      error={stepTwoForm.formState.errors.replyToEmail}
                    />
                    {stepTwoError && (
                      <Text fontSize="sm" color="red.500">
                        {stepTwoError}
                      </Text>
                    )}
                    {stepTwoSubmitted && (
                      <Text fontSize="sm" color="green.600">
                        Step 2 submitted successfully. Redirecting to the
                        dashboard.
                      </Text>
                    )}
                    <UiButton
                      type="submit"
                      uiVariant="solid"
                      disabled={
                        !stepTwoForm.formState.isValid || isStepTwoSubmitting
                      }
                      loading={isStepTwoSubmitting}
                      loadingText="Saving DNS settings..."
                    >
                      Finish setup
                    </UiButton>
                  </Stack>
                </form>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
