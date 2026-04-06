import { UiTab } from "@/components/ui/tabs";
import { UiText } from "@/components/ui/text";
import { Box, Link } from "@chakra-ui/react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import SftpSetup from "./sftp-setup";
import SftpImport from "./sftp-import";
import SftpExport from "./sftp-export";

const Sftp = () => {
  const navigate = useNavigate();
  const tabs = [
    { value: "setup", label: "SFTP setup" },
    { value: "import", label: "Data import" },
    { value: "export", label: "Data export" },
  ];

  const tabContent = {
    setup: <SftpSetup />,
    import: <SftpImport />,
    export: <SftpExport />,
  };
  return (
    <>
      <Box px="5" py="3" bg="white ">
        <Link
          color="blue.200"
          w="fit"
          textDecorationStyle="dotted"
          _hover={{ color: "blue.500", textDecoration: "underline" }}
          _focus={{ outline: "none" }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/integrations");
          }}
        >
          <GoArrowLeft />
          Integrations
        </Link>
        <UiText variant="heading2">SFTP data transfer</UiText>
      </Box>
      <UiTab
        tabs={tabs}
        defaultValue="setup"
        variant="minimal"
        tabContent={tabContent}
      />
    </>
  );
};

export default Sftp;
