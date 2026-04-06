import type { SearchBarProps } from "@/types/searchbar-props";
import { Box, Input } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { forwardRef } from "react";

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      placeholder = "Search...",
      righttext,
      w = "full",
      value,
      h,
      onChange,
      ...props
    },
    ref,
  ) => {
    return (
      <Box
        position="relative"
        w={w}
        display="flex"
        alignItems="center"
        border="sm"
        h={h}
        bg="white"
        borderColor="blackAlpha.100"
        borderRadius="sm"
        _hover={{ borderColor: "blue.200" }}
        _focusWithin={{
          borderColor: "blue.200",
          outline: "4px solid",
          outlineColor: "blue.600",
        }}
      >
        <Box position="absolute" left="10px" pointerEvents="none">
          <Search color="black" width="17" />
        </Box>
        <Box width="100%">
          <Input
            ref={ref}
            pl="2.2rem"
            height="9xs"
            fontSize="md"
            border="none"
            value={value}
            outline="none"
            onChange={onChange}
            placeholder={placeholder}
            // fontFamily="Helvetica Neue"
            pr={righttext ? "3.5rem" : "1rem"}
            _placeholder={{ color: "gray.700" }}
            {...props}
          />
        </Box>
        {righttext && (
          <Box position="absolute" right="10px" color="gray.400">
            {/* <UiText fontFamily="Helvetica Neue">{righttext}</UiText> */}
            {righttext}
          </Box>
        )}
      </Box>
    );
  },
);

export default SearchBar;
