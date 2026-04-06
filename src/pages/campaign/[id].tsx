import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

const CampaignView = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box p="6">
      <Text fontSize="2xl" fontWeight="bold">Campaign Details</Text>
      <Text mt="2">Viewing campaign ID: {id}</Text>
    </Box>
  );
};

export default CampaignView;
