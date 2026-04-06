import { UiText } from "@/components/ui/text";
import { Box, Flex, Icon } from "@chakra-ui/react";
import inboxAvatar from "../../../assets/inboxWilliam.png";
import { LuPackage } from "react-icons/lu";
import { PiUserListLight } from "react-icons/pi";
import { UiAvatar } from "@/components/ui/avatar";
import { MessageSquareTextIcon } from "lucide-react";

const InboxRightCardBox = () => {
  const cards = [
    {
      name: "Mia Williams",
      description:
        "What is your return policy? Can I return my leggings if I have worn them but don’t like how they feel?",
      email: "mia.williams@abc.com",
      mobile: "+1 (123) 456-7890",
      src: inboxAvatar,
    },
    {
      name: "Sean H.",
      description:
        "Hi Mia, we accept all returns for a full refund or store credit within 30 days, even if they have been worn.",
    },
  ];
  const userDetail = [
    {
      icon: LuPackage,
      text: "Orders",
    },
    {
      icon: PiUserListLight,
      text: "Activity",
    },
  ];
  return (
    <>
      <Box
        p="4"
        w="650px"
        position="absolute"
        top="30%"
        borderRadius="4xl"
        left="10%"
        bg="white"
      >
        <UiText mb="2" variant="subheading" fontWeight="semibold">
          Unified Inbox
        </UiText>
        <Flex>
          <Box pr="4" borderRight="sm" borderColor="gray.300">
            {cards.map((item, index) => (
              <Flex key={index} gap="5" mb="3">
                <UiAvatar name={item.name} src={item.src} />
                <Box>
                  <Flex justify="space-between" align="center">
                    <UiText fontWeight="semibold" mb="1">
                      {item.name}
                    </UiText>
                    <Icon as={MessageSquareTextIcon} />
                  </Flex>
                  <UiText fontSize="sm">{item.description}</UiText>
                </Box>
              </Flex>
            ))}
          </Box>
          <Box pl="4">
            <Box mb="3">
              <UiText fontWeight="semibold">{cards[0].name}</UiText>
              <UiText fontSize="sm">{cards[0].email}</UiText>
              <UiText fontSize="sm">{cards[0].mobile}</UiText>
            </Box>
            <Flex direction="column" gap="3">
              {userDetail.map((item, index) => (
                <Flex
                  key={index}
                  gap="2"
                  border="sm"
                  borderRadius="md"
                  borderColor="gray.300"
                  py="2"
                  justify="center"
                  h="fit"
                >
                  <Icon as={item.icon} boxSize="6" />
                  <UiText>{item.text}</UiText>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default InboxRightCardBox;
