import { useState } from "react";
import { Box, Link, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PrimitiveDialog } from "@/components/ui/dailog-model";
import Tables from "@/components/ui/table";
import { mockAnalyticsDashboards } from "@/api/mock/dashboard-mock";
import { UiText } from "@/components/ui/text";
import { FormField } from "@/components/ui";

type Dashboard = {
  id: string;
  name: string;
  created: Date;
  updated: Date;
};

const dashboardTableColumns = [
  {
    header: "Name",
    key: "name",
    width: "50%",
    render: (row: any) => (
      <Flex justify="space-between" align="center">
        <Link color="blue.500">{row.name}</Link>
        <Flex
          gap={2}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.2s ease"
        >
          <Button size="sm" variant="outline">
            Print to PDF
          </Button>
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm" colorScheme="red">
            Delete
          </Button>
        </Flex>
      </Flex>
    ),
  },
  { header: "Created", key: "created", width: "25%" },
  { header: "Updated", key: "updated", width: "25%" },
];

export default function AnalyticsDashboards() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ dashboardName: string }>();

  const allDashboards = [
    ...mockAnalyticsDashboards.map((item) => ({
      name: item.name + (item.viewOnly ? " (View only)" : ""),
      created: new Date(item.created).toLocaleString(),
      updated: new Date(item.updated).toLocaleString(),
    })),
    ...dashboards.map((item) => ({
      name: item.name,
      created: item.created.toLocaleString(),
      updated: item.updated.toLocaleString(),
    })),
  ];

  const onSubmit = ({ dashboardName }: { dashboardName: string }) => {
    const now = new Date();
    const newDashboard: Dashboard = {
      id: crypto.randomUUID(),
      name: dashboardName.trim(),
      created: now,
      updated: now,
    };

    setDashboards((prev) => [...prev, newDashboard]);
    reset(); // clear input
    navigate(`/analytics/dashboards/${newDashboard.id}`);
  };

  return (
    <>
      <Box padding="16px 24px" borderBottom="1px solid rgb(221, 224, 224)">
        <Flex justifyContent="space-between" alignItems="center">
          <UiText fontSize="2xl">Dashboards</UiText>
          <PrimitiveDialog
            contentPadding="1rem"
            footerPadding="1rem 0 0 0"
            title="Create Dashboard"
            trigger={
              <Button
                p="4"
                bg="black"
                borderRadius="md"
                fontWeight="medium"
                _dark={{ color: "gray.900", bg: "white" }}
              >
                Create Dashboard
              </Button>
            }
            footer={
              <>
                <Button p="4" variant="ghost" borderRadius="md">
                  Cancel
                </Button>
                <Button
                  p="4"
                  colorScheme="blue"
                  borderRadius="md"
                  fontWeight="medium"
                  ml={2}
                  onClick={handleSubmit(onSubmit)}
                >
                  Create
                </Button>
              </>
            }
          >
            <form>
              <FormField
                name="dashboardName"
                placeholder="Enter dashboard name"
                required
                input
                register={register("dashboardName", {
                  required: "Dashboard name is required",
                })}
                error={errors.dashboardName}
              />
            </form>
          </PrimitiveDialog>
        </Flex>
      </Box>

      <Box padding="0px 16px">
        <Tables columns={dashboardTableColumns} rows={allDashboards} />
      </Box>
    </>
  );
}
