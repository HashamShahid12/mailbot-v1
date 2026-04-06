import {
    Box,
    Text,
    Grid,
    GridItem,
    Select,
    Flex,
    Button,
} from "@chakra-ui/react";
import { FormField } from "@/components/ui";
import { UiText } from "@/components/ui/text";
import { UiSelect } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useOnboardingValidation } from "@/store/onboardingValidationStore";

const listItems = [
    { value: "list1", label: "Pakistan" },
    { value: "list2", label: "Germany" },
    { value: "list3", label: "USA" },
    { value: "list4", label: "London" },
];

export const SmsCompanyInfoForm = () => {
    const [selectedList, setSelectedList] = useState<string | undefined>();
    const { setValid } = useOnboardingValidation();
     useEffect(() => {
        setValid(Boolean(selectedList));
    }, [selectedList, setValid]);

    return (
        <Box maxW="2xl" mx="auto" mt="10" mb="10">
            <UiText variant="heading2" mb="2">
                What’s your company information?
            </UiText>
            <UiText variant="subheading" mb="6">
                Your information will only be used to verify a toll-free phone number so
                that you can send SMS messages in the United States and Canada.
            </UiText>

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <FormField
                    name="firstName"
                    label="First name"
                    placeholder="First name"
                    required
                    input
                />
                <FormField
                    name="lastName"
                    label="Last name"
                    placeholder="Last name"
                    required
                    input
                />
            </Grid>

            <Box mt={4}>
                <FormField
                    name="email"
                    label="Contact Email"
                    placeholder="email@example.com"
                    type="email"
                    required
                />
            </Box>

            <Box mt={4}>
                <FormField
                    name="companyPhone"
                    label="Company phone number"
                    placeholder="+1 201-213-1234"
                    required
                    input
                />
            </Box>

            <Box mt={4}>
                <FormField
                    name="addressLine1"
                    label="Address line 1"
                    placeholder="123 Main Street"
                    required
                    input
                />
            </Box>

            <Box mt={4}>
                <FormField
                    name="addressLine2"
                    label="Address line 2 (optional)"
                    placeholder="Suite, apartment, unit, etc."
                />
            </Box>

            <Box mt={4}>
                <FormField name="city" label="City" placeholder="Your city" required />
            </Box>

            <Box mt={4}>
                <Text fontWeight="medium" mb="1">
                    Country <Text as="span" color="red.500">*</Text>
                </Text>
                <UiSelect
                    width="full"
                    items={listItems}
                    selectedItem={selectedList}
                    onChange={(val) => setSelectedList(val)}
                />
                <Box mt={4}>
                    <FormField
                        name="zipCode"
                        label="Postal/ZIP code"
                        placeholder="5400"
                        required
                        input
                    />
                </Box>
            </Box>
        </Box>
    );
};
