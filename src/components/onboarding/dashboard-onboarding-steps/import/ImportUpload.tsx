import { Box, Text, Flex, Button, VStack, Link } from "@chakra-ui/react";

export const ImportUpload = () => {
  return(
    <Box mt="10" maxW="6xl" mx="auto">
      <Box
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        p="4"
        mb="8"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        _dark={{ bg: "gray.800", borderColor: "blue.400" }}
        cursor="pointer"
      >
        <Box>
          <Text fontWeight="bold" fontSize="md" mb={1}>
            Create your own template{" "}
            <Box
              as="span"
              ml="2"
              fontSize="xs"
              px="2"
              py="0.5"
              bg="gray.100"
              borderRadius="md"
              _dark={{ bg: "gray.700", color: "white" }}
            >
              Recommended
            </Box>
          </Text>
          <Text fontSize="sm" color="gray.800" _dark={{ color: "gray.300" }}>
            Select the predefined identifier and objects that you want to use for the CSV template.
          </Text>
        </Box>
        <Text fontSize="2xl">&#8250;</Text>
      </Box>
      <Text fontSize="xl" fontWeight="bold" mb="2">
        Upload the contacts you want to add to your list.
      </Text>

      <Text fontSize="md" mb="6" color="gray.800" _dark={{ color: "gray.300" }}>
        Each contact must include an{" "}
        <Box as="span" bg="gray.100" px="2" py="0.5" borderRadius="md" fontSize="xs" fontWeight="medium">
          Email Address
        </Box>{" "}
        or{" "}
        <Box as="span" bg="gray.100" px="2" py="0.5" borderRadius="md" fontSize="xs" fontWeight="medium">
          Phone Number
        </Box>{" "}
        along with any additional fields you would like to import. Phone numbers must be in a supported format
        (e.g., +17823746561). In order for contacts to receive messaging, consent fields will need to be
        recorded. If consent status is available, consider including required consent fields when uploading
        contacts.
      </Text>

      {/* Upload box and resources */}
      <Flex gap="6" direction={{ base: "column", md: "row" }}>
        {/* Upload area */}
        <Box
          flex="1"
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="md"
          p="6"
          textAlign="center"
          _dark={{ borderColor: "gray.600" }}
        >
          <Text fontWeight="semibold">Drag and drop or upload CSV (Max file size 50MB)</Text>
          <Text fontSize="sm" color="gray.900" mb="4">
            Accepts .csv file type
            <br />
            Maximum file size 52 MB.
          </Text>
          <Button variant="solid" p="1rem">Upload</Button>
        </Box>

        {/* Resources box */}
        <Box
          w={{ base: "100%", md: "240px" }}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p="4"
          _dark={{ borderColor: "gray.700" }}
        >
          <Text fontSize="sm" mb="2" fontWeight="medium">
            Resources
          </Text>
          <VStack align="start" >
            <Link href="#" color="blue.500" fontSize="sm">
              How to format your file
            </Link>
            <Link href="#" color="blue.500" fontSize="sm">
              Accepted field formats
            </Link>
            <Link href="#" color="blue.500" fontSize="sm">
              How to get your CSV
            </Link>
          </VStack>
        </Box>
      </Flex>

      <Text fontSize="sm" mt="4" color="blue.500" cursor="pointer">
        Switch to copy and paste CSV
      </Text>
    </Box>
  )
}