import { Flex } from "@chakra-ui/react";
import { UiText } from "../../text";
import UiLink from "../../link";
import UiButton from "../../button";
import { useNavigate } from "react-router-dom";
import { useShop } from "@/store/shop-store";
import { syncCustomerTags } from "@/api/shop";
import { toaster } from "@/components/ui/toaster";

const ListAndSegmentHeader = () => {
  const { shop, setShop } = useShop();
  const navigate = useNavigate();

  const handleSyncTags = async () => {
    try {
      toaster.create({
        title: "Syncing",
        description: "Syncing customer tags...",
        type: "info",
      });
      const response = await syncCustomerTags();
      if (response.success && response.data) {
        setShop(response.data);
        toaster.create({
          title: "Success",
          description: "Customer tags synced successfully",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Failed to sync customer tags:", error);
      toaster.create({
        title: "Error",
        description: "Failed to sync customer tags",
        type: "error",
      });
    }
  };

  return (
    <>
      <Flex
        px="5"
        py="3"
        bg="white"
        borderY="sm"
        justify="space-between"
        align="center"
        borderColor="gray.600"
        _dark={{ bg: "gray.900" }}
      >
        <UiText variant="heading2">Lists & Segments</UiText>
        <Flex gap="2">
          {shop?.customer_synched_status === "COMPLETED" && (
            <UiLink onClick={handleSyncTags}>Sync Customer Tags</UiLink>
          )}

          <UiButton
            uiVariant="solid"
            onClick={() => navigate("/segmentation-edit-definition")}
          >
            Create
          </UiButton>
        </Flex>
      </Flex>
    </>
  );
};

export default ListAndSegmentHeader;
