import UiLink from "@/components/ui/link";
import { UiText } from "@/components/ui/text";
import { Box } from "@chakra-ui/react";

const AutomationLeftBox = () => {
  return (
    <>
      <Box maxW="80%">
        <UiText variant="caption" mb="3">
          AUTOMATIONS
        </UiText>
        <UiText variant="heading" mb="7">
          Chat your way to more sales with interactive conversations and quizzes
        </UiText>
        <UiText mb="5">
          Create interactive product quizzes, answer FAQs, and nudge shoppers
          toward their first—and next—purchase.
        </UiText>
        <UiLink uiVariant="secondary" mb="5" href="/onboarding/begin-with-sms">
          Turn on SMS
        </UiLink>
        <UiText>Requires a two-way messaging number.</UiText>
      </Box>
    </>
  );
};

export default AutomationLeftBox;
