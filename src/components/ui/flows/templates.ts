export const flow_templates = [
  {
    title: "Welcome",
    description:
      "Send a welcome email to new customers or subscribers to introduce them to your store and brand.",
    type: "welcomed",
  },
  {
    title: "Convert abandoned product browse",
    description:
      "Send a marketing email to customers who viewed a product but didn’t add it to their cart. It excludes customers who received an abandoned checkout, cart, or product browse email in the last 14 days.",
    type: "browser_abandonment",
  },
  {
    title: "Recover abandoned cart",
    description:
      "Send a marketing email when a customer adds at least one product to their cart but doesn’t proceed to checkout. It excludes customers who received an abandoned checkout, cart, or product browse email in the last 14 days.",
    type: "cart_recovery",
  },
  {
    title: "Recover abandoned checkout",
    description:
      "Send an email 10 hours after a customer gets to checkout but doesn’t place an order to encourage them to complete their purchase. By default, this automation will send to customers subscribed to marketing.",
    type: "checkout_recovery",
  },
  {
    title: "Shipping",
    description:
      "Send notifications or updates to customers about the shipping status of their orders.",
    type: "shipping",
  },
  // {
  //   title: "Win back customers",
  //   description:
  //     "Give a discount to customers who haven’t placed an order at your store in the last 60 days. This automation requires a winback segment.",
  //   type: "customer_winback",
  // },
  {
    title: "Upsell customers after their first purchase",
    description:
      "Send a marketing email showcasing featured products after a customer makes their first purchase. 14 days after an order is placed, this automation will send first-time customers an email, encouraging them to make another purchase.",
    type: "first_purchase_upsell",
  },
  {
    title: "Thank customers after they purchase",
    description: `Send a different thank you email to customers after their first and second purchases. 1 day after a customer places an order, this automation checks the number of orders the customer has made.
    If it’s their first order, a marketing email will be sent to welcome and thank them for their purchase. If it’s their second order, a different marketing email will be sent to express appreciation for their continued support.`,
    type: "post_purchase_thankyou",
  },
  {
    title: "Share your brand story with new subscribers",
    description: `Introduce new subscribers to your brand with 4 emails when they subscribe through a form on your online store:

    Welcome them to your store
    Invite them to follow your social media channels
    Highlight your best selling products
    Share a discount if no order has been placed
    
    Customers who subscribed at checkout will be excluded to prevent sending a welcome email with a discount right after a purchase was made.`,
    type: "welcome_series_brand_story",
  },
  {
    title: "Welcome new subscribers with a discount email",
    description:
      "Send new subscribers a welcome email with a discount when they subscribe through a form on your online store. It excludes customers who subscribe at checkout to prevent sending a welcome email with a discount right after a purchase was made.",
    type: "welcome_series_with_discount",
  },
];
