import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm, useWatch } from "react-hook-form";
import { EyeOffIcon, ViewIcon } from "lucide-react";
import { useMemo, useState } from "react";
import SignupStepper from "@/components/auth/signup-stepper";
import { FormField } from "@/components/ui";
import UiBox from "@/components/ui/box";
import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import UiTextLink from "@/components/ui/text-link";
import { signupRequest } from "@/api/auth";
import type { ApiEnvelope } from "@/api/client";
import type { FormValues } from "@/types/signup-formvalue-props";
import { useNavigate } from "react-router-dom";

const STEPS = [
  { label: "Account", value: "account" },
  { label: "Company", value: "company" },
  { label: "About you", value: "about" },
];

const STEP_FIELDS: (keyof FormValues)[][] = [
  ["email", "password"],
  ["companyWebsite", "companyName"],
  ["phone", "usage", "consentTerms"],
];

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      companyName: "",
      companyWebsite: "",
      phone: "",
      usage: "",
      consentTerms: false,
      consentMarketing: false,
    },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const passwordStrength = useMemo(() => {
    if (!password) {
      return { score: 0, label: "", color: "gray.200", checks: [] };
    }

    const checks = [
      { label: "At least 8 characters", met: password.length >= 8 },
      {
        label: "Contains uppercase & lowercase",
        met: /[a-z]/.test(password) && /[A-Z]/.test(password),
      },
      { label: "Contains a number", met: /\d/.test(password) },
      {
        label: "Contains a special character",
        met: /[^A-Za-z0-9]/.test(password),
      },
    ];
    const scoreCount = checks.filter((c) => c.met).length;

    const result = {
      score: (scoreCount / 4) * 100,
      checks,
      label: "",
      color: "",
    };

    switch (scoreCount) {
      case 0:
      case 1:
        result.label = "Weak";
        result.color = "red.500";
        break;
      case 2:
        result.label = "Fair";
        result.color = "orange.400";
        break;
      case 3:
        result.label = "Good";
        result.color = "yellow.400";
        break;
      default:
        result.label = "Strong";
        result.color = "green.500";
        break;
    }

    return result;
  }, [password]);

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      // Keep new fields in local flow for now; backend contract still limited.
      console.log("[SignupForm] Extra fields (not sent yet):", {
        companyName: data.companyName,
        companyWebsite: data.companyWebsite,
        phone: data.phone,
        usage: data.usage,
        consentTerms: data.consentTerms,
        consentMarketing: data.consentMarketing,
      });

      await signupRequest({
        email: data.email,
        password: data.password,
        name: data.companyName || data.email,
      });

      navigate(`/verify?email=${data.email}`);
    } catch (err) {
      const e = err as ApiEnvelope<unknown>;
      setError(e.message || "Unable to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onContinue = async () => {
    const isValidStep = await trigger(STEP_FIELDS[currentStep]);

    console.log("isValidStep", isValidStep  , currentStep);

    if (!isValidStep) return;

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);

      return;
    }

    handleSubmit(onSubmit)();
  };

  const onBack = () => {
    if (currentStep === 0) return;
    setCurrentStep((prev) => prev - 1);
  };

  const onStepChange = (nextStep: number) => {
    if (nextStep <= currentStep) setCurrentStep(nextStep);
  };

  return (
    <Box
      bg="gray.50"
      pt="10"
      minH="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      minHeight="100%"
    >
      <UiBox width="100%" maxWidth="525px">
        <Stack gap="5">
          <Text textAlign="center" fontSize="sm">
            Already have an account?{" "}
            <UiTextLink value="Log in." href="/login" />
          </Text>
          <UiText maxW="xl" textAlign="center" variant="heading">
            Get started today
          </UiText>

          <SignupStepper
            steps={STEPS}
            currentStep={currentStep}
            onStepChange={onStepChange}
          />
        </Stack>

        <Box p="8" w="full" maxW="md">
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack gap="4">
              {currentStep === 0 && (
                <>
                  <FormField
                    label="Email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    register={register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={errors.email}
                  />

                  <Box>
                    <FormField
                      label="Password"
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      register={register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      error={errors.password}
                      rightElement={
                        <Button
                          size="sm"
                          variant="ghost"
                          height="full"
                          borderLeftRadius="0"
                          onClick={() => setShowPassword((prev) => !prev)}
                          _hover={{ bg: "gray.600" }}
                          border="none"
                          borderLeft="sm"
                          borderColor="blackAlpha.100"
                        >
                          {showPassword ? <EyeOffIcon /> : <ViewIcon />}
                        </Button>
                      }
                    />

                    {password && (
                      <Box mt="2">
                        <Progress.Root value={passwordStrength.score} size="xs">
                          <Progress.Track bg="gray.100">
                            <Progress.Range bg={passwordStrength.color} />
                          </Progress.Track>
                        </Progress.Root>
                        <Flex justify="space-between" mt="1">
                          <Text fontSize="xs" color="700">
                            Password Strength:
                          </Text>
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color={passwordStrength.color}
                          >
                            {passwordStrength.label}
                          </Text>
                        </Flex>
                        <Stack gap="1" mt="2">
                          {passwordStrength.checks.map((check, index) => (
                            <Flex key={index} align="center" gap="2">
                              <Box
                                w="1.5"
                                h="1.5"
                                rounded="full"
                                bg={check.met ? "green.500" : "gray.300"}
                              />
                              <Text
                                fontSize="xs"
                                color={check.met ? "green.600" : "gray.700"}
                                textDecoration={
                                  check.met ? "line-through" : "none"
                                }
                              >
                                {check.label}
                              </Text>
                            </Flex>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Box>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <FormField
                    label="Company website"
                    type="text"
                    required
                    placeholder="https://example.com"
                    register={register("companyWebsite", {
                      required: "Company website is required",
                      validate: (value) => {
                        try {
                          const parsed = new URL(value);
                          if (
                            parsed.protocol !== "http:" &&
                            parsed.protocol !== "https:"
                          ) {
                            return "Website URL must start with http:// or https://";
                          }
                          return true;
                        } catch {
                          return "Enter a valid website URL";
                        }
                      },
                    })}
                    error={errors.companyWebsite}
                  />

                  <FormField
                    label="Company name"
                    type="text"
                    required
                    placeholder="Company name"
                    register={register("companyName", {
                      required: "Company name is required",
                    })}
                    error={errors.companyName}
                  />
                </>
              )}

              {currentStep === 2 && (
                <>
                  <FormField
                    label="Phone number"
                    type="text"
                    required
                    placeholder="+1 555 000 0000"
                    register={register("phone", {
                      required: "Phone number is required",
                    })}
                    error={errors.phone}
                  />

                  <FormField
                    label="What will you use Mailbot for?"
                    type="text"
                    required
                    placeholder="Describe your use case"
                    register={register("usage", {
                      required: "Usage is required",
                    })}
                    error={errors.usage}
                  />

                  <Checkbox.Root
                    checked={!!watch("consentTerms")}
                    onCheckedChange={(e) => {
                      setValue("consentTerms", !!e.checked, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  >
                    <Checkbox.HiddenInput
                      {...register("consentTerms", {
                        validate: (value) =>
                          !!value === true ? true : "You must accept the terms to continue",
                      })}
                    />
                    <Checkbox.Control />
                    <Checkbox.Label>
                      I agree to the Terms of Service and Privacy Policy.
                    </Checkbox.Label>
                  </Checkbox.Root>
                  {errors.consentTerms && (
                    <Text fontSize="xs" color="red.500">
                      {errors.consentTerms.message as string}
                    </Text>
                  )}

                  <Checkbox.Root
                    checked={!!watch("consentMarketing")}
                    onCheckedChange={(e) => {
                      setValue("consentMarketing", !!e.checked, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  >
                    <Checkbox.HiddenInput {...register("consentMarketing")} />
                    <Checkbox.Control />
                    <Checkbox.Label>
                      I agree to receive product updates and marketing emails.
                    </Checkbox.Label>
                  </Checkbox.Root>
                </>
              )}

              {error && (
                <Text fontSize="sm" color="red.500" textAlign="center">
                  {error}
                </Text>
              )}
              {successMessage && (
                <Text fontSize="sm" color="green.600" textAlign="center">
                  {successMessage}
                </Text>
              )}

              <HStack justify="flex-end" pt={2}>
                <UiButton
                  type="button"
                  onClick={onBack}
                  disabled={currentStep === 0 || isSubmitting}
                >
                  Back
                </UiButton>
                <UiButton
                  uiVariant="solid"
                  type="button"
                  onClick={onContinue}
                  disabled={isSubmitting}
                >
                  {currentStep === STEPS.length - 1
                    ? isSubmitting
                      ? "Submitting..."
                      : "Get started"
                    : "Continue"}
                </UiButton>
              </HStack>
            </Stack>
          </form>
        </Box>
      </UiBox>
    </Box>
  );
}
