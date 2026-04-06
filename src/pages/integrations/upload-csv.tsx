import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import { Box, Flex, Link, Stack } from "@chakra-ui/react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UploadCsvStep1 from "./upload-csv-step1";

const UploadCsv = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <Box bg="gray.50" minH="100vh">
        <Flex
          p="5"
          bg="white"
          align="center"
          borderBottom="sm"
          borderColor="gray.100"
          justify="space-between"
        >
          <Stack>
            <Link
              color="blue.200"
              w="fit"
              textDecorationStyle="dotted"
              _hover={{ color: "blue.500", textDecoration: "underline" }}
              _focus={{ outline: "none" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/integrations");
              }}
            >
              <GoArrowLeft />
              Back to Integrations
            </Link>
            <UiText variant="heading2" fontWeight="semibold">
              Import via CSV
            </UiText>
          </Stack>

          <Flex gap="2">
            {step === 1 && (
              <UiButton
                uiVariant="outline"
                onClick={() => navigate("/integrations")}
              >
                Cancel
              </UiButton>
            )}
            {step > 1 && (
              <UiButton uiVariant="outline" onClick={prevStep}>
                Back
              </UiButton>
            )}
            {step < 3 ? (
              <UiButton uiVariant="solid" onClick={nextStep}>
                Next
              </UiButton>
            ) : (
              <UiButton
                uiVariant="solid"
                onClick={() => {
                  navigate("/integrations"), alert("Submit logic");
                }}
              >
                Submit
              </UiButton>
            )}
          </Flex>
        </Flex>

        <Box p="10" m="auto" maxW="5xl">
          {step === 1 && <UploadCsvStep1 />}
          {step === 2 && <Box>Step 2 content goes here</Box>}
          {step === 3 && <Box>Step 3 content goes here</Box>}
        </Box>
      </Box>
    </>
  );
};

export default UploadCsv;
