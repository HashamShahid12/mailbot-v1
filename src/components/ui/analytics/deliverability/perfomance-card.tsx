import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import UiBox from "../../box";
import { UiText } from "../../text";
import UiLink from "../../link";
import type React from "react";
import EmptyTable from "../../../../assets/emptytable.svg";
import { UiTab } from "../../tabs";
import type { TabsComponentProps } from "@/types/ui-tab-props";
import type { BoxProps } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

interface PerformanceCardProps extends BoxProps {
  heading?: string;
  linkTitle?: string;
  linkIcon?: boolean;
  linkHref?: string;
  showDate?: boolean;
  image?: boolean;
  tabs?: TabsComponentProps;
  children?: React.ReactNode;
  emptyTable?: boolean;
  subtitle?: string;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  heading,
  linkHref,
  linkIcon = false,
  linkTitle,
  showDate = false,
  image = true,
  tabs,
  emptyTable = true,
  children,
  subtitle,
  ...props
}) => {
  const today = new Date();
  const date = today.getDate();
  const previousMonth = new Date(today);
  previousMonth.setMonth(today.getMonth() - 1);
  const startMonth = previousMonth.toLocaleString("default", { month: "long" });
  const endMonth = today.toLocaleString("default", { month: "long" });
  const fullYear = today.getFullYear();
  return (
    <>
      <UiBox {...props}>
        <Flex justify="space-between">
          <Box>
            <UiText variant="heading2">{heading}</UiText>
            {subtitle && <UiText color="gray.400">{subtitle}</UiText>}
            {showDate && (
              <UiText color="gray.400">
                {startMonth} {date} – {endMonth} {date}, {fullYear}
              </UiText>
            )}
          </Box>
          <Flex gap="3" align="center">
            {tabs && <UiTab {...(tabs as TabsComponentProps)} />}
            {linkTitle && (
              <UiLink href={linkHref} fontWeight="semibold">
                {linkTitle}
                {linkIcon && <Icon as={LuExternalLink} boxSize="4" />}
              </UiLink>
            )}
          </Flex>
        </Flex>
        <Box p="1rem 2rem" textAlign="center">
          {image && (
            <Image src={EmptyTable} alt="No Campaigns" w="xs" m="auto" />
          )}
          {children}
          {emptyTable && (
            <>
              <UiText variant="heading2">No data available</UiText>
              <UiText m="auto" mb="10" maxW="2xl" color="gray.400">
                Refresh the page to try again.
              </UiText>
            </>
          )}
        </Box>
      </UiBox>
    </>
  );
};

export default PerformanceCard;
