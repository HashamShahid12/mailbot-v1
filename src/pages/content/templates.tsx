import UiButton from "@/components/ui/button";
import { UiTab } from "@/components/ui/tabs";
import { UiText } from "@/components/ui/text";
import { Box, Flex } from "@chakra-ui/react";
import EmailLibrary from "./email-library";
import EmailSaved from "./email-saved";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate();
  const tabs = [
    // { value: "email_library", label: "Email library" },
    { value: "email_saved", label: "Email: saved" },
  ];

  const tabContent = {
    // email_library: <EmailLibrary />,
    email_saved: <EmailSaved />,
  };
  return (
    <>
      <Box px="5" py="3" bg="white ">
        <Flex
          gap="3"
          align="center"
          justify="space-between"
          _dark={{ bg: "gray.900" }}
        >
          <UiText variant="heading2">Templates</UiText>
          <UiButton uiVariant="solid" onClick={() => navigate("/editor")}>
            Create
          </UiButton>
        </Flex>
      </Box>
      <UiTab
        tabs={tabs}
        defaultValue="email_saved"
        variant="minimal"
        tabContent={tabContent}
      />
    </>
  );
};

export default Templates;
