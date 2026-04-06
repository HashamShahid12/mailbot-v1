import {
  Box,
  Button,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField } from "@/components/ui";
import { useAuthStore } from "@/store/auth-store";
import { useShopStore } from "@/store/shop-store";
import { UiText } from "@/components/ui/text";
import type { FormValues } from "@/types/login-formvalue-props";
import UiTextLink from "@/components/ui/text-link";
import { loginRequest } from "@/api/auth";
import type { LoginResponse } from "@/api/auth";
import type { ApiEnvelope } from "@/api/client";
import UiButton from "@/components/ui/button";

export default function LoginForm() {
  const { login, sessionId } = useAuthStore();
  const { setShop } = useShopStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const [email, setEmail] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mailUnverified, setMailUnverified] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    console.log("[LoginForm] Submitting login form...");
    setError(null);
    setIsSubmitting(true);
    setEmail(data.email);
    try {
      const res = await loginRequest({
        email: data.email,
        password: data.password,
        sessionId: sessionId,
      });

      console.log("[LoginForm] Login request successful");
      const payload = res.data as LoginResponse;

      if (payload.emailVerificationRequired && !payload.accessToken) {
        console.warn(
          "[LoginForm] Email verification required. Blocking login.",
        );
        setError("Please verify your email address before logging in.");
        return;
      }

      console.log(
        "[LoginForm] Updating auth store and navigating to dashboard",
      );

      // Update shop store if shop data is present
      if (payload.shop) {
        console.log("[LoginForm] Updating shop store with login data");
        setShop(payload.shop);
      }

      login({
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken ?? null,
        sessionId: payload.sessionId ?? null,
        user: payload.user,
        needsShopConnection: payload.needsShopConnection,
      });
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "AUTH_EMAIL_NOT_VERIFIED") {
        setMailUnverified(true);
        // navigate("/verify-email", {
        //   state: { email: data.email, fromLogin: true },
        // });
        // return null;
      }
      console.error("[LoginForm] Login failed:", err);
      const e = err as ApiEnvelope<unknown>;
      setError(e.message || "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      bg="gray.50"
      pt="5"
      // display="flex"
      // // justifyContent="center"
      // // alignItems="center"
      w="full"
      minH="90vh"
    >
      <SimpleGrid h="100vh" columns={2}>
        <Box
          p="8"
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          // maxW="md"
        >
          <form
            style={{
              width: "100%",
              maxWidth: "400px",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack gap="5">
              <UiText textAlign="center" variant="heading">
                Welcome back
              </UiText>

              <FormField
                label="Email"
                type="email"
                register={register("email", {
                  required: "Email is required",
                })}
                error={errors.email}
              />

              <FormField
                label="Password"
                type={showPassword ? "text" : "password"}
                register={register("password", {
                  required: "Password is required",
                })}
                error={errors.password}
                rightElement={
                  <Button
                    size="sm"
                    variant="ghost"
                    height="full"
                    borderLeftRadius="0"
                    onClick={() => setShowPassword(!showPassword)}
                    _hover={{
                      bg: "gray.600",
                    }}
                    border="none"
                    borderLeft="sm"
                    borderColor="blackAlpha.100"
                  >
                    {showPassword ? <EyeOffIcon /> : <ViewIcon />}
                  </Button>
                }
              />

              {error && (
                <Text fontSize="sm" color="red.500" textAlign="center">
                  {error +
                    (mailUnverified ? " Please verify your email first. " : "")}
                  <Text
                    display="inline"
                    textDecoration="underline"
                    cursor="pointer"
                    onClick={() =>
                      navigate(`/verify?email=${email}&fromLogin=true`)
                    }
                    color="red.500"
                  >
                    Verify
                  </Text>
                </Text>
              )}

              <Box textAlign="right">
                <UiTextLink value="Forgot your password?" href="#" />
              </Box>

              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>

              <Button
                variant="outline"
                bg="white"
                border="sx"
                borderColor="blackAlpha.100"
                _hover={{ bg: "gray.600" }}
                onClick={() =>
                  window.open("http://localhost:4000/api/auth/google", "_self")
                }
              >
                Log in with SSO
              </Button>

              <Text
                borderTop="sm"
                borderColor="gray.600"
                fontSize="sm"
                textAlign="center"
                pt="6"
              >
                Don't have an account?{" "}
                <UiTextLink value="Sign up" href="/signup" />
              </Text>
            </Stack>
          </form>
        </Box>
        <Stack justifyContent="space-between">
          <Stack justifyContent="center" height="100%" gap={4}>
            <UiText fontSize="6xl" variant="heading">
              What's new in Mailbot
            </UiText>
            <UiText fontSize="4xl">Latest feature release</UiText>
            <UiText variant="body" fontSize="lg">
              While you were driving growth in Q4, our R&D teams were building
              releases that help you harness AI, connect richer data, and
              deliver more impact across your channels in 2026.
            </UiText>

            <UiButton alignSelf="flex-start" uiVariant="solid">
              See what's new
            </UiButton>
          </Stack>
          <Box>
            <Image src="/images/login-screen.jpg" alt="Mailbot" />
          </Box>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
