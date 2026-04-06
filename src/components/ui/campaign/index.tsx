import { useState } from "react";
import { Box, Button, Stack } from "@chakra-ui/react";
import {
  MailIcon,
  MessageSquareTextIcon,
  SmartphoneIcon,
  CalendarIcon,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import type { CampaignFormState, CampaignType } from "@/types/campaign-type";
import { DrawerWrapper } from "../drawer";
import FormField from "../input";
import { useNavigate } from "react-router-dom";
import { SelectableCardGroup } from "../selectable-card-group";
import { useCampaignStore } from "@/store/useCampaignStore";
import DateTimeInput from "../date-time-input";
import { UiSelect } from "../select";
import { UiText } from "../text";

export const CampaignDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [form, setForm] = useState<CampaignFormState>({
    title: `Email Campaign - ${format(new Date(), "PPpp")}`,
    sendingOption: "now",
    scheduledDate: "",
    type: "email",
    tags: "",
  });
  const navigate = useNavigate();
  const [selected, setSelected] = useState("email");

  return (
    <DrawerWrapper
      open={open}
      onOpenChange={onClose}
      title="Create campaign"
      footer={
        <Button
          colorScheme="blackAlpha"
          padding="1rem 2rem"
          onClick={() => {
            const newCampaign = {
              title: form.title,
              sendingOption: form.sendingOption,
              scheduledDate: form.scheduledDate,
            };

            // addCampaign(newCampaign);
            // setCurrentCampaignId(newCampaign.id);
            // setCampaignForm({ title: form.title }); // Initialize form title

            navigate(`/new-campaign?new=true`, {
              state: {
                initialData: newCampaign,
              },
            });
            onClose();
          }}
        >
          Continue
        </Button>
      }
    >
      <Stack gap={4} padding="2rem">
        <FormField
          label="Campaign name"
          type="title"
          value={form.title}
          onChange={(_, value) =>
            setForm((prev) => ({ ...prev, title: value }))
          }
        />

        <SelectableCardGroup
          value={selected}
          onChange={setSelected}
          options={[
            {
              value: "email",
              icon: MailIcon,
              label: "Email",
              description: "Send a targeted email message.",
            },
            {
              value: "sms",
              icon: MessageSquareTextIcon,
              label: "Set up SMS",
              description:
                "Start sending SMS messages in minutes. Your account will be assigned a free number and you'll be ready to send instantly.",
              link: {
                href: "#",
                text: "Getting started with SMS.",
              },
            },
            {
              value: "push",
              icon: SmartphoneIcon,
              label: "Push",
              description: "Send a message on your mobile app.",
              link: {
                href: "#",
                text: "Learn more about push notifications.",
              },
            },
          ]}
        />
        <Stack gap={2}>
          <Box>
            <UiText mb={0} fontWeight="medium">
              Sending:
            </UiText>
            <UiSelect
              label="Sending"
              selectedItem={form.sendingOption}
              width="100%"
              onChange={(val) => {
                setForm((prev) => ({ ...prev, sendingOption: val }));
              }}
              items={[
                {
                  label: "Now",
                  value: "now",
                },
                {
                  label: "Schedule",
                  value: "scheduled",
                },
              ]}
            />
          </Box>
          {form.sendingOption === "scheduled" && (
            <DateTimeInput
              dateLabel="Schedule Date"
              timeLabel="Schedule Time"
              value={form.scheduledDate}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, scheduledDate: value }))
              }
            />
          )}
        </Stack>
      </Stack>
    </DrawerWrapper>
  );
};
