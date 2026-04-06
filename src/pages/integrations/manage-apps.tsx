import PerformanceCard from "@/components/ui/analytics/deliverability/perfomance-card";
import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import { Box, Flex, Link } from "@chakra-ui/react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ManageApps = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box bg="white" h="full">
        <Flex
          px="5"
          py="3"
          bg="white"
          align="center"
          borderBottom="sm"
          borderColor="gray.100"
          justify="space-between"
        >
          <Box>
            <Link
              color="blue.200"
              w="fit"
              mb="2"
              textDecorationStyle="dotted"
              _hover={{ color: "blue.500", textDecoration: "underline" }}
              _focus={{ outline: "none" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/integrations");
              }}
            >
              <GoArrowLeft />
              Integrations
            </Link>
            <UiText variant="heading2">Manage Apps</UiText>
            <UiText variant="caption">
              Create and manage your public apps
            </UiText>
          </Box>
          <UiButton uiVariant="solid">Create app</UiButton>
        </Flex>
        <PerformanceCard border="none" shadow="none" emptyTable={false}>
          <UiText variant="heading2">No data available</UiText>
          <UiText m="auto" mb="10" maxW="2xl" color="gray.400">
            To start, select create app.
          </UiText>
        </PerformanceCard>
      </Box>
    </>
  );
};

export default ManageApps;
