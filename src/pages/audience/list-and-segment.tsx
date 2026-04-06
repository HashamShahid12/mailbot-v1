import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
// import Checkbox from "@/components/ui/check-box";
import Tables from "@/components/ui/table";
import type { ListAndSegmentType } from "@/types/user-type";
import { getSegments, syncShopifySegments } from "@/api/segments";
import ListAndSegmentForm from "@/components/ui/audiance/list-and-segment/list-and-segment-form";
import { ListAndSegmentMenu } from "../../components/ui/audiance/list-and-segment/list-and-segment-action-menu";
import EmptyTable from "../../assets/emptytable.svg";
import { UiText } from "@/components/ui/text";
import { UiBadge } from "@/components/ui/badge";
import type { UiBadgeProps } from "@/types/ui-badge-props";
import { ReusableActionBar } from "@/components/ui/action-bar";
import ListAndSegmentHeader from "@/components/ui/audiance/list-and-segment/list-and-segment-header";
import type { Column } from "@/types/table-props";
import { toaster } from "@/components/ui/toaster";
import { useShop } from "@/store/shop-store";
import { format } from "date-fns";

const ListAndSegment = () => {
  const { shop } = useShop();
  const [items, setItems] = useState<ListAndSegmentType[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // We need to store all segments to filter locally based on tabs
  const [allSegments, setAllSegments] = useState<{
    shopify_segments: any[];
    defaults_custom_segments: any[];
    archived: any[];
  }>({
    shopify_segments: [],
    defaults_custom_segments: [],
    archived: [],
  });

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => (prev.includes(id) ? [] : [id]));
  };

  const mapSegment = (s: any, type: string): ListAndSegmentType => ({
    id: s.id,
    listandsegmentname: s.name,
    listandsegmenttype: s.name === "All Subscribers" ? "default" : type,
    members: s.subscriber_count || 0,
    createdate: s.created_at,
    tags: [],
    starred: false,
    status: s.status,
    ...s,
  });

  const fetchSegments = () => {
    setLoading(true);
    getSegments()
      .then((res) => {
        if (res && res.data) {
          const shopify = res.data.shopify_segments || [];
          const custom = res.data.defaults_custom_segments || [];
          const archived = res.data.archived || [];

          setAllSegments({
            shopify_segments: shopify,
            defaults_custom_segments: custom,
            archived: archived,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSegments();
  }, []);

  const handleSyncShopify = async () => {
    setIsSyncing(true);
    try {
      await syncShopifySegments();
      toaster.create({
        title: "Success",
        description: "Shopify segments synced successfully",
        type: "success",
      });
      fetchSegments(); // Refresh list
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to sync Shopify segments",
        type: "error",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Filter items based on selectedType (Tab)
  useEffect(() => {
    let newItems: ListAndSegmentType[] = [];
    const getCustomType = (name: string) =>
      name === "All Subscribers" ? "default" : "custom";

    if (selectedType === "All Types") {
      newItems = [
        ...allSegments.shopify_segments.map((s) => mapSegment(s, "shopify")),
        ...allSegments.defaults_custom_segments.map((s) =>
          mapSegment(s, getCustomType(s.name)),
        ),
      ];
    } else if (selectedType === "Shopify") {
      newItems = allSegments.shopify_segments.map((s) =>
        mapSegment(s, "shopify"),
      );
    } else if (selectedType === "Custom") {
      newItems = allSegments.defaults_custom_segments.map((s) =>
        mapSegment(s, getCustomType(s.name)),
      );
    } else if (selectedType === "Archived") {
      newItems = allSegments.archived.map((s) => mapSegment(s, "Archived"));
    }
    setItems(newItems);
  }, [selectedType, allSegments]);

  // const isAllSelected =
  //   selectedIds.length > 0 && selectedIds.length === items.length;
  // const isIndeterminate =
  //   selectedIds.length > 0 && selectedIds.length < items.length;

  // const toggleSelectAll = (checked: boolean | string) => {
  //   setSelectedIds(checked ? items.map((item) => item.id) : []);
  // };

  // const toggleSelectRow = (id: string, checked: boolean | string) => {
  //   setSelectedIds((prev) =>
  //     checked ? [...prev, id] : prev.filter((existingId) => existingId !== id),
  //   );
  // };

  const filteredItems = items; // Search/Tags are hidden/removed as per request

  const columns = [
    {
      header: "",
      key: "listandsegmentarrow",
      width: "2%",
      cell: (row: ListAndSegmentType) => {
        // Only show expand for Shopify segments if needed, or keep generic
        return null; // Simplified for now as per "show them" request, logic was specific to "Segment" type string
      },
    },
    {
      header: "Name",
      key: "listandsegmentname",
      width: "22%",
      cell: (row: ListAndSegmentType) => {
        const name = row.listandsegmentname;
        const isSegment = row.listandsegmenttype !== "List";
        const label = isSegment
          ? isNaN(Number(name))
            ? name
            : `Engaged (${name} Days)`
          : `${name} List`;

        return (
          <Box
            as="span"
            color="blue.200"
            cursor="pointer"
            _hover={{
              color: "blue.100",
              textDecoration: "underline",
            }}
          >
            {label}
          </Box>
        );
      },
    },
    { header: "Type", key: "listandsegmenttype", width: "15%" },
    {
      header: "Members",
      key: "members",
      width: "10%",
      cell: (row: ListAndSegmentType) => row.members ?? 0,
    },
    {
      header: "Status",
      key: "status",
      width: "10%",
      cell: (row: ListAndSegmentType) => {
        if (row.listandsegmenttype === "default") {
          return <UiBadge status="success">Active</UiBadge>;
        }

        let badgeStatus: UiBadgeProps["status"] = "plain";
        let displayStatus = row.status;

        if (row.listandsegmenttype === "shopify") {
          const shopifyStatus = shop?.shopify_segments_synced_status;

          if (shopifyStatus) {
            const normalizedShopifyStatus = shopifyStatus.toLowerCase();

            if (normalizedShopifyStatus === "completed") {
              displayStatus = "Synced";
              badgeStatus = "success";
            } else if (normalizedShopifyStatus === "processing") {
              displayStatus = "Processing";
              badgeStatus = "pending";
            } else if (normalizedShopifyStatus === "failed") {
              displayStatus = "Failed";
              badgeStatus = "error";
            } else {
              displayStatus =
                displayStatus ??
                shopifyStatus.charAt(0).toUpperCase() +
                  shopifyStatus.slice(1).toLowerCase();
            }
          }
        }

        if (displayStatus) {
          const normalizedStatus = displayStatus.toLowerCase();

          if (normalizedStatus === "synced" || normalizedStatus === "active") {
            badgeStatus = "success";
          } else if (normalizedStatus === "processing") {
            badgeStatus = "pending";
          }
        }

        if (!displayStatus) return null;

        return <UiBadge status={badgeStatus}>{displayStatus}</UiBadge>;
      },
    },
    {
      header: "Created",
      key: "createdate",
      width: "22%",
      cell: (row: ListAndSegmentType) => {
        const date = new Date(row.createdate);
        return !isNaN(date.getTime())
          ? format(date, "MMM d 'at' h:mm a")
          : row.createdate || "-";
      },
    },
    {
      header: "",
      key: "actions",
      width: "5%",
      cell: (row: ListAndSegmentType) => (
        <ListAndSegmentMenu listandsegment={row} />
      ),
    },
  ].filter(Boolean) as Column[];

  return (
    <Box bg="white">
      <ListAndSegmentHeader />
      <ListAndSegmentForm
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSyncShopify={handleSyncShopify}
        isSyncing={isSyncing}
      />

      <Box pt="2" px="2" _dark={{ bg: "gray.900" }}>
        {loading ? null : filteredItems.length === 0 ? (
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
          <Tables
            columns={columns}
            rows={filteredItems}
            pagination
            headerPadding="2"
            cellPadding="2"
            expandedRows={expandedRows}
            onToggleExpand={toggleRowExpansion}
          />
        )}
        <ReusableActionBar
          itemCount={selectedIds.length}
          checked={selectedIds.length > 0}
          onReset={() => setSelectedIds([])}
          onAdd={() => console.log("Add tags:", selectedIds)}
          onRemove={() => console.log("Remove tags:", selectedIds)}
          onDelete={() => {
            console.log("Delete:", selectedIds);
            setSelectedIds([]);
          }}
        />
      </Box>
    </Box>
  );
};

export default ListAndSegment;
