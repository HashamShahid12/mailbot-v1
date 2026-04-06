import { Box, HStack, Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { CircleAlert, ExternalLink } from "lucide-react";
import UiBox from "../box";
import UiButton from "../button";
import FormField from "../input";
import { UiText } from "../text";
import { UiSelect } from "../select";

type ContactInfoState = {
  defaultSenderName: string;
  defaultSenderEmail: string;
  companyName: string;
  websiteUrl: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

const INITIAL_CONTACT_INFO: ContactInfoState = {
  defaultSenderName: "adex",
  defaultSenderEmail: "nomanaslam1696@gmail.com",
  companyName: "adex",
  websiteUrl: "https://www.klaviyo.com/sign-up",
  streetAddress: "liberty lahore",
  streetAddress2: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
};

const AccountOrganizationSettings = () => {
  const [contactInfo, setContactInfo] =
    useState<ContactInfoState>(INITIAL_CONTACT_INFO);
  const [organizationLanguage, setOrganizationLanguage] = useState("en-US");
  const [timeZone, setTimeZone] = useState("US/Eastern");
  const [industry, setIndustry] = useState("");
  const [vertical, setVertical] = useState("");

  const hasRequiredFields = useMemo(
    () =>
      contactInfo.defaultSenderName.trim() !== "" &&
      contactInfo.defaultSenderEmail.trim() !== "" &&
      contactInfo.companyName.trim() !== "" &&
      contactInfo.websiteUrl.trim() !== "" &&
      contactInfo.streetAddress.trim() !== "" &&
      contactInfo.city.trim() !== "" &&
      contactInfo.country.trim() !== "" &&
      contactInfo.postalCode.trim() !== "",
    [contactInfo],
  );

  const hasChanges = useMemo(
    () => JSON.stringify(contactInfo) !== JSON.stringify(INITIAL_CONTACT_INFO),
    [contactInfo],
  );
  const hasOrganizationLanguageChanges = organizationLanguage !== "en-US";
  const hasTimeZoneChanges = timeZone !== "US/Eastern";
  const hasIndustryChanges = industry !== "" || vertical !== "";

  const preview = useMemo(() => {
    const now = new Date();
    return {
      dateTime: new Intl.DateTimeFormat(organizationLanguage, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      }).format(now),
      shortDate: new Intl.DateTimeFormat(organizationLanguage, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(now),
      number: new Intl.NumberFormat(organizationLanguage).format(834561242.59),
      percentage: new Intl.NumberFormat(organizationLanguage, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(0.5976),
      currency: new Intl.NumberFormat(organizationLanguage, {
        style: "currency",
        currency: "USD",
      }).format(3456.68),
      compactCurrency: new Intl.NumberFormat(organizationLanguage, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 0,
      }).format(23000),
    };
  }, [organizationLanguage]);

  const onSave = () => {
    console.log("Contact information:", contactInfo);
  };

  return (
    <Stack maxW="720px" gap={4}>
      <Box>
        <UiText variant="heading2">Organization</UiText>
      </Box>

      <UiBox
        heading="Contact information"
        actions={
          <UiButton
            uiVariant="solid"
            onClick={onSave}
            disabled={!hasRequiredFields || !hasChanges}
          >
            Save
          </UiButton>
        }
        showLayout
      >
        <Stack gap={6}>
          <FormField
            label="Default sender name"
            name="defaultSenderName"
            required
            value={contactInfo.defaultSenderName}
            onChange={(name, value) => {
              setContactInfo((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
          />

          <Box
            border="sm"
            borderColor="blue.500"
            borderRadius="md"
            p={4}
            bg="blue.400"
          >
            <HStack align="start" gap={3}>
              <CircleAlert size={18} />
              <Box>
                <UiText variant="body">
                  Sending from a personal email address (e.g. @gmail.com) can
                  cause inbox providers to flag your messages as spam. Update
                  your default sender email address below to an email address
                  that includes your own site domain name.
                  <UiText as="span" color="blue.200">
                    {" "}
                    Learn more
                  </UiText>
                  <ExternalLink size={13} style={{ display: "inline" }} />
                </UiText>
              </Box>
            </HStack>
          </Box>

          <HStack align="end" gap={4} flexDir={{ base: "column", md: "row" }}>
            <FormField
              label="Default sender email address"
              name="defaultSenderEmail"
              type="email"
              required
              value={contactInfo.defaultSenderEmail}
              onChange={(name, value) => {
                setContactInfo((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }}
            />

            <UiButton
              uiVariant="outline"
              disabled
              w={{ base: "full", md: "auto" }}
            >
              Apply sender email to all messages
            </UiButton>
          </HStack>

          <HStack gap={4} flexDir={{ base: "column", md: "row" }}>
            <FormField
              label="Company/organization name"
              name="companyName"
              required
              value={contactInfo.companyName}
              onChange={(name, value) => {
                setContactInfo((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }}
            />

            <FormField
              label="Website URL"
              name="websiteUrl"
              required
              value={contactInfo.websiteUrl}
              onChange={(name, value) => {
                setContactInfo((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }}
            />
          </HStack>

          <FormField
            label="Street address"
            name="streetAddress"
            required
            value={contactInfo.streetAddress}
            onChange={(name, value) => {
              setContactInfo((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
          />

          <FormField
            label="Street address 2"
            name="streetAddress2"
            value={contactInfo.streetAddress2}
            onChange={(name, value) => {
              setContactInfo((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
          />

          <HStack gap={4} flexDir={{ base: "column", md: "row" }}>
            <FormField
              label="City"
              name="city"
              required
              value={contactInfo.city}
              onChange={(name, value) => {
                setContactInfo((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }}
            />

            <FormField
              label="State/Province/Region"
              name="state"
              value={contactInfo.state}
              onChange={(name, value) => {
                setContactInfo((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }}
            />
          </HStack>
          <HStack gap={4} flexDir={{ base: "column", md: "row" }}>
            <FormField
              label="Country"
              name="country"
              required
              value={contactInfo.country}
              onChange={(name, value) => {
                setContactInfo((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }}
            />

            <FormField
              label="Postal/Zip code"
              required
              name="postalCode"
              value={contactInfo.postalCode}
              onChange={(name, value) => {
                setContactInfo((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }}
            />
          </HStack>
        </Stack>
      </UiBox>

      <UiBox
        heading="Organization language and regional format"
        description={
          <Box>
            Klaviyo uses this language for some email notices and default
            settings. It does not affect the language you see in the
            application.
            <UiText as="span" color="blue.200">
              {" "}
              Learn more
            </UiText>
          </Box>
        }
        actions={
          <UiButton
            uiVariant="solid"
            onClick={() => console.log({ organizationLanguage })}
            disabled={!hasOrganizationLanguageChanges}
          >
            Save
          </UiButton>
        }
        showLayout
      >
        <HStack align="start" gap={8} flexDir={{ base: "column", md: "row" }}>
          <Stack gap={8} flex="1" w="full">
            <Box>
              <UiText variant="body">Organization language</UiText>
              <Box mt={2}>
                <UiSelect
                  selectedItem={organizationLanguage}
                  onChange={setOrganizationLanguage}
                  width="full"
                  items={[
                    { label: "English", value: "en-US" },
                    { label: "Spanish", value: "es-ES" },
                    { label: "French", value: "fr-FR" },
                    { label: "German", value: "de-DE" },
                  ]}
                />
              </Box>
            </Box>

            <Box>
              <UiText variant="body">US regional format</UiText>
              <UiText variant="caption">
                The formatting for numbers, times, dates, and currencies uses
                the standards in the United States.
              </UiText>
            </Box>
          </Stack>

          <Box flex="1" w="full">
            <UiText variant="body" mb={2}>
              Preview
            </UiText>
            <Box bg="gray.600" p={4} borderRadius="md">
              <UiText whiteSpace="pre-line">
                {`Date, time, and timezone
${preview.dateTime}
${preview.shortDate}

Number, percentage, and currency
${preview.number}
${preview.percentage}
${preview.currency}
${preview.compactCurrency}`}
              </UiText>
            </Box>
          </Box>
        </HStack>
      </UiBox>

      <UiBox
        heading="Time zone"
        description="Your time zone is used to display dates and times."
        actions={
          <UiButton
            uiVariant="solid"
            onClick={() => console.log({ timeZone })}
            disabled={!hasTimeZoneChanges}
          >
            Save
          </UiButton>
        }
        showLayout
      >
        <Box>
          <UiText variant="body" mb={2}>
            Time zone
          </UiText>
          <UiSelect
            selectedItem={timeZone}
            onChange={setTimeZone}
            width="full"
            items={[
              { label: "US/Eastern", value: "US/Eastern" },
              { label: "US/Central", value: "US/Central" },
              { label: "US/Mountain", value: "US/Mountain" },
              { label: "US/Pacific", value: "US/Pacific" },
              { label: "UTC", value: "UTC" },
            ]}
          />
        </Box>
      </UiBox>

      <UiBox
        heading="Industry information"
        description="Your selection powers Klaviyo analytics and helps provide more accurate guidance for your account. It can be updated 2 times every 30 days."
        actions={
          <UiButton
            uiVariant="solid"
            onClick={() => console.log({ industry, vertical })}
            disabled={!hasIndustryChanges}
          >
            Save
          </UiButton>
        }
        showLayout
      >
        <Stack gap={8} maxW="md">
          <Box>
            <UiText variant="body">Industry</UiText>
            <UiText variant="caption">
              Defines your business and what goods or services you sell.
            </UiText>
            <Box mt={2}>
              <UiSelect
                selectedItem={industry}
                onChange={setIndustry}
                width="full"
                placeholder="Select your industry"
                items={[
                  { label: "Retail", value: "retail" },
                  { label: "Ecommerce", value: "ecommerce" },
                  { label: "Software", value: "software" },
                  { label: "Education", value: "education" },
                ]}
              />
            </Box>
          </Box>

          <Box>
            <UiText variant="body">Vertical</UiText>
            <UiText variant="caption">
              Refines the industry categorization.
            </UiText>
            <Box mt={2}>
              <UiSelect
                selectedItem={vertical}
                onChange={setVertical}
                width="full"
                placeholder="Select your vertical"
                items={[
                  { label: "Apparel", value: "apparel" },
                  { label: "Home & Garden", value: "home_garden" },
                  { label: "Health & Beauty", value: "health_beauty" },
                  { label: "Food & Beverage", value: "food_beverage" },
                ]}
              />
            </Box>
          </Box>
        </Stack>
      </UiBox>
    </Stack>
  );
};

export default AccountOrganizationSettings;
