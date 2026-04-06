export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  estimatedTime?: string;
  skippable?: boolean;
  cta?: string;
  link?: string;
  redirectTo?: string;
}

export interface OnboardingSection {
  id: string;
  title: string;
  path: string;
  steps: OnboardingStep[];
}

export const onboardingFlow: OnboardingSection[] = [
  {
    id: "setup",
    title: "Set up your account",
    path: "setup-your-account",
    steps: [
      {
        id: "connect",
        title: "Connect to WooCommerce",
        estimatedTime: "About 10 minutes",
        description:
          "Sync your historical data from WooCommerce and start collecting real-time information about customers.",
        link: "How to integrate with WooCommerce",
        cta: "Connect",
        skippable: true,
        redirectTo: "/integration/woocommerce"
      },
      {
        id: "tracking",
        title: "Turn on website tracking",
        description:
          "Use tracking to gather customer data, publish a sign-up form, and identify cookied customers...",
        estimatedTime: "About 3 minutes",
        cta: "Turn on",
        link: "https://example.com/tracking-guide",
        skippable: true,
      },
      {
        id: "import",
        title: "Import your contacts",
        description:
          "Import existing contacts from your current tools and start to organize, track, and manage your lists.",
        estimatedTime: "About 10 minutes",
        cta: "Turn on",
        skippable: true,
      },
      {
        id: "brand",
        title: "Build your brand library",
        estimatedTime: "About 2 minutes",
        cta: "Build brand library",
        skippable: true,
      },
      // {
      //   id: "invite",
      //   title: "Invite your team",
      // },
    ],
  },
  {
    id: "sms",
    title: "Begin with SMS",
    path: "begin-with-sms",
    steps: [
      {
        id: "verify",
        title: "Set up your SMS sending number",
        description:
          "Get a complimentary number to engage your subscribers via SMS.",
        link: "Get started with SMS and MMS",
        estimatedTime: "About 2 minutes",
        cta: "Get started",
        skippable: true,
      },
      {
        id: "disclosures",
        title: "Add required SMS disclosures",
        description:
          "We'll help you create disclosure language, a privacy policy, and mobile terms of service to stay compliant with SMS-related laws.",
        link: "Get started with SMS and MMS",
        estimatedTime: "About 5 minutes",
        cta: "Set up disclosures",
        skippable: true,
      },
    ],
  },
  {
    id: "audience",
    title: "Grow your audience",
    path: "grow-your-audience",
    steps: [
      {
        id: "signupform",
        title: "Create a sign-up form",
        description:
          "Create and publish a sign-up form on your website to grow your list of subscribers and build long-lasting customer relationships.",
        cta: "Create",
        estimatedTime: "About 5 minutes",
        skippable: true,
      },
      {
        id: "email-welcome-flow",
        title: "Create an email welcome flow",
        description:
          "Set up a series of messages to welcome and introduce new email subscribers to your brand.",
        link: "Guide to creating an email welcome flow",
        cta: "Create",
        estimatedTime: "About 5 minutes",
        skippable: true,
      },
      {
        id: "sms-welcome-flow",
        title: "Create an SMS welcome flow",
        description:
          "Set up a series of messages to welcome new SMS subscribers while their interest in your business is at its peak.",
        link: "Guide to creating an email welcome flow",
        cta: "Create",
        estimatedTime: "About 5 minutes",
        skippable: true,
      },
    ],
  },
  {
    id: "recover",
    title: "Recover lost sales",
    path: "recover-lost-sales",
    steps: [
      {
        id: "abandoned-cart-flow",
        title: "Create an abandoned cart flow",
        description:
          "Set up automated messages to send when your customer leaves their cart without purchasing.",
        link: "Guide to creating an abandoned cart flow",
        cta: "Create",
        estimatedTime: "About 5 minutes",
        skippable: true,
      },
      {
        id: "abandoned-browse-flow",
        title: "Create a browse abandonment flow",
        description:
          "Set up automated messages to remind your customers of the items they viewed but did not purchase.",
        link: "Guide to creating an abandoned cart flow",
        cta: "Create",
        estimatedTime: "About 5 minutes",
        skippable: true,
      },
    ],
  },
];
