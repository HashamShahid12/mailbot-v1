import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { FormField } from "@/components/ui";
import { UiText } from "@/components/ui/text";
import { useAuthStore } from "@/store/auth-store";
import { claimShop } from "@/api/shop";
import type { ApiEnvelope } from "@/api/client";

interface FormValues {
  shop_name: string;
}

export default function ConnectShop() {
  const { accessToken, setNeedsShopConnection } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    console.log("[ConnectShop] Submitting shop claim form...", data);
    setError(null);
    setIsSubmitting(true);
    try {
      await claimShop({
        shop_name: data.shop_name,
        platform: "SHOPIFY",
      });
      console.log("[ConnectShop] Shop claim successful. Updating store state.");
      setNeedsShopConnection(false);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("[ConnectShop] Shop claim failed:", err);
      const e = err as ApiEnvelope<unknown>;
      setError(e.message || "Unable to connect shop. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      bg="gray.50"
      pt="5"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="90vh"
    >
      <Box p="8" w="full" maxW="md">
        <Stack gap="5">
          <UiText textAlign="center" variant="heading">
            Connect your Shopify store
          </UiText>
          <Text textAlign="center" color="gray.700">
            To start using Mailbot, connect your Shopify store. This connection
            is required before accessing the rest of the app.
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="5">
              <FormField
                label="Shop domain"
                type="text"
                placeholder="shop.myshopify.com"
                register={register("shop_name", {
                  required: "Shop domain is required",
                })}
                error={errors.shop_name as any}
              />

              {error && (
                <Text fontSize="sm" color="red.500" textAlign="center">
                  {error}
                </Text>
              )}

              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "Connecting..." : "Connect shop"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Box>
  );
}
