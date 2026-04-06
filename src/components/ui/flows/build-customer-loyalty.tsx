import shopifyIcon from "../../../assets/shopifyicon.svg";
import mailAndSmsIcon from "../../../assets/mailandsmsicon.svg";
import { MailIcon } from "lucide-react";
import BuildCustomerLoyaltyImage from "../../../assets/build-customer-loyalty.svg";
import FlowList from "./flow-list";

export const BuildCustomerLoyaltyCards = [
  {
    title: "First Purchase Thank You & Bounceback",
    subtitle: "Standard (Email & SMS)",
    badgeIcon: shopifyIcon,
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    description:
      "Convert would-be one time buyers into repeat purchasers with a compelling bounce back offer that brings someone back to keep shopping immediately after placing an order. Before you take advantage of this Bounceback Flow, make sure you've set up unique coupon codes or create a static coupon. Learn m﻿ore.",
  },
  {
    title: "First Purchase Anniversary",
    subtitle: "Standard",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Celebrate the day someone first became a customer with a special message and discount to keep these customers happy and, more importantly, coming back for more.",
  },
  {
    title: "Customer Thank You",
    subtitle: "New vs. Returning",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Build customer loyalty by sending a thank you email post-purchase. This flow has split paths for new vs. returning customers.",
  },
];

const BuildCustomerLoyalty = () => {
  return (
    <>
      <FlowList
        heading="Build customer loyalty"
        image={BuildCustomerLoyaltyImage}
        caption="Build personalized relationships with your customers with these flows tailored for each recipient."
        cards={BuildCustomerLoyaltyCards}
        backButton
      />
    </>
  );
};

export default BuildCustomerLoyalty;
