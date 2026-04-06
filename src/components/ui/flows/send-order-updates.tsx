import shopifyIcon from "../../../assets/shopifyicon.svg";
import { MailIcon, MessageSquareTextIcon } from "lucide-react";
import SendOrderUpdatesImage from "../../../assets/send-order-updates.svg";
import FlowList from "./flow-list";

export const SendOrderUpdatesCards = [
  {
    title: "Order Confirmed",
    subtitle: "Standard",
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Keep customers updated with an SMS after a purchase is made using this flow. It’s pre-built to populate important order details.",
  },
  {
    title: "Order Fully Processed",
    subtitle: "Standard",
    badgeIcon: shopifyIcon,
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    description:
      "Notify your customers when their entire order has been fulfilled using this flow. It’s prebuilt to populate important order details.",
  },
  {
    title: "Shipment Confirmed",
    subtitle: "Standard",
    badgeIcon: shopifyIcon,
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    description:
      "Using this flow, keep your customers updated each time a shipment from their order is confirmed. It’s prebuilt to populate important tracking details.",
  },
  {
    title: "Shipment Out of Delivery",
    subtitle: "Standard",
    icon: MessageSquareTextIcon,
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    description:
      "Using this flow, keep your customers updated each time a shipment from their order is out for delivery. It’s prebuilt to populate important tracking details.",
  },
  {
    title: "Shipment Delivered",
    subtitle: "Standard",
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Using this flow, keep your customers updated each time a shipment from their order is delivered. It’s prebuilt to populate important tracking details.",
  },
  {
    title: "Order Refunded",
    subtitle: "Standard",
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Using this flow, notify your customers when their order has been refunded. It’s pre-built to populate important order details.",
  },
  {
    title: "Order Cancelled",
    subtitle: "Standard",
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Using this flow, notify your customers when their order has been cancelled. It’s pre-built to populate important order details.",
  },
  {
    title: "Order Partially Processed",
    subtitle: "Exclude Last Partial Fulfillment",
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "CKeep your customers updated as each part of their order is fulfilled using this flow, except for the last fulfillment. Then, combine this flow with the Order Fully Processed - Standard flow to send an additional SMS when the entire order has been fulfilled.",
  },
  {
    title: "Full Shipping Confirmation",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Let your customers know whenever their entire order has been shipped using this transactional flow that's pre-built to populate all important order details.",
  },
  {
    title: "Delayed Fulfillment",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Keep customers in the loop about delays -- automate an update whenever your standard fulfillment window passes if you haven't yet fulfilled an order.",
  },
  {
    title: "Order Confirmation",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Send an order confirmation email after a purchase is made using this flow that's pre-built to populate all important order details.",
  },
  {
    title: "Partial Shipping Confirmation",
    subtitle: "Exclude Last Partial Fulfillment",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Keep your customers updated as each item in their order is shipped using this transactional flow that's pre-built to populate all important order details. Note: The last item(s) in their order will be excluded from triggering this flow. Combine this with the Full Shipping Confirmation Flow - Standard to send an email confirmation when the last items have shipped and the entire order has been fulfilled.",
  },
  {
    title: "Full Shipping Confirmation",
    subtitle: "Ignore Partial Orders",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Notify customers with an email confirmation when their entire order is completed with one fulfillment. Pair this with the Partial Shipping Confirmation Flow - Standard Flow so that customers who have an order with multiple fulfillments can stay informed with each partial fulfillment.",
  },
  {
    title: "Partial Shipping Confirmation",
    subtitle: "Standard",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Keep your customers updated as each item in their order is shipped using this transactional flow that's pre-built to populate all important order details. Combine this with the Full Shipping Confirmation Flow - Standard to send an additional email confirmation when the entire order is completed.",
  },
  {
    title: "Order Confirmation",
    subtitle: "Localized",
    icon: MailIcon,
    badgeTitle: "Shopify",
    badgeIcon: shopifyIcon,
    description:
      "Send an order confirmation email after a purchase is made using this flow that's pre-built to populate all important order details. Localize product details to contextualize messages for recipients.",
  },
];

const SendOrderUpdates = () => {
  return (
    <>
      <FlowList
        heading="Update customers on their order status"
        image={SendOrderUpdatesImage}
        caption="Send essential non-marketing emails with Flows to keep customers updated on their order status. Learn more about sending transactional emails."
        cards={SendOrderUpdatesCards}
        backButton
      />
    </>
  );
};

export default SendOrderUpdates;
