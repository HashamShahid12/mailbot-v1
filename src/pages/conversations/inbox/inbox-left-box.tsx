import { UiText } from "@/components/ui/text";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const InboxLeftBox = () => {
  return (
    <>
      <Box maxW="80%">
        <UiText variant="caption" mb="3">
          INBOX
        </UiText>
        <UiText variant="heading" mb="7">
          Reduce churn and drive engagement with a unified inbox
        </UiText>
        <UiText mb="5">
          Engage with your customers anywhere through real-time, personalized
          conversations to drive sales, manage orders, and collect feedback.
        </UiText>

        <Link to="/onboarding/begin-with-sms">
          <Flex
            p="4"
            justify="space-between"
            border="sm"
            borderColor="gray.600"
            borderRadius="md"
            mb="7"
            shadow="md"
            w="md"
            bg="white"
            _hover={{ borderColor: "blue.200" }}
          >
            <UiText fontWeight="semibold">Turn on SMS</UiText>
            <Icon as={ChevronRight} boxSize="6" />
          </Flex>
        </Link>
        <UiText>Set up takes about 3 minutes.</UiText>
      </Box>
    </>
  );
};

export default InboxLeftBox;
