import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  VStack,
  Switch,
  Button,
} from "@chakra-ui/react";
import { Settings2, CircleHelp } from "lucide-react";
import Tables from "@/components/ui/table";
import type { CampaignTable } from "@/types/user-type";
import { useEffect, useState } from "react";
import { PopoverMenu } from "@/components/ui";
import { CampaignActionsMenu } from "@/components/ui/campaign/campaign-actions-menu";
import { ReusableActionBar } from "@/components/ui/action-bar";
import { AlertBanner } from "@/components/ui/alert-banner";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { DateRangeDropdown } from "@/components/ui/campaign-dropdown/date-range-dropdown";
import { useCampaignStore } from "@/store/useCampaignStore";
import { getCampaigns } from "@/api/campaigns";
import { useNavigate } from "react-router-dom";
import type { CampaignBackend } from "@/types/campaign-backend-types";
import EmptyBox from "@/components/ui/empty-box";
import { StatusDropdown } from "@/components/ui/dropdown/status-dropdown";
import { CampaignDrawer } from "@/components/ui/campaign";

const campaignStatusOptions = [
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "Completed",
    value: "Completed",
  },
  {
    label: "Processing",
    value: "Processing",
  },
  {
    label: "Scheduled",
    value: "scheduled",
  },
  {
    label: "Draft",
    value: "draft",
  },
];

const mapBackendToCampaignTable = (backend: CampaignBackend): CampaignTable => {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  let status = capitalize(backend.status);

  // if (status === "Sent" || backend.campaign_sent) {
  //   status = "Completed";
  // }

  return {
    id: backend.id,
    template_image: backend.template_image,
    name: backend.title,
    type: "email",
    status: status,
    bounce: backend.bounce,
    clicked: backend.click,
    revenue: backend.revenue,
    opened: backend.open,
    lastUpdate: backend.updated_at,
  };
};

const initialColumnSettings = {
  name: true,
  type: false,
  status: true,
  clicked: true,
  clickRate: true,
  bounce: true,
  opened: true,
  revenue: true,
  lastUpdate: true,
  templateImage: true,
};

type Column<T = any> = {
  header: React.ReactNode;
  key: string;
  width: string;
  isNumeric?: boolean;
  cell?: (row: T) => React.ReactNode;
};

export const Campaigns = () => {
  const [items, setItems] = useState<CampaignTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [columnsSettings, setColumnsSettings] = useState(initialColumnSettings);
  const [visible, setVisible] = useState(true);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectRange, setSelectRange] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);

  const handleToggle = (key: keyof typeof columnsSettings) => {
    setColumnsSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const { campaigns } = useCampaignStore();
  const [pageInfo, setPageInfo] = useState<{
    lastCursor: string;
    hasNext: boolean;
  }>({
    lastCursor: "",
    hasNext: false,
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const loadCampaigns = async () => {
      setIsLoading(true);
      try {
        console.log("[Campaigns] Fetching campaigns from backend.");
        const res = await getCampaigns();
        const backendList = res.data?.campaigns?.list ?? [];
        const backendItems = backendList.map(mapBackendToCampaignTable);
        const info = res.data?.campaigns?.pageInfo ?? {
          lastCursor: "",
          hasNext: false,
        };
        console.log("[Campaigns] Backend campaigns loaded.", {
          count: backendItems.length,
          pageInfo: info,
        });
        setItems([...backendItems, ...campaigns]);
        setPageInfo(info);
      } catch (error) {
        console.error("[Campaigns] Backend fetch failed.", error);
        // Fallback to empty list or handle error UI if needed
        setItems([...campaigns]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCampaigns();
  }, [campaigns]);

  const loadMore = async () => {
    if (!pageInfo.hasNext || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      console.log("[Campaigns] Loading more campaigns...", {
        cursor: pageInfo.lastCursor,
      });
      const res = await getCampaigns(undefined, pageInfo.lastCursor);
      const newBackendList = res.data?.campaigns?.list ?? [];
      const newItems = newBackendList.map(mapBackendToCampaignTable);
      const newInfo = res.data?.campaigns?.pageInfo ?? {
        lastCursor: "",
        hasNext: false,
      };

      setItems((prev) => [...prev, ...newItems]);
      setPageInfo(newInfo);
    } catch (err) {
      console.error("Failed to load more campaigns", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const columns = [
    columnsSettings.templateImage
      ? { header: "Template Image", key: "template_image", width: "10%" }
      : null,
    columnsSettings.name ? { header: "Name", key: "name", width: "30%" } : null,
    columnsSettings.type ? { header: "Type", key: "type", width: "10%" } : null,
    columnsSettings.status
      ? { header: "Status", key: "status", width: "10%" }
      : null,

    columnsSettings.clicked
      ? { header: "Clicked", key: "clicked", width: "10%", isNumeric: true }
      : null,
    columnsSettings.bounce
      ? {
          header: "bounce",
          key: "bounce",
          width: "10%",
          isNumeric: true,
        }
      : null,
    columnsSettings.revenue
      ? {
          header: "Revenue",
          key: "revenue",
          width: "10%",
          isNumeric: true,
        }
      : null,
    columnsSettings.opened
      ? {
          header: "Opened",
          key: "opened",
          width: "10%",
          isNumeric: true,
        }
      : null,
    columnsSettings.lastUpdate
      ? {
          header: "Last updated",
          key: "lastUpdate",
          width: "10%",
          cell: (row: CampaignTable) => {
            const date = new Date(row.lastUpdate);
            return !isNaN(date.getTime())
              ? format(date, "MMM d 'at' h:mm a")
              : row.lastUpdate || "-";
          },
        }
      : null,
    {
      header: "",
      key: "actions",
      width: "5%",
      cell: (row: CampaignTable) => <CampaignActionsMenu campaign={row} />,
    },
  ].filter(Boolean) as Column[];

  const filteredItems = items.filter((item) => {
    console.log(item.status, "ittmmmmmmmmmm");

    const statusMatch = selectedStatus ? item.status === selectedStatus : true;

    return statusMatch;
  });

  return (
    <Box p="5">
      <Flex px="2" justifyContent="space-between" alignItems="center" py="16px">
        <Text fontSize="2xl" fontWeight="medium">
          Campaigns
        </Text>
        <HStack>
          {/* <SegmentGroup.Root defaultValue="React" width="5">
            <SegmentGroup.Indicator />
            <SegmentGroup.Items
              items={toggleItems.map(({ label, icon, value, width }) => ({
                value,
                label: (
                  <Flex align="center" gap="2" w={width} p=".5rem">
                    {icon}
                    {label}
                  </Flex>
                ),
              }))}
              height="2.55rem"
            />
          </SegmentGroup.Root> */}
          <Button
            p="4"
            bg="black"
            borderRadius="md"
            fontWeight="medium"
            // onClick={() => navigate("/new-campaign?new=true")}
            onClick={() => setDrawerOpen(true)}
            _dark={{ color: "gray.900", bg: "white" }}
          >
            Create campaign
          </Button>

          <CampaignDrawer
            open={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
        </HStack>
      </Flex>

      {/* Filters */}
      <Flex justifyContent="space-between">
        <Flex gap={2} mb={4} wrap="wrap" px="3">
          {/* <SearchBar placeholder="Search campaigns" w="17rem" /> */}

          {/* <FlexibleDropdown label="Last 30 days" buttonWidth="140px" buttonHeight="30px" /> */}
          <DateRangeDropdown
            range={selectedDateRange}
            selectRange={selectRange}
            setSelectRange={setSelectRange}
            onChange={(range) => {
              setSelectedDateRange(range);
            }}
          />

          <StatusDropdown
            options={campaignStatusOptions}
            menuWidth="fit"
            selected={selectedStatus}
            onChange={setSelectedStatus}
          />
          {selectedStatus && (
            <Button
              variant="plain"
              px="1"
              type="reset"
              onClick={() => setSelectedStatus(null)}
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
        <Box>
          <PopoverMenu
            contentProps={{ minW: "300px", padding: "4" }}
            placement="bottom-end"
            trigger={
              <IconButton
                aria-label="Settings"
                background="none"
                _hover={{ bg: "gray.400" }}
              >
                <Settings2 color="black" />
              </IconButton>
            }
          >
            <Text fontSize="sm" mb={2} fontWeight="medium">
              Customize columns
            </Text>
            <VStack align="stretch">
              {Object.entries(columnsSettings).map(([key, value]) => (
                <Flex key={key} justify="space-between" align="center">
                  <Text fontSize="sm">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </Text>
                  <Switch.Root
                    checked={value}
                    onCheckedChange={() =>
                      handleToggle(key as keyof typeof columnsSettings)
                    }
                  >
                    <Switch.HiddenInput />
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                  </Switch.Root>
                </Flex>
              ))}
            </VStack>
          </PopoverMenu>
        </Box>
      </Flex>

      {isLoading ? (
        <Tables columns={columns} rows={[]} loading={true} />
      ) : items.length === 0 ? (
        <EmptyBox
          title=""
          subTitle="Create a campaign"
          description="Send a one-time targeted message to a select group of customers. Use campaigns for sales, promotions, and exclusive deals. Then, track your data here."
          buttonLabel="Create Campaign"
          onButtonClick={() => navigate("/new-campaign?new=true")}
        />
      ) : (
        <Tables
          pagination={pageInfo.hasNext}
          columns={columns}
          rows={filteredItems}
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
      {visible && (
        <AlertBanner
          type="info"
          message="This list shows campaigns from the last 30 days. Scheduled and draft campaigns are always displayed, regardless of date."
          showClose={false}
          align="right"
          rightIcon={<CircleHelp />}
          onClose={() => setVisible(false)}
        />
      )}
    </Box>
  );
};
