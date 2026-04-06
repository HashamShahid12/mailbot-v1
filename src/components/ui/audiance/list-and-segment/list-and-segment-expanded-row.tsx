import type React from "react";
import { Table, Box, Badge, List } from "@chakra-ui/react";
import type { SegmentExpandedRowProps } from "@/types/list-and-segment-expanded-row-props";
export const ListAndSegmentExpandedRow: React.FC<SegmentExpandedRowProps> = ({
  colSpan,
  listandsegment,
}) => {
  const days = listandsegment?.listandsegmentname;
  const isNumber = !isNaN(Number(days));
  const divideDays = Number(days) / 2;
  return (
    <>
      {isNumber ? (
        <Table.Row>
          <Table.Cell colSpan={colSpan}>
            <Box
              py="6"
              px="20"
              bg="white"
              color="black"
              _hover={{ bg: "gray.200" }}
            >
              <List.Root>
                <List.Item>Person is in WM9Ecj</List.Item>
                <Badge bg="gray.600" px="2" my="2" maxW="fit" borderRadius="xl">
                  AND
                </Badge>
                <List.Item>
                  Person has TsbEdx at least once in the last {days} days
                </List.Item>
                <Badge bg="gray.600" px="2" my="2" maxW="fit" borderRadius="xl">
                  OR
                </Badge>
                <List.Item>
                  Person has VeBxJ2 at least once in the last {days} days
                </List.Item>
                <Badge bg="gray.600" px="2" my="2" maxW="fit" borderRadius="xl">
                  OR
                </Badge>
                <List.Item>
                  Person is in WM9Ecj <br /> and was added in the last{" "}
                  {divideDays} days
                </List.Item>
              </List.Root>
            </Box>
          </Table.Cell>
        </Table.Row>
      ) : (
        <Table.Row>
          <Table.Cell colSpan={colSpan}>
            <Box
              py="6"
              px="20"
              bg="white"
              color="black"
              _hover={{ bg: "gray.200" }}
            >
              <List.Root>
                <List.Item>
                  Person is in Email List <br /> and was added in last 14 days
                </List.Item>
                <Badge bg="gray.600" px="2" my="2" maxW="fit" borderRadius="xl">
                  AND
                </Badge>
                <List.Item>Person can receive email marketing</List.Item>
              </List.Root>
            </Box>
          </Table.Cell>
        </Table.Row>
      )}
    </>
  );
};
