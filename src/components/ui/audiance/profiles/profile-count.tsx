import { useState, useEffect } from "react";
import { UiText } from "../../text";
import UiBox from "../../box";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import { IoMdInformationCircle } from "react-icons/io";
import type { ProfileCounts } from "@/types/user-type";
import { getSubscribers } from "@/api/subscribers";
import SkeletonLoader from "../../skeletons";

const ProfileCount = () => {
  const [item, setItem] = useState<ProfileCounts | null>(null);
  useEffect(() => {
    getSubscribers().then((res) => {
      if (res.success && res.data) {
        setItem({
          allprofiles: res.data.totalCount,
          activeprofiles: res.data.totalCount, // Assuming all are active for now
          suppressesprofiles: 0, // No data for suppressed
        });
      }
    });
  }, []);
  return (
    <>
      <UiBox m="7">
        <UiText variant="subheading">Profile counts</UiText>
        <Grid templateColumns="repeat(4, 1fr)" mt="5" gap="6">
          <GridItem colSpan={1} mr="5" borderRight="sm" borderColor="gray.300">
            <UiText variant="body" fontWeight="semibold">
              Total Profiles
            </UiText>
            <SkeletonLoader
              showAvatar={false}
              boxHeight={0}
              lineCount={1}
              w="7xs"
              h="9xs"
            >
              <UiText variant="heading2">{item?.allprofiles}</UiText>
            </SkeletonLoader>
            <Flex gap="2">
              <UiText variant="caption">All profiles</UiText>
              <IoMdInformationCircle />
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <UiText variant="body" fontWeight="semibold">
              Email profile counts
            </UiText>
            <SkeletonLoader
              showAvatar={false}
              boxHeight={0}
              lineCount={1}
              w="7xs"
              h="9xs"
            >
              <UiText variant="heading2">{item?.activeprofiles}</UiText>
            </SkeletonLoader>
            <Flex gap="2">
              <UiText variant="caption">Active profiles</UiText>
              <IoMdInformationCircle />
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <br />
            <SkeletonLoader
              showAvatar={false}
              boxHeight={0}
              lineCount={1}
              w="7xs"
              h="9xs"
            >
              <UiText variant="heading2">{item?.suppressesprofiles}</UiText>
            </SkeletonLoader>
            <Flex gap="2">
              <UiText variant="caption">Suppressed profiles</UiText>
              <IoMdInformationCircle />
            </Flex>
          </GridItem>
        </Grid>
      </UiBox>
    </>
  );
};

export default ProfileCount;
