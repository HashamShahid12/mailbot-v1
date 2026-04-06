import { AlertBanner } from "@/components/ui/alert-banner";
import { UiText } from "@/components/ui/text";
import { Badge, Box, Button, Flex, Image } from "@chakra-ui/react";
import { CircleHelp } from "lucide-react";

export const GrowthStrategies = () => {
  return (
    <>
      <Box backgroundColor="#FFFAF3">
        <Flex
          padding="40px 8px"
          justifyContent="center"
          alignItems="center"
          gap="3rem"
        >
          <Box>
            <Badge>New</Badge>
            <UiText fontSize="3xl" fontWeight="bold" p="12px 0">
              Start driving revenue throught SMS
            </UiText>
            <UiText fontSize="md" p="12px 0 30px 0">
              This learning path is broken down into 3 short courses that will
              teach you everything you need to know to start using SMS
              effectively.
            </UiText>
            <Button variant="solid" padding="1rem" fontSize="md">
              Start learning
            </Button>
          </Box>

          <Image src="/images/image-1.png" width="15%" />
        </Flex>
      </Box>
      <Box mt="1rem">
        <AlertBanner
          type="warning"
          message="Upgrade your account to unlock powerful Mailbot AI features, plus email and live chat support."
          showClose={false}
          align="center"
          rightIcon={<CircleHelp />}
        />
      </Box>
    </>
  );
};
