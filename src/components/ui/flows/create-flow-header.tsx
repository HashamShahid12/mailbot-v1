import { Flex, Link, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { UiText } from "../text";
import UiButton from "../button";

const CreateFlowHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex
        px="5"
        py="2"
        bg="white"
        borderY="sm"
        justify="space-between"
        borderColor="gray.600"
        align="center"
      >
        <Flex direction="column" gap="2">
          <Flex flexDirection="column">
            <Link
              color="blue.200"
              w="fit"
              textDecorationStyle="dotted"
              _hover={{ color: "blue.500", textDecoration: "underline" }}
              _focus={{ outline: "none" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/flows");
              }}
            >
              <GoArrowLeft />
              Flows
            </Link>
          </Flex>
          <UiText variant="heading2">Create Flow</UiText>
        </Flex>
        <UiButton
          uiVariant="solid"
          onClick={() =>
            navigate("/createflow/create?type=custom&template=true")
          }
        >
          Create Custom Flow
        </UiButton>
      </Flex>
    </>
  );
};

export default CreateFlowHeader;
