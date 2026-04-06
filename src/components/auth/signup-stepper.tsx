import { Box, HStack, Stack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { UiText } from "../ui/text";

type Step = {
  label: string;
  value: string;
};

type SignupStepperProps = {
  steps: Step[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
};

const SignupStepper = ({
  steps,
  currentStep = 0,
  onStepChange,
}: SignupStepperProps) => {
  const [activeStep, setActiveStep] = useState(currentStep);

  useEffect(() => {
    setActiveStep(currentStep);
  }, [currentStep]);

  const maxStep = Math.max(steps.length - 1, 1);
  const progressWidth = useMemo(
    () => `${(Math.min(activeStep, maxStep) / maxStep) * 100}%`,
    [activeStep, maxStep],
  );

  const handleStepChange = (index: number) => {
    setActiveStep(index);
    onStepChange?.(index);
  };

  return (
    <>
    <Stack w="full" align="center" px={6} pt={2}>
      <HStack
        w="full"
        maxW="360px"
        justify="space-between"
        position="relative"
        py={2}
      >
        <Box
          position="absolute"
          top="50%"
          left="0"
          right="0"
          transform="translateY(-50%)"
          h="2px"
          bg="gray.300"
          zIndex={0}
        />
        <Box
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          h="2px"
          bg="blue.200"
          w={progressWidth}
          zIndex={1}
          transition="width 350ms ease"
        />

        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isCurrent = index === activeStep;
          const isPending = index > activeStep;

          return (
            <>
            
            <Stack
              key={step.value}
              align={index === 0 ? "flex-start" : index === steps.length -1  ? "flex-end" : "center"}
              gap={2}
              zIndex={2}
              minW="96px"
              // onClick={() => handleStepChange(index)}
              cursor="pointer"
            >
              <Box
                w="8"
                h="8"
                borderRadius="full"
                borderWidth="2px"
                borderColor={isPending ? "blue.200" : "blue.200"}
                bg={isPending ? "white" : "blue.200"}
                display="flex"

                alignItems="center"
                justifyContent="center"
                transition="all 300ms ease"
                transform={isCurrent ? "scale(1.08)" : "scale(1)"}
                boxShadow={
                  isCurrent ? "0 0 0 3px rgba(49,130,206,0.18)" : "none"
                }
              >
                {isPending ? (
                  <Box w="1.5" h="1.5" borderRadius="full" bg="blue.200" />
                ) : (
                  <Box w="1.5" h="1.5" borderRadius="full" bg="white" />
                )}
              </Box>  
            </Stack>
            </>
          );
        })}

      </HStack>
      
    </Stack>
    <HStack px={6} 
    justify='space-between'
    >
      {steps.map(step => {
        return ( <UiText>
          {step.label}
        </UiText>)
      })}
    </HStack>
    </>

  );
};

export default SignupStepper;
