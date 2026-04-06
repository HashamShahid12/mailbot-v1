import type React from "react";
import type { UiLinkProps } from "@/types/ui-link-props";
import { Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UiLink: React.FC<UiLinkProps> = ({
  uiVariant = "primary",
  href,
  children,
  ...props
}) => {
  const variantStyles = {
    primary: {
      bg: "white",
      color: "black",
      _hover: { bg: "gray.600" },
    },
    secondary: {
      bg: "black",
      color: "white",
      border: "none",
      _hover: { bg: "whiteAlpha.200" },
    },
    plain: {
      bg: "white",
      color: "black",
      border: "none",
      _hover: { bg: "gray.600" },
    },
  };

  const resolvedVariant = uiVariant ?? "primary";
  const style = variantStyles[resolvedVariant];
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (href) {
      navigate(href);
    }
  };

  return (
    <Link
      px="4"
      py="2"
      border="sm"
      borderColor="blackAlpha.100"
      borderRadius="md"
      textDecoration="none"
      onClick={handleClick}
      fontWeight="medium"
      _focus={{ outline: "none" }}
      {...style}
      {...props}
    >
      {children}
    </Link>
  );
};

export default UiLink;
