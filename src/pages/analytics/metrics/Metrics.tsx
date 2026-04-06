import Tables from "@/components/ui/table";
import { UiText } from "@/components/ui/text";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { SettingsIcon } from "lucide-react";
import { BsFlagFill, BsThreeDotsVertical } from "react-icons/bs";

const rows = [
  {
    id: 1,
    icon: <Icon as={SettingsIcon} boxSize={5} />,
    name: "Active on Site",
  },
  {
    id: 2,
    icon: <Icon as={BsFlagFill} boxSize={5} />,
    name: "Bounced Email",
  },
  {
    id: 3,
    icon: <Icon as={BsFlagFill} boxSize={5} />,
    name: "Clicked Email",
  },
  {
    id: 4,
    icon: <Icon as={BsFlagFill} boxSize={5} />,
    name: "Clicked email to unsubscribe",
  },
  {
    id: 5,
    icon: <Icon as={BsFlagFill} boxSize={5} />,
    name: "Clicked SMS",
  },
  {
    id: 6,
    icon: <Icon as={BsFlagFill} boxSize={5} />,
    name: "Dropped Email",
  },
  {
    id: 7,
    icon: <Icon as={BsFlagFill} boxSize={5} />,
    name: "Failed to Deliver Automated Response SMS",
  },
  {
    id: 8,
    icon: <Icon as={BsFlagFill} boxSize={5} />,
    name: "Failed to Deliver SMS",
  },
  {
    id: 9,
    icon: <Icon as={BsFlagFill} boxSize={5} />,
    name: "Marked Email as Spam",
  },
  {
    id: 10,
    icon: <Icon as={BsFlagFill} boxSize={5} />,
    name: "Opened Email",
  },
  {
    id: 11,
    icon: <Icon as={BsFlagFill} boxSize={5} />,
    name: "Received Automated Response SMS",
  },
];

const columns = [
  {
    key: "icon",
    header: "",
    width: "40px",
  },
  {
    key: "name",
    header: "Metric",
  },
  {
    key: "actions",
    header: "",
    isNumeric: true,
    width: "40px",
    cell: () => (
      <Box as="button">
        <Icon as={BsThreeDotsVertical} boxSize={4} />
      </Box>
    ),
  },
];


export const Metrics = () => {
  return (
    <>
      <Box padding="16px 24px" borderBottom="1px solid rgb(221, 224, 224)">
        <Flex justifyContent="space-between" alignItems="center">
          <UiText fontSize="2xl">Metrics</UiText>
          <Flex gap="3">
            <Button
              p="4"
              variant="plain"
              background="transparent"
              border="1px solid"
            >
              Edit metric mapping
            </Button>
            <Button
              p="4"
              variant="plain"
              background="transparent"
              border="1px solid"
            >
              View activity feed
            </Button>
            <Button p="4">Create custom metric</Button>
          </Flex>
        </Flex>
      </Box>

      <Tables
        columns={columns}
        rows={rows}
        heading=""
        headerPadding="4"
        rowpadding="4"
        pagination={false}
        pagePerRow={false}
      />

    </>
  );
};
