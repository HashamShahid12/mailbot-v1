import { useEffect, useState } from "react";
import { Flex, Box, Button } from "@chakra-ui/react";
import { UiText } from "@/components/ui/text";
import Tables from "../../components/ui/table";
import type { TopPerformanceFlow } from "@/types/user-type";
import { getTopPerformanceFlows } from "@/api/dashboard-api";
import UiBox from "@/components/ui/box";
import UiLink from "@/components/ui/link";

const columns = [
  { header: "Flow", key: "name", width: "40%", color: "blue.400" },
  { header: "Status", key: "status", width: "10%" },
  { header: "Type", key: "type", width: "8%" },
  { header: "Deliveries", key: "deliveries", width: "12%", isNumeric: true },
  {
    header: "Active on Site",
    key: "activesite",
    width: "14%",
    isNumeric: true,
  },
  {
    header: "Percent on Change",
    key: "percentchange",
    width: "20%",
    isNumeric: true,
  },
];

const TopPerfomanceFlow = () => {
  const [items, setItems] = useState<TopPerformanceFlow[]>([]);

  useEffect(() => {
    getTopPerformanceFlows().then((data) => {
      setItems(data);
    });
  }, []);

  return (
    <>
      {items.length === 0 ? (
        <UiBox>
          <UiText variant="subheading">Top Performing flows</UiText>
          <Box p="1rem 2rem" textAlign="center">
            <img
              src="https://static-app.klaviyo.com/fender/93e8759f906963e380df.svg"
              alt="No flows"
              style={{ margin: "0 auto" }}
            />
            <UiText variant="subheading">Create a flow</UiText>
            <UiText m="auto" mb="10" maxW="2xl">
              Boost sales and increase customer engagement with targeted
              messages. Select a pre-built template or make your own flow. Then,
              track your data here.
            </UiText>
            <Button
              bg="black"
              borderRadius="md"
              fontWeight="medium"
              variant="solid"
            >
              Create flow
            </Button>
          </Box>
        </UiBox>
      ) : (
        <UiBox>
          <Flex gap="4" justify="space-between" align="center">
            <Box>
              <UiText variant="subheading">Top Performing flows</UiText>
              <UiText color="gray.400">Apr 20, 2025 - May 20, 2025</UiText>
            </Box>
            <Box>
              <UiLink href="#">View all flows</UiLink>
            </Box>
          </Flex>
          <Tables columns={columns} rows={items} />
        </UiBox>
      )}
    </>
  );
};

export default TopPerfomanceFlow;
