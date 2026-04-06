import shopifyIcon from "../../../assets/shopifyicon.svg";
import mailAndSmsIcon from "../../../assets/mailandsmsicon.svg";
import { MessageSquareTextIcon, MailIcon } from "lucide-react";
import NurtureSubscribers from "../../../assets/nurture-subscribers.svg";
import FlowList from "./flow-list";

export const NurtureSubScribersCards = [
  {
    title: "Happy Birthday",
    subtitle: "Standard (Email & SMS)",
    icon: mailAndSmsIcon,
    badgeTitle: "Date",
    description:
      "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipient's birthday.",
  },
  {
    title: "Welcome Series",
    subtitle: "Unique Discount w/ Reminder",
    badgeIcon: shopifyIcon,
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    description:
      "Welcome new SMS subscribers with a 3-step SMS series that encourages conversion with a unique discount code. Before you take advantage of this Welcome Series Flow, make sure you've set up unique coupon codes or create a static coupon. Learn more.",
  },
  {
    title: "Welcome Series",
    subtitle: "Final SMS Discount",
    badgeIcon: shopifyIcon,
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    description:
      "This welcome series contains a fourth SMS that only sends to subscribers that haven't already converted. To take advantage of this Welcome Series Flow, make sure you've set up unique coupon codes or create a static coupon. Learn m﻿ore.",
  },
  {
    title: "Happy Birthday",
    subtitle: "Standard (SMS Only)",
    icon: MessageSquareTextIcon,
    badgeTitle: "Date",
    description:
      "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers a text on a recipient's birthday.",
  },
  {
    title: "Happy Birthday",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "Date",
    description:
      "Foster a more personal relationship with your customers by being part of their birthday celebration! This flow triggers an email on a recipient's birthday.",
  },
  {
    title: "Countdown to Birthday Series",
    subtitle: "Final Email Conversion Split",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "This flow counts down to a subscriber's birthday and splits out the final Happy Birthday email based on whether or not someone has already converted and bought.",
  },
  {
    title: "Welcome Series",
    subtitle: "Customer v. Non-Customer",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Welcome all new subscribers, but identify those that are truly just beginning their journey with you & may need an incentive to make that first purchase.",
  },
  {
    title: "Welcome Series",
    subtitle: "Customer v. Non-Customer",
    icon: MailIcon,
    badgeTitle: "List",
    description:
      "Welcome all new subscribers, but identify those that are truly just beginning their journey with you & may need an incentive to make that first purchase.",
  },
  {
    title: "Welcome Series",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "List",
    description:
      "Welcome new subscribers with a 3-email series that provides an introduction to your business and encourages conversion.",
  },
  {
    title: "Welcome Series",
    subtitle: "Final Email Discount",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "This Welcome Series has 3 emails that go to all subscribers, with a fourth that only sends to those that haven’t already converted.",
  },
];

const NurtureSubScribers = () => {
  return (
    <>
      <FlowList
        heading="Nurture subscribers"
        image={NurtureSubscribers}
        caption="Build personalized relationships with your customers with these flows tailored for each recipient."
        cards={NurtureSubScribersCards}
        backButton
      />
    </>
  );
};

export default NurtureSubScribers;
