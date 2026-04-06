import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Menu,
  Stack,
  Table,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { UiText } from "../text";
import UiBox from "../box";
import UiButton from "../button";
import Tables from "../table";
import { UiSelect } from "../select";
import { ArrowUp, ChevronDown, EllipsisVertical, Search } from "lucide-react";
import EmptyState from "../empty-state";

type AccountRow = {
  id: string;
  displayName: string;
  email: string;
  role: "Owner" | "Content Creator";
  lastActive: string;
};

const ACCOUNT_ROWS: AccountRow[] = [
  {
    id: "1",
    displayName: "nomanaslam1696@gmail.com",
    email: "",
    role: "Owner",
    lastActive: "February 26, 2026 at 11:38 AM",
  },
  {
    id: "2",
    displayName: "Nouman adex",
    email: "nouman.aslam@adex360.com",
    role: "Content Creator",
    lastActive: "April 21, 2025 at 2:41 PM",
  },
];

type RoleRow = {
  id: string;
  name: string;
  date: string;
};

const ROLE_ROWS: RoleRow[] = [
  {
    id: "role-1",
    name: "DD",
    date: "Feb 26, 2026, 2:39 PM",
  },
];

const AccountUsersSettings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [roleSearchTerm, setRoleSearchTerm] = useState("");

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return ACCOUNT_ROWS.filter((row) => {
      const matchSearch =
        term === "" ||
        row.displayName.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term);

      const matchRole = selectedRole === "all" || row.role === selectedRole;

      return matchSearch && matchRole;
    });
  }, [searchTerm, selectedRole]);

  const filteredRoleRows = useMemo(() => {
    const term = roleSearchTerm.trim().toLowerCase();
    if (!term) return ROLE_ROWS;

    return ROLE_ROWS.filter((row) => row.name.toLowerCase().includes(term));
  }, [roleSearchTerm]);

  const columns = useMemo(
    () => [
      {
        header: "Name",
        key: "account",
        cell: (row: AccountRow) => (
          <Stack gap="0">
            <UiText color="blue.200">{row.displayName}</UiText>
            {row.email ? <UiText variant="caption">{row.email}</UiText> : null}
          </Stack>
        ),
      },
      {
        header: (
          <HStack gap={1}>
            <UiText variant="caption">Role</UiText>
            <ArrowUp size={14} />
          </HStack>
        ),
        key: "role",
      },
      {
        header: "Last active",
        key: "lastActive",
      },
      {
        header: <VisuallyHidden>Actions</VisuallyHidden>,
        key: "actions",
        width: "56px",
        cell: () => (
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                variant="outline"
                size="sm"
                minW="0"
                w="9"
                h="9"
                p="0"
                border="sm"
                borderColor="blackAlpha.100"
              >
                <EllipsisVertical size={16} />
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="edit-user">Edit user</Menu.Item>
                <Menu.Item value="remove-user">Remove user</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        ),
      },
    ],
    [],
  );

  return (
    <Stack maxW={"720px"} gap={4}>
      <Box>
        <UiText variant="heading2">Organization</UiText>
      </Box>

      <UiBox heading="Custom user roles" showLayout>
        <Stack gap={2}>
          <UiText variant="body">
            Create and manage tailored roles with the exact permissions your
            team needs.
          </UiText>
          <UiButton alignSelf="start" uiVariant="outline">
            Create
          </UiButton>
        </Stack>
      </UiBox>

      <UiBox
        showLayout
        heading="Account"
        description="For security reasons, invitation links will expire after 24 hours."
        actions={<UiButton uiVariant="solid">Add new user</UiButton>}
      >
        <Stack gap={3}>
          <HStack gap={2}>
            <Box
              position="relative"
              w={{ base: "full", md: "xs" }}
              display="flex"
              alignItems="center"
              border="sm"
              bg="white"
              borderColor="blackAlpha.100"
              borderRadius="md"
              _hover={{ borderColor: "blue.200" }}
              _focusWithin={{
                borderColor: "blue.200",
                outline: "4px solid",
                outlineColor: "blue.600",
              }}
            >
              <Box position="absolute" left="10px" pointerEvents="none">
                <Search width="16" />
              </Box>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                border="none"
                outline="none"
                pl="2.2rem"
                placeholder="Search users..."
              />
            </Box>

            <Box minW="2xs">
              <UiSelect
                width="full"
                placeholder="Role"
                selectedItem={selectedRole}
                onChange={setSelectedRole}
                items={[
                  { label: "Role", value: "all" },
                  { label: "Owner", value: "Owner" },
                  { label: "Content Creator", value: "Content Creator" },
                ]}
              />
            </Box>
          </HStack>

          <Tables
            columns={columns}
            rows={filteredRows}
            headerPadding="3"
            cellPadding="3"
            rowpadding="2"
            defaultPageSize={10}
          />
        </Stack>
      </UiBox>
      <UiBox
        showLayout
        heading="Roles"
        description="Created roles will be listed here"
        actions={<UiButton uiVariant="solid">Add</UiButton>}
      >
        {ROLE_ROWS.length > 0 ? (
          <Stack gap={3}>
            <HStack>
              <Box
                position="relative"
                w={{ base: "full", md: "xs" }}
                display="flex"
                alignItems="center"
                border="sm"
                bg="white"
                borderColor="blackAlpha.100"
                borderRadius="md"
                _hover={{ borderColor: "blue.200" }}
                _focusWithin={{
                  borderColor: "blue.200",
                  outline: "4px solid",
                  outlineColor: "blue.600",
                }}
              >
                <Box position="absolute" left="10px" pointerEvents="none">
                  <Search width="16" />
                </Box>
                <Input
                  value={roleSearchTerm}
                  onChange={(e) => setRoleSearchTerm(e.target.value)}
                  border="none"
                  outline="none"
                  pl="2.2rem"
                  placeholder="Search..."
                />
              </Box>

              <Button
                variant="ghost"
                color="blue.200"
                onClick={() => setRoleSearchTerm("")}
                disabled={roleSearchTerm.trim() === ""}
              >
                Clear
              </Button>
            </HStack>

            <Table.Root variant="line" size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Date</Table.ColumnHeader>
                  <Table.ColumnHeader />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredRoleRows.map((row) => (
                  <Table.Row key={row.id}>
                    <Table.Cell>
                      <HStack gap={3}>
                        <ChevronDown size={16} />
                        <UiText>{row.name}</UiText>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell>
                      <UiText>{row.date}</UiText>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Flex justify="end">
                        <Menu.Root>
                          <Menu.Trigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              minW="0"
                              w="9"
                              h="9"
                              p="0"
                              border="sm"
                              borderColor="blackAlpha.100"
                            >
                              <EllipsisVertical size={16} />
                            </Button>
                          </Menu.Trigger>
                          <Menu.Positioner>
                            <Menu.Content>
                              <Menu.Item value="edit-role">Edit role</Menu.Item>
                              <Menu.Item value="delete-role">
                                Delete role
                              </Menu.Item>
                            </Menu.Content>
                          </Menu.Positioner>
                        </Menu.Root>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>

            <HStack justify="space-between" w="full" pt={1}>
              <Button
                size="sm"
                variant="outline"
                border="sm"
                borderColor="gray.300"
                px="3"
              >
                Show 10
                <ChevronDown size={16} />
              </Button>
              <UiText variant="body">
                {filteredRoleRows.length === 0
                  ? "0 - 0 of 0"
                  : `1 - ${filteredRoleRows.length} of ${filteredRoleRows.length}`}
              </UiText>
              <Box w="84px" />
            </HStack>
          </Stack>
        ) : (
          <EmptyState
            title="No roles available"
            description="Create your first role"
          />
        )}
      </UiBox>
    </Stack>
  );
};

export default AccountUsersSettings;
