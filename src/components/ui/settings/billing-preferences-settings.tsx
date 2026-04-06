import { Box, Flex, HStack, Icon, Link, Stack, Table, Checkbox } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { LuExternalLink } from "react-icons/lu";
import UiButton from "../button";
import FormField from "../input";
import { UiSelect } from "../select";
import { UiText } from "../text";

const cardStyle = {
  border: "1px solid",
  borderColor: "gray.200",
  rounded: "16px",
  bg: "white",
  boxShadow:
    "0px 1px 2px rgba(16, 24, 40, 0.06), 0px 8px 24px rgba(16, 24, 40, 0.08)",
  overflow: "hidden",
} as const;

const textColor = {
  title: "#1d1e20",
  muted: "#5b5d63",
} as const;

const BillingPreferencesSettings = () => {
  const [taxCountry, setTaxCountry] = useState<string | undefined>("andorra_nrt");
  const [taxId, setTaxId] = useState("A-123456-Z");
  const [noVatOrGst, setNoVatOrGst] = useState(false);

  const [billingOrgName, setBillingOrgName] = useState("");
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [billingCountry, setBillingCountry] = useState<string | undefined>(
    "united_states",
  );
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState<string | undefined>();
  const [postalCode, setPostalCode] = useState("");
  const [billingEmail, setBillingEmail] = useState("info.abdullahn@gmail.com");

  const countryOptions = useMemo(
    () => [
      { label: "🇦🇩 Andorra — NRT", value: "andorra_nrt" },
      { label: "🇺🇸 United States — EIN", value: "united_states_ein" },
      { label: "🇬🇧 United Kingdom — VAT", value: "united_kingdom_vat" },
    ],
    [],
  );

  const billingCountryOptions = useMemo(
    () => [
      { label: "🇺🇸 United States", value: "united_states" },
      { label: "🇬🇧 United Kingdom", value: "united_kingdom" },
      { label: "🇦🇩 Andorra", value: "andorra" },
    ],
    [],
  );

  const stateProvinceOptions = useMemo(
    () => [
      { label: "Select an option", value: "" },
      { label: "California", value: "ca" },
      { label: "New York", value: "ny" },
      { label: "Texas", value: "tx" },
    ],
    [],
  );

  return (
    <Stack maxW="720px" gap="6" p="2">
      <UiText variant="heading2" fontWeight="medium" color={textColor.title}>
        Preferences
      </UiText>

      <Box {...cardStyle}>
        <Stack p="8" gap="6">
          <UiText fontSize="xl" fontWeight="medium" color={textColor.title}>
            Plan overview
          </UiText>

          <Table.Root size="sm" variant="line">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader color={textColor.muted} fontWeight="medium">
                  Plan
                </Table.ColumnHeader>
                <Table.ColumnHeader color={textColor.muted} fontWeight="medium">
                  Plan value
                </Table.ColumnHeader>
                <Table.ColumnHeader color={textColor.muted} fontWeight="medium">
                  Plan limits
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row _hover={{ bg: "gray.50" }}>
                <Table.Cell py="5">
                  <UiText color={textColor.title}>Profiles + email</UiText>
                </Table.Cell>
                <Table.Cell py="5">
                  <UiText color={textColor.title}>Free</UiText>
                </Table.Cell>
                <Table.Cell py="5">
                  <Stack gap="0">
                    <UiText color={textColor.title}>250 active profiles</UiText>
                    <UiText color={textColor.title}>500 email sends</UiText>
                  </Stack>
                </Table.Cell>
              </Table.Row>
              <Table.Row _hover={{ bg: "gray.50" }}>
                <Table.Cell py="5">
                  <UiText color={textColor.title}>Mobile messaging</UiText>
                </Table.Cell>
                <Table.Cell py="5">
                  <UiText color={textColor.title}>Free</UiText>
                </Table.Cell>
                <Table.Cell py="5">
                  <UiText color={textColor.title}>150 mobile credits</UiText>
                </Table.Cell>
              </Table.Row>
              <Table.Row _hover={{ bg: "gray.50" }}>
                <Table.Cell py="5">
                  <UiText color={textColor.title}>Reviews</UiText>
                </Table.Cell>
                <Table.Cell py="5">
                  <UiText color={textColor.title}>Free</UiText>
                </Table.Cell>
                <Table.Cell py="5">
                  <UiText color={textColor.title}>50 reviews orders</UiText>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Stack>
      </Box>

      <Box {...cardStyle}>
        <Stack p="8" gap="6">
          <Flex justify="space-between" align="center" gap="4" flexWrap="wrap">
            <UiText fontSize="xl" fontWeight="medium" color={textColor.title}>
              VAT ID or GST number
            </UiText>
            <UiButton uiVariant="outline" py="3" px="5" disabled>
              Update tax ID
            </UiButton>
          </Flex>

          <UiText color={textColor.title}>
            Your VAT ID or GST number will be used to provide accurate invoices
            for tax filing.{" "}
            <Link
              href="#"
              color="blue.200"
              fontWeight="medium"
              _hover={{ color: "blue.100", textDecoration: "underline" }}
            >
              Find the VAT ID or GST number in your country{" "}
              <Icon as={LuExternalLink} />
            </Link>
          </UiText>

          <Flex gap="4" flexDir={{ base: "column", md: "row" }}>
            <Box w={{ base: "full", md: "320px" }}>
              <UiSelect
                items={countryOptions}
                width="full"
                selectedItem={taxCountry}
                onChange={setTaxCountry}
                triggerPy="3"
                triggerPx="4"
                borderStyle="sm"
                bgTrigger="white"
              />
            </Box>
            <Box flex="1">
              <FormField
                placeholder="A-123456-Z"
                value={taxId}
                fontSize="md"
                onChange={(_, val) => setTaxId(val)}
                disabled={noVatOrGst}
              />
            </Box>
          </Flex>

          <HStack align="flex-start" gap="3">
            <Checkbox.Root
              checked={noVatOrGst}
              onCheckedChange={(e) => setNoVatOrGst(!!e.checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                border="1px solid"
                borderColor="gray.300"
                bg="white"
                rounded="sm"
                _checked={{ bg: "blue.500", borderColor: "blue.500" }}
              />
              <Checkbox.Label fontSize="sm" cursor="pointer" userSelect="none">
                I don&apos;t have a value-added tax (VAT) or goods and services tax
                (GST number).
              </Checkbox.Label>
            </Checkbox.Root>
          </HStack>
        </Stack>
      </Box>

      <Box {...cardStyle}>
        <Stack p="8" gap="6">
          <Flex justify="space-between" align="center" gap="4" flexWrap="wrap">
            <Box>
              <UiText fontSize="xl" fontWeight="medium" color={textColor.title}>
                Billing address
              </UiText>
              <UiText color={textColor.muted}>
                Your billing address determines the applicable sales tax.
              </UiText>
            </Box>
            <UiButton uiVariant="outline" py="3" px="5" disabled>
              Update billing address
            </UiButton>
          </Flex>

          <FormField
            label="Billing organization name"
            labelmb="2"
            placeholder="Billing organization name"
            value={billingOrgName}
            fontSize="md"
            onChange={(_, val) => setBillingOrgName(val)}
          />

          <HStack align="flex-start" gap="3" pt="2">
            <Checkbox.Root
              checked={useSameAddress}
              onCheckedChange={(e) => setUseSameAddress(!!e.checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                border="1px solid"
                borderColor="gray.300"
                bg="white"
                rounded="sm"
                _checked={{ bg: "blue.500", borderColor: "blue.500" }}
              />
              <Checkbox.Label fontSize="sm" cursor="pointer" userSelect="none">
                Use same address as my organization&apos;s contact information
              </Checkbox.Label>
            </Checkbox.Root>
          </HStack>

          {useSameAddress ? (
            <UiText color={textColor.title}>
              The vertical, lake city lahore lahore, 54000
            </UiText>
          ) : (
            <Stack gap="6">
              <Stack gap="2">
                <UiText color={textColor.title}>Country</UiText>
                <UiSelect
                  items={billingCountryOptions}
                  width="full"
                  selectedItem={billingCountry}
                  onChange={setBillingCountry}
                  triggerPy="3"
                  triggerPx="4"
                  borderStyle="sm"
                  bgTrigger="white"
                />
              </Stack>

              <FormField
                label="Street Address"
                labelmb="2"
                value={streetAddress}
                fontSize="md"
                required
                onChange={(_, val) => setStreetAddress(val)}
              />

              <FormField
                label="Apartment, Suite, etc."
                labelmb="2"
                value={apartment}
                fontSize="md"
                onChange={(_, val) => setApartment(val)}
              />

              <Flex gap="4" flexDir={{ base: "column", md: "row" }}>
                <Box flex="1">
                  <FormField
                    label="City"
                    labelmb="2"
                    value={city}
                    fontSize="md"
                    required
                    onChange={(_, val) => setCity(val)}
                  />
                </Box>
                <Box flex="1">
                  <Stack gap="2">
                    <UiText color={textColor.title}>
                      State/Province{" "}
                      <Box as="span" color="red.50">
                        *
                      </Box>
                    </UiText>
                    <UiSelect
                      items={stateProvinceOptions}
                      width="full"
                      placeholder="Select an option"
                      selectedItem={stateProvince}
                      onChange={(val: string) =>
                        setStateProvince(val === "" ? undefined : val)
                      }
                      triggerPy="3"
                      triggerPx="4"
                      borderStyle="sm"
                      bgTrigger="white"
                    />
                  </Stack>
                </Box>
                <Box flex="1">
                  <FormField
                    label="Postal code"
                    labelmb="2"
                    value={postalCode}
                    fontSize="md"
                    required
                    onChange={(_, val) => setPostalCode(val)}
                  />
                </Box>
              </Flex>
            </Stack>
          )}
        </Stack>
      </Box>

      <Box {...cardStyle}>
        <Stack p="8" gap="6">
          <Flex justify="space-between" align="center" gap="4" flexWrap="wrap">
            <Box>
              <UiText fontSize="xl" fontWeight="medium" color={textColor.title}>
                Billing email
              </UiText>
              <UiText color={textColor.muted}>
                We send email notifications for billing-related updates.
              </UiText>
            </Box>
            <UiButton uiVariant="outline" py="3" px="5" disabled>
              Update billing email
            </UiButton>
          </Flex>

          <FormField
            label="Send billing notifications to"
            labelmb="2"
            value={billingEmail}
            fontSize="md"
            onChange={(_, val) => setBillingEmail(val)}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default BillingPreferencesSettings;
