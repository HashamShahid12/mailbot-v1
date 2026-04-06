import UiBox from "@/components/ui/box";
import { UiText } from "@/components/ui/text";
import { Box } from "@chakra-ui/react";
import { TiClipboard } from "react-icons/ti";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { CiMobile2 } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineCursorArrowRays } from "react-icons/hi2";
import { NewDropDown } from "@/components/ui/dropdown/new-dropdown";

const GrowthTools = () => {
  return (
    <>
      <UiText
        variant="heading2"
        p="5"
        bg="white"
        border="sm"
        borderColor="gray.600"
      >
        List growth tools
      </UiText>
      <Box px="3" py="7" maxW="4xl" m="auto">
        <Box mb="10">
          <UiText variant="subheading" mb="3">
            Collect subscribers with web experiences
          </UiText>
          <UiBox
            mb="3"
            heading="Create your first sign-up form"
            description="Gather information about your users, serve them offers, and show personalized content."
            icon={TiClipboard}
            linklabel="Create"
            showLayout={true}
            link="#"
          />
          <UiBox
            heading=" Customize subscribe and preference pages"
            description="Collect new subscribers for specific lists or manage global subscribe and preference pages."
            icon={HiOutlineComputerDesktop}
            showLayout={true}
            linklabel={
              <NewDropDown
                buttonTitle="Customize"
                icon
                links={[
                  {
                    title: "For a specific list",
                    href: "#",
                  },
                  {
                    title: "Account default pages",
                    href: "#",
                  },
                ]}
              />
            }
          />
        </Box>

        <Box mb="10">
          <UiText variant="subheading" mb="3">
            Build experiences for your mobile audience
          </UiText>
          <UiBox
            heading="Set up Mailbot SMS"
            description="Select a plan to start using Mailbot SMS to grow an engaged
                    mobile audience."
            icon={CiMobile2}
            linklabel="Setup"
            showLayout={true}
            link="#"
          />
        </Box>

        <Box>
          <UiText variant="subheading" mb="3">
            Integrate with third-party tools
          </UiText>
          <UiBox
            mb="3"
            heading="Connect Mailbot to your e-commerce platform"
            description="Gather additional information about your visitors with an e-commerce integration."
            icon={IoCartOutline}
            linklabel="Connect"
            showLayout={true}
            link="#"
          />
          <UiBox
            heading="Integrate with Meta Ads"
            description="Seamlessly connect subscribers and add them to Mailbot through Meta lead ads."
            icon={HiOutlineCursorArrowRays}
            linklabel="Integrate"
            showLayout={true}
            link="#"
          />
        </Box>
      </Box>
    </>
  );
};

export default GrowthTools;
