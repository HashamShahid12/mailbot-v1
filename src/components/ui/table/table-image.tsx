import { useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { PrimitiveDialog } from "../dailog-model";

const TableImage = ({ image }: { image: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrimitiveDialog
        trigger={
          <Box
            as="button"
            onClick={() => setOpen(true)}
            borderRadius="md"
            overflow="hidden"
            cursor="pointer"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ borderColor: "blue.300" }}
            p="0"
            bg="white"
          >
            <Image
              height="50px"
              width="50px"
              objectFit="cover"
              src={image}
              alt="template image"
            />
          </Box>
        }
        onOpenChange={setOpen}
        title="Template preview"
        size="lg"
        contentPadding="2"
      >
        <Box
          maxH="70vh"
          maxW="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="blackAlpha.50"
        >
          <Image
            src={image}
            alt="template image full view"
            maxH="70vh"
            maxW="100%"
            objectFit="contain"
            m="auto"
          />
        </Box>
      </PrimitiveDialog>
    </>
  );
};

export default TableImage;
