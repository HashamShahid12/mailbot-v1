import { Flex, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { UiText } from "../text";
import UiButton from "../button";

const FlowBuilderHeader = ({ onSave, loading, isTemplate }) => {
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
                navigate("/createflow");
              }}
            >
              <GoArrowLeft />
              Back to Templates
            </Link>
          </Flex>
          <UiText variant="heading2">
            {isTemplate ? "Create Flow" : "Flow Builder"}
          </UiText>
        </Flex>
        <UiButton uiVariant="solid" loading={loading} onClick={onSave}>
          {isTemplate ? "Create Flow" : "Save Flow"}
        </UiButton>
      </Flex>
    </>
  );
};

export default FlowBuilderHeader;
