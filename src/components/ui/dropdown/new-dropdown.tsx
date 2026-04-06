import type { NewDropDownProps } from "@/types/new-drop-down-props";
import { Box, Flex, Icon, Link, Menu, Portal } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UiButton from "../button";

export const NewDropDown: React.FC<NewDropDownProps> = ({
  icon,
  links,
  children,
  p = 4,
  w,
  buttonTitle,
  uiVariant = "outline",

  ...props
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex((prev) => prev);

  return (
    <Menu.Root open={open} onOpenChange={({ open }) => setOpen(open)}>
      <Menu.Trigger asChild>
        <UiButton {...props} uiVariant={uiVariant} px={p}>
          {buttonTitle}
          {icon && (
            <Icon
              as={ChevronDown}
              color="gray.700"
              boxSize="6"
              transition="transform 0.2s ease"
              transform={open ? "rotate(180deg)" : "rotate(0deg)"}
            />
          )}
        </UiButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content border="sm" borderColor="gray.300" w={w}>
            {children
              ? children
              : links?.map((link, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Menu.Item asChild value={link.title}>
                        <Link
                          cursor="button"
                          color={link.color ?? "black"}
                          py="2"
                          px="4"
                          borderTop={link.borderTop ? "sm" : "none"}
                          borderColor="gray.300"
                          href={link.href ?? "#"}
                          target={
                            link.href?.startsWith("http") ? "_blank" : undefined
                          }
                          bg={
                            hoveredIndex === index ? "gray.100" : "transparent"
                          }
                          _focus={{ outline: "none" }}
                          _hover={{ textDecoration: "none" }}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                          onClick={(e) => {
                            link?.onClick?.(e);
                            const href = link.href;
                            if (href) {
                              const isExternal = href.startsWith("http");
                              if (!isExternal) {
                                e.preventDefault();
                                navigate(href);
                              }
                            } else {
                              e.preventDefault();
                            }
                          }}
                        >
                          <Flex direction="column" gap="0.5">
                            <Flex align="center" gap="2">
                              {link.delIcon && (
                                <Icon as={FiTrash2} boxSize="5" />
                              )}
                              <Box fontWeight="medium">{link.title}</Box>
                            </Flex>
                            {link.subtitle && (
                              <Box
                                fontSize="sm"
                                color="gray.400"
                                pl={link.delIcon ? "6" : "0"}
                                lineHeight="0.9"
                                fontWeight="normal"
                              >
                                {link.subtitle}
                              </Box>
                            )}
                          </Flex>
                        </Link>
                      </Menu.Item>
                    </React.Fragment>
                  );
                })}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
