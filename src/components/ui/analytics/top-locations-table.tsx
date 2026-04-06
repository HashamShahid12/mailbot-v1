import React from "react";
import { Box, Table, Flex, Spinner, Center } from "@chakra-ui/react";
import CountryList from "country-list-with-dial-code-and-flag";
import CountryFlagSvg from "country-list-with-dial-code-and-flag/dist/flag-svg";
import { commaFormatting } from "@/helpers";
import { UiText } from "../text";

interface CountryData {
  country: string;
  count: number;
}

interface TopLocationsTableProps {
  countries: CountryData[];
  loading?: boolean;
}

export const TopLocationsTable: React.FC<TopLocationsTableProps> = ({
  countries,
  loading,
}) => {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      p="5"
      boxShadow="sm"
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
    >
      <UiText variant="subheading" fontWeight="bold" fontSize="lg" mb="4">
        Top Locations
      </UiText>

      <Table.Root size="sm" variant="line">
        <Table.Header>
          <Table.Row bg="gray.50" _dark={{ bg: "gray.800" }}>
            <Table.ColumnHeader color="gray.700" p="3">
              Location
            </Table.ColumnHeader>
            <Table.ColumnHeader color="gray.700" p="3" textAlign="right">
              Subscription
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {loading ? (
            <Table.Row>
              <Table.Cell colSpan={2} py="10">
                <Center>
                  <Spinner size="sm" color="blue.500" />
                  <UiText ml="3" color="gray.500">
                    Loading locations...
                  </UiText>
                </Center>
              </Table.Cell>
            </Table.Row>
          ) : countries.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={2} py="10">
                <Center>
                  <UiText color="gray.500">No Countries Found</UiText>
                </Center>
              </Table.Cell>
            </Table.Row>
          ) : (
            countries.map(({ country, count }, index) => {
              let flagUrl = "";
              if (country !== "Others") {
                const countryData = CountryList.findByKeyword(country);
                const filtered = countryData.find(
                  (data) => data.name === country,
                );
                if (filtered) {
                  flagUrl = CountryFlagSvg[filtered.code];
                }
              }

              return (
                <Table.Row
                  key={index}
                  _hover={{ bg: "gray.50" }}
                  _dark={{ _hover: { bg: "gray.800" } }}
                >
                  <Table.Cell py="3">
                    <Flex align="center" gap="3">
                      {flagUrl ? (
                        <Box
                          as="span"
                          dangerouslySetInnerHTML={{ __html: flagUrl }}
                          display="inline-flex"
                          w="24px"
                          h="16px"
                          borderRadius="sm"
                          overflow="hidden"
                          flexShrink={0}
                          sx={{
                            "& svg": {
                              width: "100%",
                              height: "100%",
                              display: "block",
                            },
                          }}
                        />
                      ) : (
                        <Box
                          w="24px"
                          h="16px"
                          bg="gray.100"
                          borderRadius="sm"
                          flexShrink={0}
                        />
                      )}
                      <UiText fontSize="sm" fontWeight="medium">
                        {country || "Others"}
                      </UiText>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell py="3" textAlign="right">
                    <UiText fontSize="sm" fontWeight="semibold">
                      {commaFormatting(count)}
                    </UiText>
                  </Table.Cell>
                </Table.Row>
              );
            })
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default TopLocationsTable;
