const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const domainRegex = /^(?!www\.)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;

export const isInvalidEmail = (email: string) => {
  return !emailRegex.test(email);
};

export const validateDomain = (domain: string) => {
  return domainRegex.test(domain);
};

export const renderFlowName = (type: string) => {
  const titles = {
    welcomed: "Welcome Email",
    cart_recovery: "Cart Recovery Email",
    browser_abandonment: "Browser Abandonment Email",
    checkout_recovery: "Checkout Recovery Email",
    shipping: "Shipping Email",
    back_in_stock: "Back In Stock Email",
    customer_winback: "Customer Win Back Email",
    first_purchase_upsell: "First Purchase Upsell Email",
    post_purchase_thankyou: "Post Purshase Thank You Email",
    product_release: "Product Release Email",
    welcome_series_brand_story: "Welcome Series Brand Story Email",
    welcome_series_with_discount: "Welcome Series With Discount Email",
  };

  return titles[type as keyof typeof titles] || "Email";
};

export const commaFormatting = (num: number) => {
  const number = num;
  const formatter = new Intl.NumberFormat("en-US");
  const formattedNumber = formatter.format(number);
  return formattedNumber;
};

export const titleCase = (str: string) =>
  str
    .replace(/^[-_]*(.)/, (_, char) => char.toUpperCase())
    .replace(/[-_]+(.)/g, (_, char) => " " + char.toUpperCase());
