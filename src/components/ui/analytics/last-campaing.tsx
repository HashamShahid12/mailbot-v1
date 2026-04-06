import React from "react";
import {
  Box,
  Flex,
  Image,
  Badge,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { UiText } from "../text";
import { commaFormatting } from "@/helpers";
import {
  TbEye,
  TbPointer,
  TbMailCheck,
  TbCurrencyDollar,
  TbUsers,
} from "react-icons/tb";

interface CampaignData {
  id?: string;
  title?: string;
  status?: string;
  subject?: string;
  template_image?: string;
  segment?: {
    name: string;
  };
  open?: number;
  click?: number;
  delivery?: number;
  success_delivery?: number;
  bounce?: number;
  unsubscribed?: number;
  complaint?: number;
  orders_count?: number;
  revenue?: number;
  campaign_sent?: number;
  subscriber_count?: number;
  created_at?: string;
}

interface LastCampaignProps {
  campaign: CampaignData;
  loading?: boolean;
}

export const LastCampaign: React.FC<LastCampaignProps> = ({
  campaign,
  loading,
}) => {
  if (loading) {
    return (
      <Box
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="xl"
        p="5"
        boxShadow="sm"
        _dark={{ bg: "gray.900", borderColor: "gray.700" }}
        height="full"
      >
        <Flex justify="space-between" align="center" mb="4">
          <Skeleton h="20px" w="120px" />
          <Skeleton h="20px" w="60px" borderRadius="full" />
        </Flex>

        <Flex gap="4" mb="6">
          <Skeleton w="120px" h="160px" borderRadius="lg" />
          <Box flex="1">
            <Skeleton h="20px" w="80%" mb="2" />
            <Skeleton h="16px" w="60%" mb="2" />
            <Skeleton h="14px" w="40%" mb="2" />
            <Skeleton h="12px" w="30%" />
          </Box>
        </Flex>

        {/* {<Divider mb="6" />} */}
        <SimpleGrid columns={2} gap="4">
          {[1, 2, 3, 4].map((i) => (
            <Flex
              key={i}
              align="center"
              gap="3"
              p="3"
              borderRadius="lg"
              bg="gray.50"
              _dark={{ bg: "gray.800" }}
            >
              <SkeletonCircle size="10" />
              <Box flex="1">
                <Skeleton h="10px" w="40%" mb="1" />
                <Skeleton h="16px" w="60%" />
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (!campaign || !campaign.id) {
    return (
      <Box
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="xl"
        p="5"
        boxShadow="sm"
        _dark={{ bg: "gray.900", borderColor: "gray.700" }}
        height="full"
      >
        <UiText variant="subheading" fontWeight="bold" fontSize="lg" mb="4">
          Last Campaign
        </UiText>
        <Flex align="center" justify="center" h="200px">
          <UiText color="gray.500">No recent campaign found</UiText>
        </Flex>
      </Box>
    );
  }

  const stats = [
    {
      label: "Sent",
      value: campaign.campaign_sent || 0,
      icon: TbMailCheck,
      color: "blue",
    },
    { label: "Opens", value: campaign.open || 0, icon: TbEye, color: "green" },
    {
      label: "Clicks",
      value: campaign.click || 0,
      icon: TbPointer,
      color: "purple",
    },
    {
      label: "Revenue",
      value: `Rs ${campaign.revenue || 0}`,
      icon: TbCurrencyDollar,
      color: "orange",
    },
  ];

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      p="5"
      boxShadow="sm"
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
      height="full"
    >
      <Flex justify="space-between" align="center" mb="4">
        <UiText variant="subheading" fontWeight="bold" fontSize="lg">
          Last Campaign
        </UiText>
        <Badge
          colorScheme={campaign.status === "active" ? "green" : "gray"}
          borderRadius="full"
          px="3"
          textTransform="capitalize"
        >
          {campaign.status}
        </Badge>
      </Flex>

      <Flex gap="4" direction={{ base: "column", sm: "row" }} mb="6">
        <Box
          w={{ base: "full", sm: "120px" }}
          h="160px"
          borderRadius="lg"
          overflow="hidden"
          border="1px solid"
          borderColor="gray.100"
          bg="gray.50"
          flexShrink={0}
        >
          {campaign.template_image ? (
            <Image
              src={campaign.template_image.trim().replace(/^`|`$/g, "")}
              alt="Campaign Template"
              w="full"
              h="full"
              objectFit="cover"
              fallback={<Box w="full" h="full" bg="gray.100" />}
            />
          ) : (
            <Box w="full" h="full" bg="gray.100" />
          )}
        </Box>

        <Flex direction="column" justify="center" gap="2" flex="1">
          <UiText fontWeight="bold" fontSize="md" noOfLines={1}>
            {campaign.title}
          </UiText>
          <UiText fontSize="sm" color="gray.700" noOfLines={2}>
            Subject: {campaign.subject}
          </UiText>
          <Flex align="center" gap="2" mt="1">
            <Box as={TbUsers} size="14px" color="gray.400" />
            <UiText fontSize="xs" color="gray.700">
              Segment: {campaign.segment?.name || "All Customers"}
            </UiText>
          </Flex>
          <UiText fontSize="xs" color="gray.400">
            Created on{" "}
            {new Date(campaign.created_at || "").toLocaleDateString()}
          </UiText>
        </Flex>
      </Flex>

      {/* <Divider mb */}

      <SimpleGrid columns={2} gap="4">
        {stats.map((stat, index) => (
          <Flex
            key={index}
            align="center"
            gap="3"
            p="3"
            borderRadius="lg"
            bg="gray.50"
            _dark={{ bg: "gray.800" }}
          >
            <Box
              p="2"
              borderRadius="md"
              bg={`${stat.color}.100`}
              color={`${stat.color}.800`}
              _dark={{ bg: `${stat.color}.900`, color: `${stat.color}.200` }}
            >
              <stat.icon size="18px" />
            </Box>
            <Box>
              <UiText
                fontSize="xs"
                color="gray.700"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                {stat.label}
              </UiText>
              <UiText fontWeight="bold" fontSize="md">
                {typeof stat.value === "number"
                  ? commaFormatting(stat.value)
                  : stat.value}
              </UiText>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default LastCampaign;
