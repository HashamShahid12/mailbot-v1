import { Box, Flex } from "@chakra-ui/react";
import inboxImage from "../../../assets/inboxImage.webp";
import InboxLeftBox from "./inbox-left-box";
import InboxRightCardBox from "./inbox-right-card-box";
import InboxSidebar from "./inbox-sidebar";

const Inbox = () => {
  return (
    <>
      <Flex bg="red.300" maxW="full" minW="sm" overflow="hidden">
        <InboxSidebar />
        <Flex
          px="20"
          maxW="4xl"
          align="center"
          minW={{ sm: "3xl", md: "4xl" }}
          justifyContent={{ sm: "center", lg: "flex-end" }}
        >
          <InboxLeftBox />
        </Flex>
        <Flex w="half" position="relative">
          <Box
            bgImage={`url(${inboxImage})`}
            backgroundPosition="center"
            bgSize="cover"
            h="vh"
            w="full"
          />
          <InboxRightCardBox />
        </Flex>
      </Flex>
    </>
  );
};

export default Inbox;
