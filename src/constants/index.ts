export const shopifyAppConfig = {
  apiKey: "5611408bd109b3612e7e7490450cd7a4",
  host: new URLSearchParams(location.search).get("host"),
  forceRedirect: true,
};

export const businessEmailsOptions = [
  {
    label: "10$ for 10,000 emails",
    value: "10000",
  },
  {
    label: "20$ for 20,000 emails",
    value: "20000",
  },
  {
    label: "30$ for 30,000 emails",
    value: "30000",
  },
  {
    label: "40$ for 40,000 emails",
    value: "40000",
  },
  {
    label: "50$ for 50,000 emails",
    value: "50000",
  },
  {
    label: "60$ for 60,000 emails",
    value: "60000",
  },
];

export const enterpriseEmailsOptions = [
  {
    label: "10$ for 15,000 emails",
    value: "15000",
  },
  {
    label: "20$ for 30,000 emails",
    value: "30000",
  },
  {
    label: "30$ for 45,000 emails",
    value: "45000",
  },
  {
    label: "40$ for 60,000 emails",
    value: "60000",
  },
  {
    label: "50$ for 75,000 emails",
    value: "75000",
  },
  {
    label: "60$ for 90,000 emails",
    value: "90000",
  },
];

export const durationOptions = [
  {
    label: "24 hr",
    value: "24_hr",
  },
  {
    label: "7 days",
    value: "7_days",
  },
  {
    label: "30 days",
    value: "30_days",
  },
  {
    label: "90 days",
    value: "90_days",
  },
  {
    label: "All Time",
    value: "all_time",
  },
];

export const groupByOptions = [
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
];

export const segmentsColumnTypes = [
  "text",
  "text",
  "text",
  "text",
  "text",
  "text",
  "text",
  "text",
  "text",
];

export const segmentsHeadings = [
  "Segment Name",
  "Last Synced At",
  "Subscribers",
  "Campaigns Sent",
  "Opened",
  "Clicks",
  "Revenue Generated",
  "Status",
  "Actions",
];

export const subscribersColumnTypes = [
  "text",
  "text",
  "text",
  "text",
  "text",
  "text",
];
export const subscribersHeadings = [
  "Subscriber",
  "Email",
  "Orders Count",
  "Total Spent",
  "City/State",
  "Country",
  "Subscription Time",
  "Unsubscribed",
];

export const ordersReportColumnTypes = [
  "text",
  "text",
  "text",
  "text",
  "text",
  "text",
];
export const ordersReportHeadings = [
  "Customer Name",
  "Order ID",
  "Order Name",
  "Order Price",
  "Order Time",
];

export const flowHeadings = [
  { title: "Flow" },
  { title: "Status" },
  { title: "Emails sent" },
  { title: "Clicked" },
  { title: "Opened" },
  { title: "Bounced" },
  { title: "Revenue" },
  { title: "" },
];

export const flowTypeHeadings = [
  { title: "Activity Name" },
  { title: "Status" },
  { title: "Emails sent" },
  { title: "Clicked" },
  { title: "Bounced" },
  { title: "Opened" },
  { title: "Order Count" },
  { title: "Revenue" },
  { title: "Timeout" },
  { title: "" },
];

export const NewCampaignSteps = [
  { title: "Campaign Details", value: 0 },
  { title: "Create Email", value: 1 },
  { title: "Summary", value: 2 },
];

export const newEmailTemplate = {
  id: "create-new",
  image: "",
  name: " Create New Email Template",
  type: "create-new",
};

export const cropperAspectRatio = {
  shopLogo: 1,
};

export const cropperDimensions = {
  shopLogoMinHeight: 200,
  shopLogoMinWidth: 200,
};

export const promptBackgroundImageOptions = [
  { label: "None", value: "none" },
  { label: "Top", value: "up" },
  { label: "Bottom", value: "bottom" },
  { label: "Right", value: "right" },
  { label: "Left", value: "left" },
];

export const timeOptions = [
  { label: "12:00 AM", value: "00:00" },
  { label: "12:30 AM", value: "00:30" },
  { label: "01:00 AM", value: "01:00" },
  { label: "01:30 AM", value: "01:30" },
  { label: "02:00 AM", value: "02:00" },
  { label: "02:30 AM", value: "02:30" },
  { label: "03:00 AM", value: "03:00" },
  { label: "03:30 AM", value: "03:30" },
  { label: "04:00 AM", value: "04:00" },
  { label: "04:30 AM", value: "04:30" },
  { label: "05:00 AM", value: "05:00" },
  { label: "05:30 AM", value: "05:30" },
  { label: "06:00 AM", value: "06:00" },
  { label: "06:30 AM", value: "06:30" },
  { label: "07:00 AM", value: "07:00" },
  { label: "07:30 AM", value: "07:30" },
  { label: "08:00 AM", value: "08:00" },
  { label: "08:30 AM", value: "08:30" },
  { label: "09:00 AM", value: "09:00" },
  { label: "09:30 AM", value: "09:30" },
  { label: "10:00 AM", value: "10:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "11:00 AM", value: "11:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "12:00 PM", value: "12:00" },
  { label: "12:30 PM", value: "12:30" },
  { label: "01:00 PM", value: "13:00" },
  { label: "01:30 PM", value: "13:30" },
  { label: "02:00 PM", value: "14:00" },
  { label: "02:30 PM", value: "14:30" },
  { label: "03:00 PM", value: "15:00" },
  { label: "03:30 PM", value: "15:30" },
  { label: "04:00 PM", value: "16:00" },
  { label: "04:30 PM", value: "16:30" },
  { label: "05:00 PM", value: "17:00" },
  { label: "05:30 PM", value: "17:30" },
  { label: "06:00 PM", value: "18:00" },
  { label: "06:30 PM", value: "18:30" },
  { label: "07:00 PM", value: "19:00" },
  { label: "07:30 PM", value: "19:30" },
  { label: "08:00 PM", value: "20:00" },
  { label: "08:30 PM", value: "20:30" },
  { label: "09:00 PM", value: "21:00" },
  { label: "09:30 PM", value: "21:30" },
  { label: "10:00 PM", value: "22:00" },
  { label: "10:30 PM", value: "22:30" },
  { label: "11:00 PM", value: "23:00" },
  { label: "11:30 PM", value: "23:30" },
];

export const flowsTimeOptions = [
  { label: "5 minutes", value: 300000 },
  { label: "10 minutes", value: 600000 },
  { label: "15 minutes", value: 900000 },
  { label: "30 minutes", value: 1800000 },
  { label: "45 minutes", value: 2700000 },
  { label: "1 hour", value: 3600000 },
  { label: "2 hours", value: 7200000 },
  { label: "3 hours", value: 10800000 },
  { label: "4 hours", value: 14400000 },
  { label: "5 hours", value: 18000000 },
  { label: "6 hours", value: 21600000 },
  { label: "7 hours", value: 25200000 },
  { label: "12 hours", value: 43200000 },
  { label: "1 day", value: 86400000 },
  { label: "2 days", value: 172800000 },
  { label: "3 days", value: 259200000 },
  { label: "4 days", value: 345600000 },
  { label: "5 days", value: 432000000 },
  { label: "6 days", value: 518400000 },
  { label: "7 days", value: 604800000 },
  { label: "10 days", value: 864000000 },
  { label: "15 days", value: 1296000000 },
  { label: "20 days", value: 1728000000 },
  { label: "25 days", value: 2160000000 },
  { label: "30 days", value: 2592000000 },
];

export const flowWelcomeSeriesTimeOptions = [
  { label: "1 day", value: 86400000 },
  { label: "2 days", value: 172800000 },
  { label: "3 days", value: 259200000 },
  { label: "4 days", value: 345600000 },
  { label: "5 days", value: 432000000 },
  { label: "6 days", value: 518400000 },
  { label: "7 days", value: 604800000 },
  { label: "10 days", value: 864000000 },
  { label: "15 days", value: 1296000000 },
  { label: "20 days", value: 1728000000 },
  { label: "25 days", value: 2160000000 },
  { label: "30 days", value: 2592000000 },
];

export const promptTimingsOptions = [
  { label: "0", value: 0 },
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
  { label: "30", value: 30 },
  { label: "35", value: 35 },
  { label: "40", value: 40 },
  { label: "45", value: 45 },
  { label: "50", value: 50 },
  { label: "55", value: 55 },
  { label: "60", value: 60 },
];

export const hidePromptTimingsOptions = [
  { label: "60", value: 60 },
  { label: "90", value: 90 },
  { label: "120", value: 120 },
  { label: "150", value: 150 },
  { label: "180", value: 180 },
  { label: "210", value: 210 },
];

export const promptDesktopPosition = [
  { label: "Top-left", value: "top-left" },
  { label: "Top-center", value: "top-center" },
  { label: "Top-right", value: "top-right" },
  { label: "Middle-left", value: "middle-left" },
  { label: "Middle-center", value: "middle-center" },
  { label: "Middle-right", value: "middle-right" },
  { label: "Bottom-left", value: "bottom-left" },
  { label: "Bottom-center", value: "bottom-center" },
  { label: "Bottom-right", value: "bottom-right" },
];

export const promptMobilePosition = [
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" },
];

export const campaignInitialTabs = [
  {
    id: "completed",
    content: "Sent Campaigns",
    type: "sent",
  },
  {
    id: "scheduled",
    content: "Scheduled Campaigns",
    type: "scheduled",
  },
  {
    id: "draft",
    content: "Draft Campaigns",
    type: "draft",
  },
];

export const emailTemplatesInitialTabs = [
  {
    id: "all",
    content: "All",
  },
  {
    id: "default",
    content: "Default Templates",
  },
  {
    id: "custom",
    content: "Saved Templates",
  },
];

export const segmentsInitialTabs = [
  {
    id: "active-segments",
    content: "Active Segments",
  },
  {
    id: "archived-segments",
    content: "Archived Segments",
  },
];

export const Plan_Features = [
  {
    description: [
      "Unlimited Subscribers",
      "Basic Reports",
      "Chat Support",
      "Welcome Email Automation",
      "Cart Recovery Automation",
      "-",
      "-",
      "-",
      "-",
    ],
  },
  {
    description: [
      "All Basic Features",
      "Create Campaigns",
      "Abandoned Cart Automation",
      "Browser Abandonment Automation",
      "Checkout Recovery Emails",
      "Shipping Email",
      "Create Custom Flows",
      "Additional 1,000 emails for $1",
      "-",
    ],
  },
  {
    description: [
      "All Business Features",
      "Customer Win back loop",
      "First Purchase Upsell",
      "Post Purchase Thank you",
      "Welcome Series Brand Story",
      "Welcome Series With Discount Email",
      "Priority Support",
      "Additional 1,500 emails for $1",
      "-",
    ],
  },
];

export const addNewSpinWheelReward = [
  {
    label: "New reward",
    chance: 10,
    discount: {
      option: "automatically_generated",
      discountCode: "",
      type: "percentage",
      amount: 5,
      expire: false,
      endsAt: "",
    },
  },
];

export const spinWheelChoiceOptions = [
  {
    label: "Set expiration on discount",
    value: true,
  },
];

export const spinWheelSelectOptions = [
  { label: "Percentage", value: "percentage" },
  { label: "Fixed Amount", value: "fixed_amount" },
];

export const flowFilterOptions = [
  {
    label: "Subscriber",
    value: "disabled-Subscriber",
    disabled: true,
  },
  {
    label: "Country",
    value: "country",
    type: "subscriber",
  },
  {
    label: "Tags",
    value: "tags",
    type: "subscriber",
  },
  {
    label: "Segments",
    value: "disabled-Segments",
    disabled: true,
  },
  {
    label: "Is in segment",
    value: "exists",
    type: "segment",
  },
  {
    label: "Is not in segment",
    value: "not_exists",
    type: "segment",
  },
  // {
  //   label: "Messages",
  //   value: "disabled-Messages",
  //   disabled: true,
  // },
  // {
  //   label: "has received",
  //   value: "delivered",
  //   type: "messages",
  // },
  // {
  //   label: "has not received",
  //   value: "not_delivered",
  //   type: "messages",
  // },
  // {
  //   label: "has opened",
  //   value: "opened",
  //   type: "messages",
  // },
  // {
  //   label: "has not opened",
  //   value: "not_opened",
  //   type: "messages",
  // },
  // {
  //   label: "has clicked",
  //   value: "clicked",
  //   type: "messages",
  // },
  // {
  //   label: "has not clicked",
  //   value: "not_clicked",
  //   type: "messages",
  // },
];

export const flowsNodeStyles = {
  border: "none",
  width: "300px",
  boxShadow: "0 0 10px rgba(53, 66, 84, .1)",
  borderRadius: "13px",
};

export const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#5f30f9" },
  },
];

export const emptyEmailTemplate = {
  assets: [],
  styles: [
    {
      selectors: [],
      selectorsAdd: "h1, h2, h3, h4, h5",
      style: {
        "margin-top": "0px",
        "margin-left": "0px",
        "margin-right": "0px",
        "margin-bottom": "0px",
      },
    },
    {
      selectors: [],
      selectorsAdd: "p",
      style: {
        "margin-top": "2px",
        "margin-left": "0px",
        "margin-right": "0px",
        "margin-bottom": "2px",
      },
    },
    {
      selectors: ["#ihpi"],
      style: {
        "background-color": "#f9f9f9",
      },
      wrapper: 1,
    },
    {
      selectors: ["#email-body"],
      style: {
        height: "auto",
        margin: "0 auto",
        "max-width": "600px",
        background: "#fff",
        "min-height": "100px",
        "font-family": "Helvetica, sans-serif",
      },
    },
    {
      selectors: ["#ih8l"],
      style: {
        width: "100%",
        "border-bottom": "1px solid #000",
        "border-collapse": "collapse",
      },
    },
    {
      selectors: ["#ip56m"],
      style: {
        width: "100%",
        "border-bottom": "1px solid #000",
        "border-collapse": "collapse",
      },
    },
    {
      selectors: ["#ixsuf"],
      style: {
        width: "100%",
        "border-collapse": "collapse",
        "font-family": "Helvetica, sans-serif",
      },
    },
    {
      selectors: ["#ixwa4"],
      style: {
        width: "100%",
        "border-collapse": "collapse",
        "font-family": "Helvetica, sans-serif",
      },
    },
    {
      selectors: ["#i0691"],
      style: {
        "font-family": "Helvetica, sans-serif",
        padding: "20px 0px 20px 0px",
        width: "100%",
      },
    },
    {
      selectors: ["#izgvj"],
      style: {
        "font-family": "Helvetica, sans-serif",
        width: "100%",
        padding: "0px 0px 0px 0px",
      },
    },
  ],
  pages: [
    {
      frames: [
        {
          component: {
            tagName: "div",
            type: "wrapper",
            droppable: false,
            stylable: ["color", "font-family"],
            attributes: {
              id: "ihpi",
            },
            components: [
              {
                type: "email-body",
                removable: false,
                draggable: false,
                stylable: ["color"],
                copyable: false,
                attributes: {
                  id: "email-body",
                },
                components: [
                  {
                    type: "section-1",
                    style: "",
                    classes: ["section-1-container"],
                    attributes: {
                      id: "izgvj",
                    },
                    components: [
                      {
                        type: "container",
                        style: "",
                        classes: ["section-1-cell"],
                        attributes: {
                          id: "i0691",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            head: {
              type: "head",
            },
            docEl: {
              tagName: "html",
            },
          },
          id: "Evkg5SsG2pSsjUZu",
        },
      ],
      id: "RozjPKugqT0pxPsa",
    },
  ],
  symbols: [],
};
