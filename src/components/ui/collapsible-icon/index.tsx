import { Icon } from "@chakra-ui/react";
import { useCollapsibleContext } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const CollapsibleIcon = () => {
  const { open } = useCollapsibleContext();
  return <Icon as={open ? FiChevronUp : FiChevronDown} boxSize="6" />;
};
