import { useState } from "react";
import Checkbox from "@/components/ui/check-box";
import FormField from "@/components/ui/input";
import { UiSelect } from "@/components/ui/select";
import { UiText } from "@/components/ui/text";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { IoMdMail } from "react-icons/io";
import { HiChat } from "react-icons/hi";

const items = [
  {
    label: "Email List",
    value: "email",
    description: "WM9Ecj",
  },
  {
    label: "Preview List",
    value: "preview",
    description: "XWyv6b",
  },
  {
    label: "SMS List",
    value: "sms",
    description: "Ruvg2g",
  },
];

const AudianceFormVisitors = () => {
  const [isEmailChecked, setIsEmailChecked] = useState(true);
  const [isSmsChecked, setIsSmsChecked] = useState(true);
  const [emailList, setEmailList] = useState("");
  const [smsList, setSmsList] = useState("");

  const isSameList =
    isEmailChecked &&
    isSmsChecked &&
    emailList &&
    smsList &&
    emailList === smsList;

  return (
    <Box maxW="xl" m="auto" mt="12">
      <UiText mb="3" variant="heading2">
        First, select the marketing channel website visitors subscribe to
      </UiText>
      <UiText mb="3">
        When a contact fills out the form, they will be able to opt in to
        receive marketing messages. When they opt in, they will be added to the
        list you select.
      </UiText>

      <Flex
        gap="3"
        mb="3"
        borderRadius="sm"
        borderWidth={isSmsChecked ? "3px" : "1px"}
        _hover={!isEmailChecked ? { borderColor: "blue.200" } : undefined}
        borderColor={isEmailChecked ? "blue.200" : "blackAlpha.100"}
        px="4"
        py="3"
        cursor="pointer"
        onClick={() => setIsEmailChecked((prev) => !prev)}
      >
        <Checkbox checked={isEmailChecked} readOnly pointerEvents="none" />
        <Flex gap="2">
          <Icon as={IoMdMail} boxSize="5" />
          <UiText>Email</UiText>
        </Flex>
      </Flex>

      <Flex
        gap="3"
        mb="3"
        borderRadius="sm"
        borderWidth={isSmsChecked ? "3px" : "1px"}
        borderColor={isSmsChecked ? "blue.200" : "blackAlpha.100"}
        _hover={!isSmsChecked ? { borderColor: "blue.200" } : undefined}
        px="4"
        py="3"
        cursor="pointer"
        onClick={() => setIsSmsChecked((prev) => !prev)}
      >
        <Checkbox checked={isSmsChecked} readOnly pointerEvents="none" />
        <Flex gap="2">
          <Icon as={HiChat} boxSize="5" />
          <UiText>SMS</UiText>
        </Flex>
      </Flex>

      {isEmailChecked && (
        <Box mb="3">
          <FormField label="Select email list" input={false} />
          <Box mt="1">
            <UiSelect
              searchBar
              width="full"
              items={items}
              onChange={(val: string) => setEmailList(val)}
            />
          </Box>
        </Box>
      )}

      {isSmsChecked && (
        <Box mb="3">
          <FormField label="Select SMS list" input={false} />
          <Box mt="1">
            <UiSelect
              searchBar
              width="full"
              items={items}
              onChange={(val: string) => setSmsList(val)}
            />
          </Box>
        </Box>
      )}

      {isSameList && (
        <Text color="red.500" fontSize="sm" mt="2">
          Both selected lists are the same. Please choose different lists for
          Email and SMS.
        </Text>
      )}
    </Box>
  );
};

export default AudianceFormVisitors;
