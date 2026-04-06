import { useColorModeValue } from "@/components/ui/color-mode";
import { useOnboardingValidation } from "@/store/onboardingValidationStore";
import { Box, Text, VStack, Flex, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const countries = [
  { code: "🇺🇸", name: "United States" },
  { code: "🇨🇦", name: "Canada" },
  { code: "🇬🇧", name: "United Kingdom" },
  {
    code: "🇦🇺",
    name: "Australia",
    note: "Requires your company to be registered in Australia.",
  },
  {
    code: "🇳🇿",
    name: "New Zealand",
    note: "Requires a short code for $275/month.",
  },
  { code: "🇮🇪", name: "Ireland" },
  { code: "🇫🇷", name: "France" },
  { code: "🇩🇪", name: "Germany" },
];

export function SetUpSmsStep() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([ ]);
  const { setValid } = useOnboardingValidation();

  const handleToggle = (name: string) => {
    setSelectedCountries((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };
   useEffect(() => {
    // If at least one country is selected, mark step as valid
    setValid(selectedCountries.length > 0);
  }, [selectedCountries, setValid]);


  const selectedBorder = useColorModeValue("blue.500", "blue.300");
  const selectedBg = useColorModeValue("blue.50", "blue.900");

  return (
    <Box maxW="2xl" mx="auto" mt="10">
      <Text fontSize="2xl" fontWeight="bold" mb="2">
        Let’s start by choosing the countries you plan to send SMS in.
      </Text>
      <Link href="#" color="blue.500" fontSize="sm" mb="6" display="inline-block">
        Each country has different requirements and laws for SMS.
      </Link>

      <VStack align="stretch" gap={3}>
        {countries.map((country) => {
          const isChecked = selectedCountries.includes(country.name);
          return (
            <Flex
              key={country.name}
              border="2px solid"
              borderColor={isChecked ? selectedBorder : "gray.300"}
            //   bg={isChecked ? selectedBg : "white"}
              _dark={{ bg: isChecked ? "blue.900" : "gray.800", borderColor: isChecked ? "blue.400" : "gray.700" }}
              borderRadius="md"
              px={4}
              py={3}
              align="center"
              gap={3}
              cursor="pointer"
              onClick={() => handleToggle(country.name)}
              transition="all 0.2s"
            >
              <input type="checkbox" checked={isChecked} readOnly />
              <Box>
                <Text fontWeight="medium" fontSize="md">
                  <Box as="span" mr={2}>
                    {country.code}
                  </Box>
                  {country.name}
                </Text>
                {country.note && (
                  <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
                    {country.note}
                  </Text>
                )}
              </Box>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}
