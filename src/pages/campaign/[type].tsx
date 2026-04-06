import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { MailIcon, MessageSquareTextIcon, SmartphoneIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import type { CampaignFormState, CampaignType } from "@/types/campaign-type";
import FormField from "@/components/ui/input";
import { SelectableCardGroup } from "@/components/ui/selectable-card-group";
import { useCampaignStore } from "@/store/useCampaignStore";

const CreateCampaignByType = () => {
  const { type } = useParams<{ type: CampaignType }>();
  const navigate = useNavigate();
  const { addCampaign, setCurrentCampaignId } = useCampaignStore();

  const initialType: CampaignType =
    type === "sms" || type === "push" ? type : "email";

  const [form, setForm] = useState<CampaignFormState>({
    campaignName: `Email Campaign - ${format(new Date(), "PPpp")}`,
    draftDate: format(new Date(), "yyyy-MM-dd"),
    type: initialType,
    tags: "",
  });

  const [selected, setSelected] = useState<CampaignType>(initialType);

  const handleChannelChange = (value: string) => {
    const channel = value as CampaignType;
    setSelected(channel);
    setForm((prev) => ({ ...prev, type: channel }));
  };

  const handleContinue = () => {
    const newCampaign = {
      id: uuidv4(),
      name: form.campaignName,
      type: form.type,
      status: "Draft",
      lastUpdate: new Date().toISOString(),
      openRate: "100.00%",
      clickRate: "0.00%",
      activeOnSite: 0,
      subtitle:
        form.type === "email"
          ? "Email Blast"
          : form.type === "sms"
          ? "Sent SMS"
          : "Push Alert",
    };

    // Navigate to the new single-page wizard with initial data
    navigate(`/new-campaign?new=true`, {
      state: {
        initialData: {
          title: newCampaign.name,
          type: newCampaign.type,
        },
      },
    });
  };

  return (
    <Box p="6">
      <Text fontSize="2xl" fontWeight="medium" mb={6}>
        Create campaign
      </Text>
      <Stack maxW="lg" spacing={6}>
        <FormField
          label="Campaign name"
          type="campaignname"
          value={form.campaignName}
          onChange={(_, value) =>
            setForm((prev) => ({ ...prev, campaignName: value }))
          }
        />

        <FormField
          label="Draft date"
          type="date"
          value={form.draftDate}
          onChange={(_, value) =>
            setForm((prev) => ({ ...prev, draftDate: value }))
          }
        />

        <SelectableCardGroup
          value={selected}
          onChange={handleChannelChange}
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

        <Flex>
          <Button
            colorScheme="blackAlpha"
            padding="1rem 2rem"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default CreateCampaignByType;
