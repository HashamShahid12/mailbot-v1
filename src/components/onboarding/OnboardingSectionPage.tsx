import type {
  OnboardingSection,
  OnboardingStep,
} from "@/onboarding/OnboardingFlow";
import {
  Box,
  Text,
  VStack,
  Flex,
  Circle,
  Button,
  Link,
  Collapsible,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { DrawerWrapper } from "../ui/drawer";
import { OnboardingDrawerContent } from "./OnboardingDrawerContent";
import { useOnboardingProgress } from "@/store/onboardingProgress";
import { CheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboardingValidation } from "@/store/onboardingValidationStore";
import { toaster } from "../ui/toaster";

interface Props {
  section: OnboardingSection;
}

export default function OnboardingSectionPage({ section }: Props) {
  const { markSkipped, markComplete, stepStatus } = useOnboardingProgress();
  const [skippedSteps, setSkippedSteps] = useState<Record<string, boolean>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<OnboardingStep | null>(null);
  const [openStepIds, setOpenStepIds] = useState<Record<string, boolean>>({
    [section.steps[0]?.id]: true,
  });
  const [selectedOption, setSelectedOption] = useState("manual");
  const [drawerPhaseIndex, setDrawerPhaseIndex] = useState(0);

  const stepPhasesById: Record<string, string[]> = {
    tracking: ["initial", "confirm"],
    import: ["initial", "contact-profile", "upload"],
    verify: ["set-up-sms", "sms-form"],
    signupform: [
      "visitors",
      "formshowwebsite",
      "formteaser",
      "formcoupon",
      "formlayout",
    ],
    disclosures: [
      "disclosure-overview",
      "company-info",
      "privacy-policy",
      "privacy-policy-update",
      "tos-option",
      "tos-hosting",
    ],
  };

  const toggleStep = (stepId: string) => {
    setOpenStepIds((prev) => {
      if (prev[stepId]) return {};
      return { [stepId]: true };
    });
  };

  const handleSkip = (stepId: string, index: number) => {
    setSkippedSteps((prev) => ({
      ...prev,
      [stepId]: true,
    }));

    const nextStep = section.steps[index + 1];
    setOpenStepIds((prev) => {
      const updated: Record<string, boolean> = {};
      if (nextStep) {
        updated[nextStep.id] = true;
      }
      return updated;
    });
    // markSkipped(stepId)
  };

  useEffect(() => {
    if (section?.steps?.length > 0) {
      setOpenStepIds({ [section.steps[0].id]: true });
    }
  }, [section]);

  const handleCTAClick = (step: OnboardingStep) => {
    if (step.redirectTo) {
      navigate(step.redirectTo);
      return;
    }
    setActiveStep(step);
    console.log("Clicked step ID:", step?.id);
    setDrawerPhaseIndex(0);
    setDrawerOpen(true);
  };
  console.log(activeStep?.id);

  const currentPhases = stepPhasesById[activeStep?.id ?? ""] || [];
  const currentPhase = currentPhases[drawerPhaseIndex];
  const { isValid, setValid } = useOnboardingValidation();

  const navigate = useNavigate();

  const stepState = section.steps.map((step, idx) => {
    const isOpen = !!openStepIds[step.id];
    const status = stepStatus[step.id];
    const isComplete = status === "complete";
    const isSkipped = status === "skipped";

    return { step, idx, isOpen, isComplete, isSkipped };
  });

  return (
    <Box>
      <VStack align="start" gap="8">
        <Text fontSize="xl" fontWeight="bold">
          {section.title}
        </Text>
        {stepState.map(({ step, idx, isOpen, isComplete, isSkipped }) => (
          <Collapsible.Root
            key={step.id}
            open={isOpen}
            onOpenChange={(details) =>
              setOpenStepIds((prev) => ({ ...prev, [step.id]: details.open }))
            }
          >
            <Collapsible.Trigger asChild>
              <Flex
                align="center"
                gap={2}
                cursor="pointer"
                onClick={() => toggleStep(step.id)}
              >
                {isOpen ? <FiChevronDown /> : <FiChevronRight />}
                <Circle
                  size="6"
                  bg={isComplete ? "green.500" : "gray.300"}
                  color="white"
                >
                  {isComplete ? <CheckIcon /> : idx + 1}
                </Circle>
                <Text fontWeight="semibold">{step.title}</Text>
                {skippedSteps[step.id] && (
                  <Text
                    fontSize="xs"
                    bg="gray.100"
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    Skipped
                  </Text>
                )}
              </Flex>
            </Collapsible.Trigger>

            <Collapsible.Content>
              <Box pl={10} pt={2}>
                {step.description && (
                  <Text fontSize="md" color="gray.20">
                    {step.description}
                  </Text>
                )}
                {step.link && (
                  <Link href={step.link} fontSize="sm" color="blue.500">
                    Learn more
                  </Link>
                )}
                {step.estimatedTime && (
                  <Text fontSize="xs" color="gray.20" mt={1}>
                    {step.estimatedTime}
                  </Text>
                )}
                <Flex gap={4} mt={3}>
                  {step.cta && (
                    <Button
                      disabled={!skippedSteps[step.id]}
                      onClick={() => handleCTAClick(step)}
                      p="1rem"
                    >
                      {step.cta}
                    </Button>
                  )}
                  {step.skippable && !skippedSteps[step.id] && (
                    <Button
                      variant="ghost"
                      onClick={() => handleSkip(step.id, idx)}
                      p="1rem"
                    >
                      Skip for now
                    </Button>
                  )}
                </Flex>
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        ))}
      </VStack>

      <DrawerWrapper
        open={drawerOpen}
        placement="bottom"
        onOpenChange={(open) => {
          if (!open) {
            setDrawerOpen(false);
            setActiveStep(null);
            setDrawerPhaseIndex(0);
          }
        }}
        title={activeStep?.title}
        footer={
          <Flex gap={3}>
            <Button
              variant="outline"
              onClick={() => {
                if (drawerPhaseIndex === 0) {
                  setDrawerOpen(false);
                  setActiveStep(null);
                } else {
                  setDrawerPhaseIndex(drawerPhaseIndex - 1);
                }
              }}
              p="1rem"
            >
              Back
            </Button>
            <Button
              colorScheme="black"
              onClick={() => {
                if (!isValid) {
                  // Show error state – e.g., toast or validation UI
                  toaster.create({
                    title: "Please select an option before continuing.",
                    type: "error",
                    duration: 3000,
                    meta: { closable: true },
                  });
                  return;
                }

                if (activeStep?.redirectTo) {
                  navigate(activeStep.redirectTo);
                  setDrawerOpen(false);
                  setActiveStep(null);
                  setDrawerPhaseIndex(0);
                  return;
                }

                if (drawerPhaseIndex < currentPhases.length - 1) {
                  setDrawerPhaseIndex(drawerPhaseIndex + 1);
                } else {
                  if (activeStep?.id) {
                    markComplete(activeStep.id);
                  }
                  setDrawerOpen(false);
                  setActiveStep(null);
                  setDrawerPhaseIndex(0);
                }
              }}
              p="1rem"
            >
              {drawerPhaseIndex < currentPhases.length - 1 ? "Next" : "Finish"}
            </Button>
          </Flex>
        }
      >
        <OnboardingDrawerContent
          activeStep={activeStep}
          drawerPhaseIndex={drawerPhaseIndex}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </DrawerWrapper>
    </Box>
  );
}
