import { UiText } from "@/components/ui/text";
import { UiTab } from "@/components/ui/tabs";
import { Box } from "@chakra-ui/react";
import EmailPopupConfig from "@/components/ui/popups/email-popup-config";

const Popups = () => {
  return (
    <Box>
      <UiText variant="heading2" mb="6">
        Popups
      </UiText>
      <UiTab
        defaultValue="email-popup"
        tabs={[
          { label: "Email popup", value: "email-popup" },
          { label: "Spin Wheel", value: "spin-wheel" },
        ]}
        tabContent={{
          "email-popup": <EmailPopupConfig />,
          "spin-wheel": (
            <Box p="4">
              <UiText>Spin Wheel configuration coming soon.</UiText>
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default Popups;
