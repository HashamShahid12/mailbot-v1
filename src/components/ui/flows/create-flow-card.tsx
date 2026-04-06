import { Box, Flex, Icon, Link, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UiText } from "../text";
import { ChevronRight } from "lucide-react";
import { UiBadge } from "../badge";
import { FaArrowLeftLong } from "react-icons/fa6";
import type React from "react";
import UiLink from "../link";

export interface CreateFlowCardItemProps {
  title: string;
  subtitle: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  badgeIcon?: string;
  description: string;
  icon: React.ElementType | string;
  badgeTitle: string;
}

interface CreateFlowCardProps {
  items: CreateFlowCardItemProps[];
  heading?: string;
  image?: string;
  caption?: string;
  children?: React.ReactNode;
  backButton?: boolean;
}

const CreateFlowCard: React.FC<CreateFlowCardProps> = ({
  items,
  heading,
  caption,
  children,
  image,
  backButton = false,
}) => {
  const navigate = useNavigate();

  console.log(items.length, "items");

  return (
    <>
      <Box my="5">
        {backButton && (
          <UiLink href="/createflow" fontWeight="semibold">
            <Icon as={FaArrowLeftLong} boxSize="6" pr="1" /> Back to Library
          </UiLink>
        )}
        <Flex py="3" gap="3">
          {image && <Image src={image} alt="create-flow-image" />}
          <Box>
            <UiText variant="heading2">{heading}</UiText>
            <UiText variant="caption">{caption}</UiText>
          </Box>
        </Flex>
        {children && (
          <Box mb="5" mt="2">
            {children}
          </Box>
        )}

        <Flex gap="5" wrap="wrap">
          {items.map((item, index) => (
            <Box
              key={index}
              whiteSpace="none"
              w={{
                base: "100%",
                lg: "calc(50% - 0.625rem)",
                xl: "calc(33.333% - 0.86rem)",
              }}
            >
              <Link
                textDecoration="none"
                href={item.href ?? "#"}
                _focus={{ outline: "none" }}
                onClick={(e) => {
                  item?.onClick?.(e);
                  const href = item.href;
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
                <Box
                  borderRadius="md"
                  border="sm"
                  borderColor="gray.600"
                  overflow="hidden"
                  boxShadow="sm"
                  bg="white"
                  _hover={{ borderColor: "blue.200" }}
                >
                  <Flex p="4" align="center" justify="space-between" gap="3">
                    <Box>
                      <UiText fontWeight="semibold">{item.title}</UiText>
                      <UiText variant="caption">{item.subtitle}</UiText>
                    </Box>
                    <Icon as={ChevronRight} boxSize="6" />
                  </Flex>
                  <Flex
                    p="4"
                    borderTop="sm"
                    borderColor="gray.300"
                    direction="column"
                    justify="space-between"
                    gap="3"
                    minH="6xs"
                  >
                    <UiText
                      variant="body"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "2",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.description}
                    </UiText>

                    <Flex justify="space-between">
                      <UiBadge status="pending" icon>
                        {item.badgeIcon && <Image src={item.badgeIcon} w="5" />}
                        {item.badgeTitle}
                      </UiBadge>
                      <UiBadge status="plain">
                        {typeof item.icon === "string" ? (
                          <Image src={item.icon} w="6" />
                        ) : (
                          <Icon as={item.icon} boxSize="5" />
                        )}
                      </UiBadge>
                    </Flex>
                  </Flex>
                </Box>
              </Link>
            </Box>
          ))}
          {items?.length === 0 && (
            <Box textAlign="center" py="5">
              <UiText variant="body" color="black.500">
                Your have used all the flow templates.
              </UiText>
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default CreateFlowCard;
