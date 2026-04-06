import Tables from "@/components/ui/table";
import { UiText } from "@/components/ui/text";
import { Box, Button, Flex } from "@chakra-ui/react";
import { formTableColumns } from "../../components/ui/create-form/form-table";
import { mockFormTableData } from "@/api/mock/dashboard-mock";
import { useNavigate } from "react-router-dom";

export const Forms = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box padding="16px 24px" borderBottom="1px solid rgb(221, 224, 224)">
        <Flex justifyContent="space-between" alignItems="center">
          <UiText fontSize="2xl">Sign-up forms</UiText>
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
              Add forms to website
            </Button>
            <Button p="4" onClick={() => navigate("/forms/create")}>
              Create form
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Tables
        columns={formTableColumns}
        rows={mockFormTableData}
      />
    </>
  );
};
