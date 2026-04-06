import { Box, Flex, useBreakpointValue, Switch } from "@chakra-ui/react";
import Tables from "../table";
import SearchBar from "../search-bar";
import React, { useEffect, useState } from "react";
import { StatusDropdown } from "../dropdown/status-dropdown";
import FlowActionMenu from "./flow-action-menu";
import Button from "../button";
import { UiText } from "../text";
import { enableFlows, getAutomationKey } from "@/api/flow-api";
import type { FlowTableProps } from "@/types/user-type";
import type { FlowAutomationStatus, FlowStats } from "@/types/flow-types";
import EmptyTable from "../../../assets/emptytable.svg";
import { TagMultiSelectDropdown } from "../dropdown/tag-multiselect-dropdown";
import { CiFilter } from "react-icons/ci";
import { NewDropDown } from "../dropdown/new-dropdown";
import { toaster } from "@/components/ui/toaster";
import { useFlowStore } from "@/store/flows-store";
import { useShopStore } from "@/store/shop-store";
import { commaFormatting } from "@/helpers";

const getFlowName = (type: string): string => {
  const names: Record<string, string> = {
    welcomed: "Welcome Series",
    cart_recovery: "Abandoned Cart",
    browse_abandonment: "Browse Abandonment",
    shipping: "Shipping Confirmation",
    checkout_recovery: "Checkout Recovery",
    back_in_stock: "Back in Stock",
    product_release: "Product Release",
    welcome_series_with_discount: "Welcome Series (Discount)",
    welcome_series_brand_story: "Welcome Series (Brand Story)",
    post_purchase_thankyou: "Customer Thank You",
    first_purchase_upsell: "First Purchase Upsell",
    customer_winback: "Customer Winback",
  };
  return names[type] || type.replace(/_/g, " ");
};

const FlowTable = () => {
  const shop = useShopStore((state) => state.shop);
  const setAutomationStatus = useShopStore(
    (state) => state.setAutomationStatus,
  );
  const { automation, flowsPageLoading } = useFlowStore();

  const [selectedOption, setSelectedOption] = useState("flyout");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [items, setItems] = useState<FlowTableProps[]>([]);
  const [shopifyItems, setShopifyItems] = useState<FlowTableProps[]>([]);
  const [automationStatuses, setAutomationStatuses] =
    useState<FlowAutomationStatus>({});

  const showTagInline = useBreakpointValue({ base: false, "4xl": true });
  const showStatusInline = useBreakpointValue({ base: false, "4xl": true });
  const hasTagData = items.some((item) => item.tag && item.tag.length > 0);
  const hasStatusData = items.some((item) => !!item.status);
  const shouldShowDropdown =
    (!showTagInline && hasTagData) || (!showStatusInline && hasStatusData);

  useEffect(() => {
    const mapFlows = (list: FlowStats[]) =>
      list.map((flow) => ({
        id: flow.type,
        name: getFlowName(flow.type),
        subtitle: "",
        sent: commaFormatting(flow.delivery || 0),
        opened: commaFormatting(flow.open || 0),
        clicks: commaFormatting(flow.click || 0),
        revenue: shop?.currency + " " + commaFormatting(flow.revenue || 0),

        conversionRate:
          flow.delivery > 0
            ? ((flow.click / flow.delivery) * 100).toFixed(1) + "%"
            : "0.0%",

        status: "", // Will be controlled by switch/automationStatuses
        lastUpdated: flow.updated_at
          ? new Date(flow.updated_at).toLocaleString()
          : "-",
      }));

    if (automation.all) {
      setItems(mapFlows(automation.all));
    }
    if (automation.all_shopify_flows) {
      setShopifyItems(mapFlows(automation.all_shopify_flows));
    }
  }, [automation]);

  const handleStatusToggle = async (type: string, currentStatus: boolean) => {
    const automationKey = getAutomationKey(type);
    const newStatus = !currentStatus;

    // Optimistic update
    setAutomationStatuses((prev) => ({ ...prev, [automationKey]: newStatus }));

    try {
      await enableFlows({ [automationKey]: newStatus });
      setAutomationStatus(automationKey, newStatus);
      toaster.create({
        title: `Flow ${newStatus ? "enabled" : "disabled"}`,
        type: "success",
      });
    } catch (error) {
      // Revert
      setAutomationStatuses((prev) => ({
        ...prev,
        [automationKey]: currentStatus,
      }));
      toaster.create({ title: "Failed to update status", type: "error" });
    }
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchFilter("");
    setStatusFilter(null);
    setSelectedTags([]);
  };

  const filterList = (list: FlowTableProps[]) => {
    return list.filter((item) => {
      const automationKey = getAutomationKey(item.type);

      const isEnabled = shop?.shop_settings[automationKey] || false;

      const matchesStatus =
        statusFilter === "active"
          ? isEnabled
          : statusFilter === "inactive"
            ? !isEnabled
            : true;

      const matchesSearch = searchFilter
        ? item.name.toLowerCase().includes(searchFilter.toLowerCase())
        : true;
      const matchesTags =
        selectedTags.length === 0
          ? true
          : item.tag?.some((tag: string) => selectedTags.includes(tag));

      return matchesStatus && matchesTags && matchesSearch;
    });
  };

  const filteredItems = filterList(items);
  const filteredShopifyItems = filterList(shopifyItems);

  const showFilters =
    !!searchFilter || selectedTags.length > 0 || !!statusFilter;

  const column = [
    {
      header: "Flow",
      width: "24%",
      key: "name",
      color: "blue.400",
    },
    {
      header: "Sent",
      width: "12%",
      key: "sent",
      isNumeric: true,
    },
    {
      header: "Opened",
      width: "12%",
      key: "opened",
      isNumeric: true,
    },
    {
      header: "Clicks",
      width: "12%",
      key: "clicks",
      isNumeric: true,
    },
    {
      header: "Revenue",
      width: "14%",
      key: "revenue",
      isNumeric: true,
    },
    {
      header: "Conversion rate",
      width: "12%",
      key: "conversionRate",
      isNumeric: true,
    },
    {
      header: "Status",
      width: "8%",
      key: "status",
      cell: (row: FlowTableProps) => {
        const automationKey = getAutomationKey(row.type);
        const isEnabled = shop?.shop_settings[automationKey] || false;

        return (
          <Switch.Root
            checked={isEnabled}
            onCheckedChange={() => handleStatusToggle(row.type, isEnabled)}
            colorPalette={isEnabled ? "green" : "red"}
          >
            <Switch.HiddenInput />
            <Switch.Control />
          </Switch.Root>
        );
      },
    },
    {
      header: "Last updated",
      width: "10%",
      key: "lastUpdated",
    },
    {
      header: "",
      width: "6%",
      key: "dropdown",
      isNumeric: true,
      cell: (row: FlowTableProps) => (
        <FlowActionMenu
          flow={row}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      ),
    },
  ];

  const shopifyColumns = [
    {
      header: "Flow",
      width: "24%",
      key: "name",
      color: "blue.400",
    },
    {
      header: "Sent",
      width: "14%",
      key: "sent",
      isNumeric: true,
    },
    {
      header: "Opened",
      width: "14%",
      key: "opened",
      isNumeric: true,
    },
    {
      header: "Clicks",
      width: "14%",
      key: "clicks",
      isNumeric: true,
    },
    {
      header: "Revenue",
      width: "14%",
      key: "revenue",
      isNumeric: true,
    },
    {
      header: "Conversion rate",
      width: "10%",
      key: "conversionRate",
      isNumeric: true,
    },
    {
      header: "Last updated",
      width: "10%",
      key: "lastUpdated",
    },
  ];

  return (
    <>
      <form onReset={handleReset}>
        <Flex justify="space-between" align="center">
          <Flex gap="2">
            <SearchBar
              w="2xs"
              placeholder="Search flows"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            {showStatusInline && (
              <StatusDropdown
                options={[
                  {
                    label: "Active",
                    value: "active",
                  },
                  {
                    label: "Inactive",
                    value: "inactive",
                  },
                ]}
                menuWidth="fit"
                selected={statusFilter}
                onChange={setStatusFilter}
              />
            )}

            {/* {showTagInline && (
              <TagMultiSelectDropdown
                selected={selectedTags}
                onChange={setSelectedTags}
              />
            )} */}
            {shouldShowDropdown && (
              <NewDropDown buttonTitle={<CiFilter />} p="2">
                <Flex direction="column" p="2" gap="2">
                  {!showStatusInline && hasStatusData && (
                    <StatusDropdown
                      options={[
                        {
                          label: "Active",
                          value: "active",
                        },
                        {
                          label: "Inactive",
                          value: "inactive",
                        },
                      ]}
                      buttonWidth="full"
                      menuWidth="fit"
                      selected={statusFilter}
                      onChange={setStatusFilter}
                    />
                  )}
                  {!showTagInline && hasTagData && (
                    <TagMultiSelectDropdown
                      buttonWidth="full"
                      selected={selectedTags}
                      onChange={setSelectedTags}
                    />
                  )}
                </Flex>
              </NewDropDown>
            )}

            {showFilters && (
              <Button
                variant="plain"
                px="1"
                type="reset"
                color="blue.200"
                _hover={{ color: "blue.100", textDecoration: "underline" }}
                _focus={{
                  outline: "none",
                }}
              >
                Clear
              </Button>
            )}
          </Flex>

          <Flex gap="2"></Flex>
        </Flex>
      </form>
      <Box mt="5" mx="6">
        {flowsPageLoading ? (
          <Tables columns={column} rows={[]} loading />
        ) : filteredItems.length === 0 && filteredShopifyItems.length === 0 ? (
          <Box textAlign="center">
            <img
              src={EmptyTable}
              width="250"
              alt="No flows"
              style={{ margin: "0 auto" }}
            />
            <UiText variant="subheading">No data available</UiText>
            <UiText mb="5">Refresh the page to try again.</UiText>
          </Box>
        ) : (
          <>
            {filteredItems.length > 0 && (
              <Box mb={filteredShopifyItems.length > 0 ? "10" : "0"}>
                {filteredShopifyItems.length > 0 && (
                  <UiText variant="subheading" mb="4">
                    Standard Flows
                  </UiText>
                )}
                <Tables
                  cellPadding="3"
                  headerPadding="3"
                  columns={column}
                  rows={filteredItems}
                  pagination
                />
              </Box>
            )}

            {filteredShopifyItems.length > 0 && (
              <Box>
                <UiText variant="subheading" mb="4">
                  Shopify Flows
                </UiText>
                <Tables
                  cellPadding="3"
                  headerPadding="3"
                  columns={shopifyColumns}
                  rows={filteredShopifyItems}
                  pagination
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default FlowTable;
