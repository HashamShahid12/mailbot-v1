import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { UiText } from "../../text";
import { IoClose } from "react-icons/io5";
import Benchmarks from "../../../../assets/benchmarks.svg";
import UiTextLink from "../../text-link";
import { useState } from "react";
import { StatusDropdown } from "../../dropdown/status-dropdown";
import UiLink from "../../link";
import { AiFillQuestionCircle } from "react-icons/ai";
import { Tooltip } from "../../tooltip";
import Empty from "../../../../assets/emptytable.svg";
import UiBox from "../../box";

const OverviewBenchmarks = () => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();
  return (
    <>
      <Box px="14" py="7">
        <Flex
          borderRadius="md"
          border="sm"
          borderColor="gray.300"
          overflow="hidden"
          mb="10"
        >
          <Box minW="200px" bg="gray.600">
            <Image
              src={Benchmarks}
              objectFit="cover"
              w="full"
              h="full"
              alt="benchmarks-image"
            />
          </Box>
          <Flex
            py="3"
            px="5"
            direction="column"
            bg="white"
            justify="space-between"
            w="full"
          >
            <Flex minH="7xs" justify="space-between">
              <Box>
                <UiText fontWeight="semibold" py="2">
                  Welcome To Benchmarks!
                </UiText>
                <UiText>
                  Benchmarks provide a point of reference that you can use to
                  compare your business to others like it. At Mailbot, we
                  benchmark your business against an identified{" "}
                  <UiTextLink value="peer group" href="#" /> as well as your
                  industry. By viewing data on your email marketing and business
                  performance in context, you can better plan and prioritize
                  your efforts to grow your business.
                </UiText>
              </Box>
              <Icon
                as={IoClose}
                cursor="button"
                mt="1"
                _hover={{ bg: "gray.300" }}
                boxSize="10"
                p="1"
                borderRadius="md"
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex justify="space-between">
          <StatusDropdown
            borderStyle="solid"
            selected={statusFilter}
            buttonWidth="2xs"
            onChange={setStatusFilter}
            label="Last Month"
          />
          <Flex align="center" gap="2">
            <UiText color="gray.400">
              Benchmarks Last Updated: {currentMonth} {currentYear}{" "}
              <Tooltip
                showArrow
                content={
                  <UiText color="white">
                    Benchmarks update on the 10th day of each month.
                  </UiText>
                }
                contentProps={{
                  borderRadius: "md",
                  px: "1",
                  py: "2",
                  textAlign: "center",
                  lineHeight: "1.5rem",
                }}
              >
                <Icon as={AiFillQuestionCircle} boxSize="4" mb="1" />
              </Tooltip>
            </UiText>
            <UiLink fontWeight="semibold">Export</UiLink>
          </Flex>
        </Flex>
        <UiBox mt="5">
          <UiText variant="subheading" fontWeight="semibold">
            Benchmark data
          </UiText>
          <Box p="1rem 2rem" textAlign="center">
            <Image src={Empty} w="xs" m="auto" alt="Empty" />
            <UiText variant="subheading" fontWeight="semibold">
              Send more messages to access benchmark data
            </UiText>
            <UiText m="auto" mb="5" maxW="2xl">
              To access email and SMS benchmarks, your account must have sent at
              least 25 emails and 25 SMS messages, respectively, over the past 6
              months. If you reach either threshold within this month, your
              benchmarks will be available next month.
            </UiText>
            <UiText>
              In the meantime,{" "}
              <UiTextLink value="specify your industry" href="#" /> to access
              industry-level benchmarks.
            </UiText>
          </Box>
        </UiBox>
      </Box>
    </>
  );
};

export default OverviewBenchmarks;
