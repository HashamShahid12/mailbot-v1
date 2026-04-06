import PerformanceCard from "@/components/ui/analytics/deliverability/perfomance-card";
import UiBox from "@/components/ui/box";
import UiButton from "@/components/ui/button";
import Checkbox from "@/components/ui/check-box";
import { UiText } from "@/components/ui/text";
import UiTextLink from "@/components/ui/text-link";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { useState } from "react";

const categoryData = [
  {
    heading: "Marketing Data",
    desc: " Add sample Mailbot email events and SMS events for sample profiles.",
  },
  {
    heading: "Ecommerce Data",
    desc: " Add sample custom integration Ecommerce events for sample profiles.",
  },
  {
    heading: "Catalog Data",
    desc: " Add sample products in your catalog.",
  },
];

const DeveloperToolsSampleData = () => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(categoryData.length).fill(false)
  );

  const handleToggle = (index: number) => {
    const updated = [...checkedItems];
    updated[index] = !updated[index];
    setCheckedItems(updated);
  };
  return (
    <>
      <Stack maxW="5xl" m="auto" gap="5" p="5">
        <UiBox>
          <UiText variant="subheading" fontWeight="semibold">
            Select Data Type
          </UiText>
          <UiText mt="5">
            You can add sample marketing, ecommerce, and catalog data into this
            account for testing or development purposes. Each type of sample
            data can be added one time per account.{" "}
            <UiTextLink value="Learn More" icon />
          </UiText>
          <Flex justify="space-between" gap="3" my="3">
            {categoryData.map((card, index) => (
              <Flex
                p="4"
                gap="5"
                maxW="280px"
                border="sm"
                key={index}
                cursor="button"
                borderRadius="sm"
                onClick={() => handleToggle(index)}
                borderColor="blackAlpha.100"
                _hover={{ borderColor: "blue.200" }}
              >
                <Checkbox
                  pointerEvents="none"
                  checked={checkedItems[index]}
                  onChange={() => handleToggle(index)}
                />
                <Box>
                  <UiText fontWeight="semibold">{card.heading}</UiText>
                  <UiText variant="caption" lineHeight="1">
                    {card.desc}
                  </UiText>
                </Box>
              </Flex>
            ))}
          </Flex>
          <Flex
            mt="7"
            pt="10"
            borderTop="sm"
            justify="flex-end"
            borderColor="blackAlpha.100"
          >
            <UiButton uiVariant="outline" disabled>
              Add Data
            </UiButton>
          </Flex>
        </UiBox>
        <PerformanceCard emptyTable={false}>
          <UiText variant="heading2">
            Sample profiles and events will appear here
          </UiText>
          <UiText m="auto" mb="10" maxW="2xl" color="gray.400">
            Sample profiles with Marketing Data or <br /> Ecommerce Data will be
            added to your account.
          </UiText>
        </PerformanceCard>
        <PerformanceCard emptyTable={false}>
          <UiText variant="heading2">
            Sample catalog data will appear here
          </UiText>
          <UiText m="auto" mb="10" maxW="2xl" color="gray.400">
            Sample product data will be added to your account.
          </UiText>
        </PerformanceCard>
      </Stack>
    </>
  );
};

export default DeveloperToolsSampleData;
