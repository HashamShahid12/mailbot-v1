import { Box, Flex } from "@chakra-ui/react";
import { UiText } from "../../text";
import { UiTab } from "../../tabs";
import EmailScore from "./email-score";
import EmailReport from "./email-report";
import EmailBounceDetails from "./email-bounce-details";
import SMS from "./sms";

const DeliverabilityHeader = () => {
  const tabs = [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
  ];

  const tabContent = {
    email: (
      <UiTab
        tabs={[
          { value: "score", label: "Score" },
          { value: "reports", label: "Reports" },
          { value: "bounceDetails", label: "Bounce Details" },
        ]}
        defaultValue="score"
        variant="column"
        tabContent={{
          score: <EmailScore />,
          reports: <EmailReport />,
          bounceDetails: <EmailBounceDetails />,
        }}
      />
    ),
    sms: <SMS />,
  };
  return (
    <>
      <Box px="5" py="3" bg="white ">
        <Flex gap="3" align="center" _dark={{ bg: "gray.900" }}>
          <UiText variant="heading2">Deliverability</UiText>
        </Flex>
      </Box>
      <UiTab
        tabs={tabs}
        defaultValue="email"
        variant="minimal"
        tabContent={tabContent}
      />
    </>
  );
};

export default DeliverabilityHeader;
