import CreateFlowCard from "@/components/ui/flows/create-flow-card";
import shopifyIcon from "../../../assets/shopifyicon.svg";
import { MailIcon } from "lucide-react";
import CreateFlowPopup from "./create-flow-popup";
import { useEffect, useState } from "react";
import createFlow1 from "../../../assets/createflow1.svg";
import { useFlowStore } from "@/store/flows-store";
import { useNavigate } from "react-router-dom";
import { getAllFlows } from "@/api/flow-api";

const originalCards = [
  {
    title: "Browse Abandonment",
    subtitle: "Standard",
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    icon: MailIcon,
    description:
      " Did you see something you liked? Convert curiosity into cash with this basis Browse Abandonment series.",
    type: "browser_abandonment",
  },
  // {
  //   title: "Customer Winback",
  //   subtitle: "Standard",
  //   badgeIcon: shopifyIcon,
  //   badgeTitle: "Shopify",
  //   icon: MailIcon,
  //   description:
  //     "Encourage Lapsed customers to come back and see what's new with this standard Winback Series.",
  //   type: "customer_winback",
  // },
  {
    title: "Customer Thank You",
    subtitle: "New vs.Returning",
    icon: MailIcon,
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    description:
      "Build customer loyalty by sending a thank you email post-purchase. This flow has split paths for new vs. returning customers.",
    type: "post_purchase_thankyou",
  },
  {
    title: "Welcome Series",
    subtitle: "Customer v. Non-Customer",
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    icon: MailIcon,
    description:
      "Welcome all new subscribers, but identify those that are truly just beginning their journey with you & may need an incentive to make that first purchase.",
    type: "welcomed",
  },
  {
    title: "Post-Purchase Followup",
    subtitle: "Order Count Split",
    badgeIcon: shopifyIcon,
    badgeTitle: "Shopify",
    icon: MailIcon,
    description:
      "Tailor post-purchase content based on lifecycle stage! This flow splits out post-purchase paths for first-time buyers, second-time buyers, and then 3+ time buyers.",
    type: "first_purchase_upsell",
  },
];

const StartWithTemplates = () => {
  const { automation, setAutomation, setFlowsPageLoading } = useFlowStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlows = async () => {
      setFlowsPageLoading(true);
      try {
        const data = await getAllFlows();
        const backendTypes = (data.all || []).reduce((acc: any, flow: any) => {
          if (flow.type) acc[flow.type] = true;
          return acc;
        }, {});

        const currentAutomation = useFlowStore.getState().automation;
        setAutomation({
          ...currentAutomation,
          all: data.all,
          overall: data.overall,
          all_shopify_flows: data.all_shopify_flows,
          backendTypes,
        });
      } catch (error) {
        console.error("Failed to get flows list", error);
      } finally {
        setFlowsPageLoading(false);
      }
    };
    fetchFlows();
  }, []);

  const flowCards = originalCards
    .filter((card) => {
      if (!automation.backendTypes) {
        // Fallback if backendTypes not yet populated (though it defaults to {})
        if (!automation.all) return true;
        return !automation.all.some((flow: any) => flow.type === card.type);
      }
      // If the flow type exists in the backendTypes map, filter it out
      return !automation.backendTypes[card.type];
    })
    .map((card, index) => ({
      ...card,
      onClick: () => {
        navigate(`/createflow/create?type=${card.type}&template=true`);
      },
    }));

  return (
    <>
      <CreateFlowCard
        items={flowCards}
        heading="Start with the templates"
        image={createFlow1}
        caption="Start with these flows to increase revenue and engagement with little effort."
      />
    </>
  );
};

export default StartWithTemplates;
