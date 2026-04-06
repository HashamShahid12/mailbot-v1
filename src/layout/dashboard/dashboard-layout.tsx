import { Header } from "./header-bar";
import { Sidebar } from "./side-bar";
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

export const DashboardLayout = () => {
  return (
    <Flex direction="column" height="100vh">
      <Header />
      <Flex flex="1" overflow="hidden">
        <Box
          w="250px"
          bg="white"
          _dark={{ bg: "gray.950" }}
          borderRight="1px solid"
          borderColor="gray.200"
          flexShrink="0"
        >
          <Sidebar />
        </Box>
        <Box
          className="main"
          flex="1"
          bg="gray.50"
          _dark={{ bg: "gray.950" }}
          overflow="auto"
        >
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};
