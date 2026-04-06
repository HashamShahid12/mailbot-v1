import shopifyIcon from "../../../assets/shopifyicon.svg";
import mailAndSmsIcon from "../../../assets/mailandsmsicon.svg";
const mailBotIcon = "/mailbotfavicon.png";
import { MessageSquareTextIcon, MailIcon } from "lucide-react";
import FlowList from "./flow-list";

export const OtherCategoryCards = [
  {
    title: "Product Review / Cross-Sell",
    subtitle: "Standard (Email & SMS)",
    icon: mailAndSmsIcon,
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    description:
      "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipient's birthday.",
  },
  {
    title: "Replenishment Reminder",
    subtitle: "Standard (Email & SMS)",
    badgeIcon: shopifyIcon,
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    description:
      "Welcome new SMS subscribers with a 3-step SMS series that encourages conversion with a unique discount code. Before you take advantage of this Welcome Series Flow, make sure you've set up unique coupon codes or create a static coupon. Learn more.",
  },
  {
    title: "Repeat Purchase Nurture Series",
    subtitle: "Order Count Split (Email & SMS)",
    badgeIcon: shopifyIcon,
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    description:
      "This welcome series contains a fourth SMS that only sends to subscribers that haven't already converted. To take advantage of this Welcome Series Flow, make sure you've set up unique coupon codes or create a static coupon. Learn m﻿ore.",
  },
  {
    title: "Review request (email + SMS)",
    subtitle: "Mailbot Reviews",
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers a text on a recipient's birthday.",
  },
  {
    title: "Tag SMS Subscriber Date",
    subtitle: "Enrich Contact Profiles",
    icon: MessageSquareTextIcon,
    badgeTitle: "Mailbot",
    badgeIcon: mailBotIcon,
    description:
      "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipient's birthday.",
  },
  {
    title: "VIP BFCM Sale Series",
    subtitle: "BFCM Special (SMS Only)",
    icon: MessageSquareTextIcon,
    badgeTitle: "List",
    description:
      "This flow counts down to a subscriber's birthday and splits out the final Happy Birthday email based on whether or not someone has already converted and bought.",
  },
  {
    title: "Attempt to Opt-Out Auto Response",
    subtitle: "Ask to Unsubscribe Detection",
    badgeIcon: mailBotIcon,
    icon: MessageSquareTextIcon,
    badgeTitle: "Mailbot",
    description:
      "Welcome all new subscribers, but identify those that are truly just beginning their journey with you & may need an incentive to make that first purchase.",
  },
  {
    title: "Product Review / Cross-Sell",
    subtitle: "Standard",
    icon: MailIcon,
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    description:
      "Welcome all new subscribers, but identify those that are truly just beginning their journey with you & may need an incentive to make that first purchase.",
  },
  {
    title: "Replenishment Reminder",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Welcome new subscribers with a 3-email series that provides an introduction to your business and encourages conversion.",
  },
  {
    title: "Tag First Purchase Date",
    subtitle: "Enrich Contact Profiles",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "This Welcome Series has 3 emails that go to all subscribers, with a fourth that only sends to those that haven’t already converted.",
  },
  {
    title: "Tag Product Category Interest",
    subtitle: "Enrich Contact Profiles",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "This Welcome Series has 3 emails that go to all subscribers, with a fourth that only sends to those that haven’t already converted.",
  },
  {
    title: "Tag VIP Customers",
    subtitle: "Enrich Contact Profiles",
    icon: MailIcon,
    badgeTitle: "List",
    description:
      "This Welcome Series has 3 emails that go to all subscribers, with a fourth that only sends to those that haven’t already converted.",
  },
  {
    title: "Sunset Unengaged Subscribers",
    subtitle: "Customer vs. Non-Customer",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "This Welcome Series has 3 emails that go to all subscribers, with a fourth that only sends to those that haven’t already converted.",
  },
  {
    title: "Sunset Unengaged Subscribers",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "List",
    description:
      "This Welcome Series has 3 emails that go to all subscribers, with a fourth that only sends to those that haven’t already converted.",
  },
  {
    title: "Repeat Purchase Nurture Series",
    subtitle: "Order Count Split",
    icon: MailIcon,
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    description:
      "This Welcome Series has 3 emails that go to all subscribers, with a fourth that only sends to those that haven’t already converted.",
  },
  {
    title: "Review follow-up",
    subtitle: "Mailbot Reviews",
    icon: MailIcon,
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    description:
      "This Welcome Series has 3 emails that go to all subscribers, with a fourth that only sends to those that haven’t already converted.",
  },
  {
    title: "Review follow-up (with discount)",
    subtitle: "Mailbot Reviews",
    icon: MailIcon,
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    description:
      "This Welcome Series has 3 emails that go to all subscribers, with a fourth that only sends to those that haven’t already converted.",
  },
  {
    title: "Review follow-up (email)",
    subtitle: "Mailbot Reviews",
    icon: MailIcon,
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    description:
      "This Welcome Series has 3 emails that go to all subscribers, with a fourth that only sends to those that haven’t already converted.",
  },
];

const OtherCategory = () => {
  return (
    <>
      <FlowList heading="Other" cards={OtherCategoryCards} />
    </>
  );
};

export default OtherCategory;
