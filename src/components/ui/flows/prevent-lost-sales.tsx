// import CreateFlowCard from "@/components/ui/flows/create-flow-card";
import shopifyIcon from "../../../assets/shopifyicon.svg";
import mailAndSmsIcon from "../../../assets/mailandsmsicon.svg";
import { MessageSquareTextIcon, MailIcon } from "lucide-react";
// import CreateFlowForm from "./create-flow-form";
// import UiButton from "@/components/ui/button";
// import { useState } from "react";
import PreventLostSale from "../../../assets/prevent-lost-sales-flow.svg";
// import { Box, Flex } from "@chakra-ui/react";
// import { UiText } from "../text";
// import CreateFlowPopup from "./create-flow-popup";
import FlowList from "./flow-list";

export const PreventLostSalesCards = [
  {
    title: "Abandoned Cart Reminder",
    subtitle: "Standard (Email & SMS)",
    badgeIcon: shopifyIcon,
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    description:
      "Create a sense of urgency and drive sales through recovering abandoned shopping carts. Reach recipients on their channel of preference by splitting email and SMS.",
  },
  {
    title: "Browse Abandonment",
    subtitle: "A/B Test (Email or SMS)",
    badgeIcon: shopifyIcon,
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    description:
      "Convert site browsers to purchases with this Browse Abandonment flow. A/B test an email message to see which channel is more effective at converting your SMS subscribers.",
  },
  {
    title: "Browse Abandonment",
    subtitle: "Standard (Email & SMS)",
    badgeIcon: shopifyIcon,
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    description:
      "Did you something you liked? Convert curiosity into cash with this Browse Abandonment series that reaches customer with their preferred channel of communication by splitting email and SMS.",
  },
  {
    title: "Abandoned Cart Reminder",
    subtitle: "Added to Cart Trigger",
    badgeIcon: shopifyIcon,
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    description:
      "7 out of 10 shopping carts are abandoned. Recover more of them and drive up sales with this basic pre-built abandoned cart series.",
  },
  {
    title: "Abandoned Cart Reminder",
    subtitle: "A/B Test (Email or SMS)",
    badgeIcon: shopifyIcon,
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    description:
      "Create a sense of urgency and drive sales through recovering abandoned shopping carts. Reach recipients on their channel of preference by splitting email and SMS.",
  },
  {
    title: "Abandoned Cart Reminder",
    subtitle: "Localized (Email or SMS)",
    badgeIcon: shopifyIcon,
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    description:
      "Create a sense of urgency and drive sales through recovering abandoned shopping carts. Reach recipients on their channel of preference by splitting email and SMS. Localize product details to contextualize messages for recipients.",
  },
  {
    title: "Abandoned Cart Reminder",
    subtitle: "Shopify Added to Cart Trigger",
    badgeIcon: shopifyIcon,
    icon: mailAndSmsIcon,
    badgeTitle: "Shopify",
    description:
      "7 out of 10 shopping carts are abandoned. Recover more of them and drive up sales with this basic pre-built abandoned cart series.",
  },
  {
    title: "Abandoned Cart Reminder",
    subtitle: "Standard (SMS Only)",
    badgeIcon: shopifyIcon,
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    description:
      "7 out of 10 shopping carts are abandoned. Recover more of them and drive up sales with this SMS abandoned cart series.",
  },
  {
    title: "Browse Abandonment",
    subtitle: "Standard (SMS Only)",
    badgeIcon: shopifyIcon,
    icon: MessageSquareTextIcon,
    badgeTitle: "Shopify",
    description:
      "Send site visitors an SMS message to encourage them to place an order.",
  },
  {
    title: "Browse Abandonment",
    subtitle: "Standard",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Did you something you liked? Convert curiosity into cash with this Browse Abandonment series.",
  },
  {
    title: "Abandoned Cart Reminder",
    subtitle: "High Value Cart vs. Low Value Cart",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Wearing of discounting? Only provide a recovery incentive for high value carts with this flow that contains split paths based on the total cart value.",
  },
  {
    title: "Abandoned Cart Reminder",
    subtitle: "Domestic vs. International Split",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Want to incentivize recovery with a free shipping offer? Split our domestic and international recipients so you can restrict your offer based on geographic location.",
  },
  {
    title: "Browse Abandonment",
    subtitle: "Viewed Few vs. Viewed Many",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Targeting your site visitors with the right messaging based on their browsing behavior can yield high returns. This flow has split paths based on how many items someone has recently viewed.",
  },
  {
    title: "Abandoned Cart Reminder",
    subtitle: "Added to Cart Trigger",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Trigger Abandoned Cart emails earlier using this advanced flow that's set in motion when shoppers simply add an item to their cart.",
  },
  {
    title: "Abandoned Search Flow",
    subtitle: "Standard",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Did you something you liked? Convert curiosity into cash with this basic Search Abandonment series.",
  },
  {
    title: "Abandoned Collection Flow",
    subtitle: "Standard",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "Did you something you liked? Convert curiosity into cash with this basic Collection Abandonment series.",
  },
  {
    title: "Abandoned Cart Reminder",
    subtitle: "Shopify Added to Cart Trigger",
    badgeIcon: shopifyIcon,
    icon: MailIcon,
    badgeTitle: "Shopify",
    description:
      "7 out of 10 shopping carts are abandoned. Recover more of them and drive up sales.",
  },
];

const PreventLostSales = () => {
  // const [statusFilter, setStatusFilter] = useState<string | null>(null);
  // const [searchFilter, setSearchFilter] = useState<string>("");
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // const [openPopups, setOpenPopups] = useState<boolean[]>(
  //   Array(preventLostSalesCards.length).fill(false)
  // );

  // const flowCards = preventLostSalesCards.map((card, index) => ({
  //   ...card,
  //   onClick: () => {
  //     const updated = [...openPopups];
  //     updated[index] = true;
  //     setOpenPopups(updated);
  //   },
  // }));

  // const filterByStatus = (item: (typeof flowCards)[0]) => {
  //   const matchesSearch = searchFilter
  //     ? item.title.toLowerCase().includes(searchFilter.toLowerCase())
  //     : true;

  //   const tagMatch =
  //     selectedTags.length === 0 ||
  //     selectedTags.includes(item.badgeTitle.toLowerCase());

  //   const statusMatch =
  //     !statusFilter ||
  //     statusFilter === "all" ||
  //     (statusFilter === "email" && item.icon === MailIcon) ||
  //     (statusFilter === "sms" && item.icon === MessageSquareTextIcon) ||
  //     (statusFilter === "emailAndSms" && item.icon === mailAndSmsIcon);

  //   return matchesSearch && tagMatch && statusMatch;
  // };

  // const filteredCards = flowCards.filter(filterByStatus);
  return (
    <>
      {/* <CreateFlowCard
        items={filteredCards}
        heading="Prevent lost sales"
        backButton
        image={PreventLostSale}
        caption="Turn browses and abandoned carts into purchases with these high-converting flows."
      >
        <CreateFlowForm
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        {filteredCards.length > 0 ? undefined : (
          <Box textAlign="center" mt="10" mb="5">
            <UiText variant="heading2">No flows found</UiText>
            <UiText mt="3" mb="5" variant="caption">
              Change or remove applied filters to find what you're looking for
              or build your own
            </UiText>
            <Flex gap="3" justify="center">
              <UiButton
                uiVariant="solid"
                onClick={() => {
                  setSelectedTags([]);
                  setStatusFilter("all");
                  setSearchFilter("");
                }}
              >
                Remove Filters
              </UiButton>
              <UiButton uiVariant="outline">Search All Flows</UiButton>
            </Flex>
          </Box>
        )}
      </CreateFlowCard>
      {openPopups.map((isOpen, index) => {
        const card = flowCards[index];
        return (
          <CreateFlowPopup
            key={index}
            editDetailsOpen={isOpen}
            setEditDetailsOpen={(val: boolean) => {
              const updated = [...openPopups];
              updated[index] = val;
              setOpenPopups(updated);
            }}
            title={card.title}
            description={card.description}
            subtitle={card.subtitle}
          />
        );
      })} */}
      <FlowList
        heading="Prevent lost sales"
        image={PreventLostSale}
        caption="Build personalized relationships with your customers with these flows tailored for each recipient."
        cards={PreventLostSalesCards}
        backButton
      />
    </>
  );
};

export default PreventLostSales;
