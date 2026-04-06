import { Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type React from "react";
import type { UiTextLinkProps } from "@/types/ui-text-link-props";
import { LuExternalLink } from "react-icons/lu";

const UiTextLink: React.FC<UiTextLinkProps> = ({
  value,
  href,
  icon = false,
  uiVariant = "primary",
  ...props
}) => {
  const navigate = useNavigate();
  const styles = {
    primary: {
      color: "blue.200",
      _hover: { color: "blue.100", textDecoration: "underline" },
    },
    secondary: {
      color: "blue.50",
      textDecoration: "underline",
      textDecorationStyle: "dotted",
      _hover: { color: "blue.500", textDecoration: "underline" },
    },
  };

  return (
    <>
      <Link
        _focus={{
          outline: "none",
        }}
        onClick={(e) => {
          e.preventDefault();
          if (href) navigate(href);
        }}
        {...styles[uiVariant]}
        {...props}
      >
        {value}
        {icon === true && <LuExternalLink />}
        {typeof icon !== "boolean" && icon}
      </Link>
    </>
  );
};

export default UiTextLink;
