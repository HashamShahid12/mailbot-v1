import type { ActiveSiteDropDownProps } from "@/types/active-site-dropdown-props";
import { SettingsIcon } from "lucide-react";
import { FlexibleDropdown } from ".";
import SearchBar from "../search-bar";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { UiText } from "../text";
import type React from "react";

const ActiveSiteDropDown: React.FC<ActiveSiteDropDownProps> = ({
  selected,
  onChange,
}) => {
  const handleSelect = (value: string) => {
    onChange(selected === value ? null : value);
  };

  return (
    <>
      <FlexibleDropdown
        buttonWidth="2xs"
        icon={<SettingsIcon style={{ width: "24px", height: "24px" }} />}
        label="Active on Site"
        menuWidth="2xs"
        border="sm"
        borderColor="blackAlpha.100"
        boxShadow="none"
      >
        <Box p="3" pb="0">
          <SearchBar />
        </Box>
        <UiText
          p="2"
          mt="3"
          borderTop="md"
          borderColor="gray.300"
          color="gray.400"
        >
          API
        </UiText>

        <Flex
          borderLeft="2lg"
          bg={selected ? "blue.400" : "transparent"}
          p="2"
          borderColor={selected ? "blue.200" : "transparent"}
          alignItems="center"
          cursor="pointer"
          gap="3"
          onClick={() => handleSelect("API")}
        >
          <Box color={selected === "API" ? "blue.700" : "gray.400"}>
            <Icon as={SettingsIcon} color="currentColor" boxSize="5" />
          </Box>
          <UiText color={selected === "API" ? "blue.100" : "gray.800"}>
            Active on Site
          </UiText>
        </Flex>
      </FlexibleDropdown>
    </>
  );
};

export default ActiveSiteDropDown;
