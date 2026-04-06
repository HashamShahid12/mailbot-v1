import shopifyIcon from "../../../assets/shopifyicon.svg";
import mailAndSmsIcon from "../../../assets/mailandsmsicon.svg";
import { MessageSquareTextIcon, MailIcon } from "lucide-react";
import ReminderPeoplePurchaseImage from "../../../assets/reminder-customer-purchase.svg";
import FlowList from "./flow-list";

export const ReminderPeoplePurchaseCards = [
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
    title: "Price Drop Notification",
    subtitle: "Standard (Email & SMS)",
    badgeIcon: shopifyIcon,
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    description:
      "Convert interest into sales by letting your customers know with a text or an email when a product they viewed or started checkout with drops in price.",
  },
  {
    title: "Price Drop Notification",
    subtitle: "Standard (SMS Only)",
    badgeIcon: shopifyIcon,
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    description:
      "Convert interest into sales by sending your customers a text when a product they viewed or started checkout with drops in price.",
  },
  {
    title: "Back In Stock Flow",
    subtitle: "VIP vs. Non-VIP",
    icon: MailIcon,
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    description:
      "Give VIPs advanced notice when items they're interested in get restocked! This flow is part of Mailbot end-to-end Back in Stock solution.",
  },
  {
    title: "Customer Winback",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Encourage lapsed customers to come back and see what's new with this standard Winback Series.",
  },
  {
    title: "Back In Stock Flow",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Don't leave money on the table! Automatically alert customers when items they're interested in get restocked. This flow is part of Mailbot end-to-end Back in Stock solution.",
  },
  {
    title: "Customer Winback",
    subtitle: "A/B Test Time Delay",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "This Winback series uses a Conditional Split to A/B test two time-points for the first winback email.",
  },
  {
    title: "Price Drop Notification",
    subtitle: "Standard (Email Only)",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Convert interest into sales by letting your customers know when a product they viewed or started checkout with drops in price.",
  },
  {
    title: "Out of stock",
    subtitle: "Send Reminders for Out of stock Products",
    icon: MailIcon,
    badgeTitle: "List",
    description:
      "Send reminders to customers for products that are currently out of stock after they sign up",
  },
  {
    title: "Abandoned Search Flow",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Did you see something you liked? Convert curiosity into cash with this basic Search Abandonment series.",
  },
  {
    title: "Abandoned Collection Flow",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Did you see something you liked? Convert curiosity into cash with this basic Collection Abandonment series.",
  },
];

const ReminderPeoplePurchase = () => {
  return (
    <>
      <FlowList
        heading="Remind customers to purchase"
        image={ReminderPeoplePurchaseImage}
        caption="Send personalized reminders to customers prompting them to return and purchase specific products."
        cards={ReminderPeoplePurchaseCards}
        backButton
      />
    </>
  );
};

export default ReminderPeoplePurchase;
