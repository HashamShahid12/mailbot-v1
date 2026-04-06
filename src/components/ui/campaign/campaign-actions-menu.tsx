import { IconButton, Box, Text } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PopoverMenu } from "@/components/ui";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";

import { duplicateCampaign } from "@/api/campaigns";

export const CampaignActionsMenu = ({ campaign }: { campaign: any }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  const onDuplicate = async () => {
    try {
      toaster.create({
        title: "Duplicating campaign...",
        type: "info",
        duration: 2000,
      });
      const res = await duplicateCampaign(campaign.id);
      // The response structure is { data: { campaign: { id: "..." } } }
      const newId = res?.data?.campaign?.id || res?.data?.id;

      if (newId) {
        navigate(
          `/new-campaign?duplicatedCampaignId=${newId}&fromBackend=true`,
        );
      } else {
        console.error("Duplicate response missing ID:", res);
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Failed to duplicate campaign:", error);
      toaster.create({
        title: "Failed to duplicate campaign",
        type: "error",
      });
    }
  };

  const getMenuItems = () => {
    const status = campaign.status?.toLowerCase();
    switch (status) {
      case "draft":
        return [
          {
            label: "Edit",
            onClick: () => navigate(`/new-campaign?id=${campaign.id}`),
          },
          { label: "Delete", onClick: () => {} },
        ];
      case "active":
      case "completed":
        return [
          { label: "Details", onClick: () => {} },
          {
            label: "Duplicate",
            onClick: onDuplicate,
          },
        ];
      case "scheduled":
        return [
          {
            label: "Edit",
            onClick: () => navigate(`/new-campaign?id=${campaign.id}`),
          },
          {
            label: "Duplicate",
            onClick: onDuplicate,
          },
        ];
      default:
        // Default actions if status doesn't match known ones
        return [
          { label: "Clone", onClick: () => {} },
          {
            label: "Copy campaign ID",
            onClick: () => {
              navigator.clipboard.writeText(campaign.id);
              toaster.create({
                title: "Campaign ID copied to clipboard",
                type: "success",
                duration: 3000,
                meta: { closable: true },
              });
            },
          },
          { label: "Edit details", onClick: () => {} },
          { label: "Move to archive", onClick: () => {} },
          { label: "View campaign", onClick: () => {} },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      <PopoverMenu
        placement="bottom-end"
        isOpen={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        contentProps={{ minW: "180px", padding: "2" }}
        trigger={
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="More options"
            _hover={{ bg: "gray.300" }}
          >
            <BsThreeDotsVertical />
          </IconButton>
        }
      >
        <Box>
          {menuItems.map((item, index) => (
            <Text
              key={index}
              py="2"
              px="3"
              cursor="pointer"
              onClick={() => {
                setIsPopoverOpen(false);
                item.onClick();
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              bg={hoveredIndex === index ? "gray.200" : "transparent"}
              _hover={{ bg: "gray.200" }}
            >
              {item.label}
            </Text>
          ))}
        </Box>
      </PopoverMenu>
    </>
  );
};
