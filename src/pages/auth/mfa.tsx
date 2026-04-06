import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Link,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export const TwoFactorAuth = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    const char = value.replace(/\D/, "");
    newCode[index] = char;
    setCode(newCode);

    if (char && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <Box maxW="md" mx="auto" mt="12" textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" mb="2">
        Two-factor authentication
      </Text>
      <Text color="gray.600" mb="6">
        Enter the six digit code from your authentication app
      </Text>

      {/* Code Inputs */}
      <HStack justify="center" mb="4">
        {code.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            textAlign="center"
            fontSize="xl"
            maxLength={1}
            w="12"
            h="12"
            border="1px solid"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
          />
        ))}
      </HStack>

      <Link color="blue.600" fontSize="sm" mb="4" display="block">
        I want to use a backup code
      </Link>

      <Flex justify="center" mb="6">
        <Checkbox.Root>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label ml="2">
            Remember this device for 30 days
          </Checkbox.Label>
        </Checkbox.Root>
      </Flex>

      <Button
        width="100%"
        colorScheme="blue"
        disabled={!isCodeComplete}
        opacity={!isCodeComplete ? 0.4 : 1}
      >
        Verify
      </Button>
    </Box>
  );
};
