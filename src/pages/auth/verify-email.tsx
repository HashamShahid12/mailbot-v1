import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Image, Stack, Flex, Text, HStack, Accordion, List, Separator } from "@chakra-ui/react";
import { Mail } from "lucide-react";

import { UiText } from "@/components/ui/text";
import { resendVerificationRequest } from "@/api/auth";
import UiTextLink from "@/components/ui/text-link";
import UiButton from "@/components/ui/button";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const fromLogin = searchParams.get("fromLogin");

  console.log(email);

  const [loading, setLoading] = useState(false);

  const RESEND_DELAY_SECONDS = 30;
  const [canResend, setCanResend] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_DELAY_SECONDS);

  const resendVerificationEmail = async () => {
    try {
      setLoading(true);
      setCanResend(false);
      setSecondsLeft(RESEND_DELAY_SECONDS);
      const response = await resendVerificationRequest(email || "");
    } catch (error) {
      console.error("Failed to send verification email:", error);
    } finally {
      setLoading(false);
    }
  };

  // if (!email) {
  //   navigate("/login");
  //   return null;
  // }

  useEffect(() => {
    if (fromLogin) {
      setCanResend(true);
    }
  }, [fromLogin]);

  useEffect(() => {
    const startTime = Date.now();

    const intervalId = window.setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, RESEND_DELAY_SECONDS - elapsedSeconds);

      setSecondsLeft(remaining);

      if (remaining === 0) {
        setCanResend(true);
        window.clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [canResend]);

  return (
    <Flex
      bg="white"
      minH="100vh"
      direction="column"
      align="center"
      justify="center"
      pt="10"
      pb="20"
      px="4"
    >
      <Stack gap="6" w="full" maxW="lg" align="center" textAlign="center">
        <Image 
          src="./images/check-mail.svg" 
          alt="Check mail" 
          w="140px" 
          h="auto" 
          mb="4"
        />
        
        <Text fontSize="3xl" fontWeight="bold" color="gray.900" mb="2">
          Check your email
        </Text>
        
        <Stack gap="3" align="center" mb="6">
          <Text fontSize="md" color="gray.800">
            To start using Mailbot, activate your account with the link sent to
          </Text>
          
          <HStack gap="3" justify="center">
            <Text fontSize="md" fontWeight="bold" color="gray.900">
              {email || "zzz@gmail.com"}
            </Text>
            {/* <Box as="a" href="/signup" color="blue.700" fontSize="md" fontWeight="medium" _hover={{ textDecoration: 'underline' }}>
              Update Email
            </Box> */}
          </HStack>
        </Stack>

        <UiButton
uiVariant="solid"
          onClick={() => window.open(`https://mail.google.com/`, '_blank')}
        >
          <HStack gap="3" align="center">
            <Mail size={20} />
            <Text fontSize="md" fontWeight="medium">Open in Gmail</Text>
          </HStack>
        </UiButton>
        <Separator flex="1" size="lg"  variant="solid"/>
        
        {/* <Divider my="8" w="80%" borderColor="gray.200" /> */}
        
        <Box w="full" mt="4" textAlign="left">
          <Accordion.Root collapsible>
            <Accordion.Item value="didnt-receive" borderBottom="none">
              <Accordion.ItemTrigger _hover={{ bg: "transparent" }} px="0" py="2">
                <HStack gap="2">
                  <Accordion.ItemIndicator />
                  <Text fontSize="md" color="gray.700" fontWeight="medium">Didn't receive an email?</Text>
                </HStack>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pb="4">
                <Accordion.ItemBody>
                  <List.Root gap="2" mb="4" pl="5" listStyleType="disc">
                    <List.Item fontSize="sm" color="gray.700">Check that you entered your email correctly</List.Item>
                    <List.Item fontSize="sm" color="gray.700">Check your spam or junk folder</List.Item>
                    <List.Item fontSize="sm" color="gray.700">Search for an email with subject "Confirm your Mailbot email"</List.Item>
                    <List.Item fontSize="sm" color="gray.700">Check any filter or firewall settings</List.Item>
                    <List.Item fontSize="sm" color="gray.700">Add no-reply@mailbot.com to your contacts</List.Item>
                  </List.Root>
                  
                  <Stack gap="3">
                    <Text fontSize="sm" color="gray.700">
                      Steps didn't work?{" "}
                      <Box 
                        as="button" 
                        color={canResend ? "blue.700" : "gray.400"} 
                        cursor={canResend ? "pointer" : "not-allowed"}
                        _hover={canResend ? { textDecoration: 'underline' } : {}}
                        onClick={() => {
                          if (canResend) resendVerificationEmail();
                        }}
                      >
                        Resend confirmation email {!canResend && `(${secondsLeft}s)`}
                      </Box>
                    </Text>
                    <Text fontSize="sm" color="gray.700">
                      Still need help?{" "}
                      <UiTextLink value="Contact support" href="/support" />
                    </Text>
                  </Stack>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </Box>
      </Stack>
    </Flex>
  );
}
