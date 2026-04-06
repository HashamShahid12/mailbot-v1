import {
  // Box,
  Image,
  Text,
  Badge,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
// import { useState } from "react";

export const templates = [
  {
    id: 1,
    title: "First Stay Discount - Hotel",
    label: "Popup",
    imageUrl: "/images/template-image-1.png",
  },
  {
    id: 2,
    title: "Free Gift - Restaurant",
    label: "Popup",
    imageUrl: "/images/template-image-2.png",
  },
  {
    id: 3,
    title: "New Class Discount - Gym",
    label: "Popup",
    imageUrl: "/images/template-image-3.png",
  },
  {
    id: 4,
    title: "New Class Discount - Gym",
    label: "Popup",
    imageUrl: "/images/template-image-4.png",
  },
  {
    id: 5,
    title: "New Class Discount - Gym",
    label: "Popup",
    imageUrl: "/images/template-image-5.png",
  },
  {
    id: 6,
    title: "New Class Discount - Gym",
    label: "Popup",
    imageUrl: "/images/template-image-6.png",
  },
  {
    id: 7,
    title: "New Class Discount - Gym",
    label: "Popup",
    imageUrl: "/images/template-image-7.png",
  },
  {
    id: 8,
    title: "New Class Discount - Gym",
    label: "Popup",
    imageUrl: "/images/template-image-8.png",
  },
];

interface Props {
  onSelect: (templateId: number) => void;
  selectedId: number | null;
}

export const FormTemplatesGrid = ({ onSelect, selectedId }: Props) => {
  return (
    <Grid
      mt="1.5rem"
      templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      gap={6}
    >
      {templates.map((template) => {
        const isSelected = selectedId === template.id;

        return (
          <GridItem
            key={template.id}
            border="1px solid"
            borderColor={isSelected ? "blue.500" : "gray.200"}
            borderRadius="md"
            overflow="hidden"
            bg="white"
            cursor="pointer"
            _hover={{ borderColor: "blue.200" }}
            transition="border-color 0.2s"
            onClick={() => onSelect(template.id)}
          >
            <Image src={template.imageUrl} alt={template.title} w="100%" />
            <Flex p={3} gap="3" alignItems="center">
              <Text fontWeight="medium">{template.title}</Text>
              <Badge colorScheme="gray">{template.label}</Badge>
            </Flex>
          </GridItem>
        );
      })}
    </Grid>
  );
};
