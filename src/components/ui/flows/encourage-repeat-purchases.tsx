import shopifyIcon from "../../../assets/shopifyicon.svg";
import mailAndSmsIcon from "../../../assets/mailandsmsicon.svg";
import { MailIcon } from "lucide-react";
import EncourageRepeatPurchasesImage from "../../../assets/encourage-repeat-purchases.svg";

import FlowList from "./flow-list";

export const EncourageRepeatPurchasesCards = [
  {
    title: "Customer Winback",
    subtitle: "Standard (Email & SMS)",
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Encourage lapsed customers to come back and see what's new with this Winback Series. Use SMS to reach users who engage with that marketing channel, and email for those who don't.",
  },
  {
    title: "Customer Winback",
    subtitle: "Standard",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Encourage lapsed customers to come back and see what's new with this standard Winback Series.",
  },
  {
    title: "Customer Winback",
    subtitle: "A/B Test Time Delay",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "This Winback series uses a Conditional Split to A/B test two time-points for the first winback email.",
  },
  {
    title: "Post-Purchase Followup",
    subtitle: "Order Count Split",
    icon: MailIcon,
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    description:
      "Tailor post-purchase content based on lifecycle stage! This flow splits out post-purchase paths for first-time buyers, second-time buyers, and then 3+ time buyers.",
  },
  {
    title: "Post-Purchase Bounce Back",
    subtitle: "After First Purchase",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Convert would-be one time buyers into repeat purchasers with a compelling bounce back offer that brings someone back to keep shopping immediately after placing an order.",
  },
];

const EncourageRepeatPurchases = () => {
  return (
    <>
      <FlowList
        heading="Encourage repeat purchases"
        image={EncourageRepeatPurchasesImage}
        caption="After a customer makes a purchase, utilize these flows to retain engagement or win back old customers."
        cards={EncourageRepeatPurchasesCards}
        backButton
      />
    </>
  );
};

export default EncourageRepeatPurchases;
