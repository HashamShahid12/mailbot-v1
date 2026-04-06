import { Box } from "@chakra-ui/react";
import { useState } from "react";
import AudianceFormTeaser from "./dashboard-onboarding-steps/create-sign-up-form/audiance-form-teaser";
import AudianceFormCouponOffer from "./dashboard-onboarding-steps/create-sign-up-form/audiance-form-coupon-offer";
import AudianceFormLayout from "./dashboard-onboarding-steps/create-sign-up-form/audiance-form-layout";
import type { OnboardingStep } from "@/onboarding/OnboardingFlow";
import { SmsCompanyInfoForm } from "./dashboard-onboarding-steps/sms-sending-number/SmsCompanyInfo";
import { SetUpSmsStep } from "./dashboard-onboarding-steps/sms-sending-number/SmsCountries";
import { DisclosuresOverview } from "./dashboard-onboarding-steps/disclosures/DisclosuresOverview";
import { DisclosuresCompanyInfo } from "./dashboard-onboarding-steps/disclosures/DisclosuresCompanyInfo";
import { DisclosuresPrivacyPolicy } from "./dashboard-onboarding-steps/disclosures/DisclosuresPrivacyPolicy";
import { DisclosuresPrivacyPolicyUpdate } from "./dashboard-onboarding-steps/disclosures/DisclosuresPrivacyPolicyUpdate";
import { DisclosuresTermsOfServiceOption } from "./dashboard-onboarding-steps/disclosures/DisclosuresTermsOfServiceOption ";
import { DisclosuresTermsOfServiceHosting } from "./dashboard-onboarding-steps/disclosures/DisclosuresTermsOfServiceHosting";
import { TrackingInitial } from "./dashboard-onboarding-steps/tracking/TrackingInitial";
import { TrackingConfirm } from "./dashboard-onboarding-steps/tracking/TrackingConfirm";
import { ImportInitial } from "./dashboard-onboarding-steps/import/ImportInitial";
import { ImportContactProfile } from "./dashboard-onboarding-steps/import/ImportContactProfile";
import { ImportUpload } from "./dashboard-onboarding-steps/import/ImportUpload";
import AudianceFormVisitors from "./dashboard-onboarding-steps/create-sign-up-form/audiance-form-visitors";
import AudianceFormShowWebsite from "./dashboard-onboarding-steps/create-sign-up-form/audiance-form-show-website";

interface Props {
  activeStep: OnboardingStep | null;
  drawerPhaseIndex: number;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

export const OnboardingDrawerContent = ({
  activeStep,
  drawerPhaseIndex,
  selectedOption,
  setSelectedOption,
}: Props) => {
  if (!activeStep) return null;
  const [selectedList, setSelectedList] = useState<string | undefined>();
  const [selectedOptions, setSelectedOptions] = useState({
    showWeb: "popup",
    formTeaser: "includeteaser",
    formCoupon: "offer",
    formLayout: "left",
  });

  const handlefunc = (name: string, value: string) => {
    setSelectedOptions((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // console.log(activeStep?.id);

  const listItems = [
    { value: "list1", label: "Newsletter" },
    { value: "list2", label: "VIP Customers" },
    { value: "list3", label: "Webinar Signups" },
  ];

  const stepPhasesById: Record<
    string,
    { id: string; content: React.ReactNode }[]
  > = {
    tracking: [
      {
        id: "initial",
        content: (
          <TrackingInitial
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ),
      },
      {
        id: "confirm",
        content: <TrackingConfirm />,
      },
    ],

    import: [
      {
        id: "initial",
        content: (
          <ImportInitial
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ),
      },
      {
        id: "contact-profile",
        content: <ImportContactProfile />,
      },
      {
        id: "upload",
        content: <ImportUpload />,
      },
    ],
    verify: [
      {
        id: "set-up-sms",
        content: <SetUpSmsStep />,
      },
      {
        id: "sms-form",
        content: <SmsCompanyInfoForm />,
      },
    ],
    signupform: [
      {
        id: "visitors",
        content: <AudianceFormVisitors />,
      },
      {
        id: "formshowwebsite",
        content: (
          <AudianceFormShowWebsite
            selectedOption={selectedOptions.showWeb}
            setSelectedOption={(val) => {
              handlefunc("showWeb", val);
            }}
          />
        ),
      },
      {
        id: "formteaser",
        content: (
          <AudianceFormTeaser
            selectedOption={selectedOptions.formTeaser}
            setSelectedOption={(val) => {
              handlefunc("formTeaser", val);
            }}
          />
        ),
      },
      {
        id: "formcoupon",
        content: (
          <AudianceFormCouponOffer
            selectedOption={selectedOptions.formCoupon}
            setSelectedOption={(val) => {
              handlefunc("formCoupon", val);
            }}
          />
        ),
      },
      {
        id: "formlayout",
        content: (
          <AudianceFormLayout
            selectedOption={selectedOptions.formLayout}
            setSelectedOption={(val) => {
              handlefunc("formLayout", val);
            }}
          />
        ),
      },
    ],
    disclosures: [
      {
        id: "disclosure-overview",
        content: <DisclosuresOverview />,
      },
      {
        id: "company-info",
        content: <DisclosuresCompanyInfo />,
      },
      {
        id: "privacy-policy",
        content: <DisclosuresPrivacyPolicy />,
      },
      {
        id: "privacy-policy-update",
        content: <DisclosuresPrivacyPolicyUpdate />,
      },
      {
        id: "tos-option",
        content: <DisclosuresTermsOfServiceOption />,
      },
      {
        id: "tos-hosting",
        content: <DisclosuresTermsOfServiceHosting />,
      },
    ],
  };

  const phases = stepPhasesById[activeStep.id] ?? [];
  const currentPhase = phases[drawerPhaseIndex];

  return (
    <Box w="40rem" margin="0 auto">
      {currentPhase?.content}
    </Box>
  );
};
