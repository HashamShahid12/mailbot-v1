import { UiText } from "@/components/ui/text";
import {
  Box,
  Flex,
  Stack,
  IconButton,
  Collapsible,
  Table,
  Button,
  Link,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import FormField from "@/components/ui/input";
import UiButton from "@/components/ui/button";
import { UiBadge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  registerDomain,
  updateSenderName,
  refreshDomainStatus,
} from "@/api/shop";
import { useShopStore } from "@/store/shop-store";
import { toaster } from "@/components/ui/toaster";
import { verifyDomainStatus } from "./domain-statuses";
import Tables from "@/components/ui/table";
import type { Column } from "@/types/table-props";
// import { Column } from "@/components/ui/table";

const isInvalidEmail = (email: string) => {
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateDomain = (domain: string) => {
  return /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(
    domain,
  );
};

// Reusable Collapsible Section Component
const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Box borderBottom="1px solid" borderColor="gray.100">
        <Collapsible.Trigger asChild>
          <Flex
            align="center"
            justify="space-between"
            py="4"
            px="4"
            bg="gray.50"
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
          >
            <UiText fontWeight="semibold" fontSize="sm">
              {title}
            </UiText>
            <IconButton
              aria-label={open ? "Collapse" : "Expand"}
              icon={open ? <FiChevronUp /> : <FiChevronDown />}
              variant="ghost"
              size="sm"
              rounded="full"
              pointerEvents="none"
            />
          </Flex>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Box p="4" bg="white">
            {children}
          </Box>
        </Collapsible.Content>
      </Box>
    </Collapsible.Root>
  );
};

const DNS_PROVIDERS = [
  {
    name: "GoDaddy",
    url: "https://ph.godaddy.com/help/add-a-cname-record-19236",
    text: "Add a CNAME record",
  },
  {
    name: "DreamHost",
    url: "https://help.dreamhost.com/hc/en-us/articles/360035516812-Adding-custom-DNS-records",
    text: "How do I add custom DNS records?",
  },
  {
    name: "Cloudflare",
    url: "https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records",
    text: "Managing DNS records in Cloudflare",
  },
  {
    name: "HostGator",
    url: "https://www.hostgator.com/help/article/manage-dns-records-with-hostgatorenom",
    text: "Manage DNS Records with HostGator/eNom",
  },
  {
    name: "Namecheap",
    url: "https://www.namecheap.com/support/knowledgebase/article.aspx/317/2237/how-do-i-add-txtspfdkimdmarc-records-for-my-domain/",
    text: "How do I add TXT/SPF/DKIM/DMARC records for my domain?",
  },
  {
    name: "Names.co.uk",
    url: "https://www.names.co.uk/support/articles/changing-your-domains-dns-settings/",
    text: "Changing your domains DNS Settings",
  },
  {
    name: "Wix",
    url: "https://support.wix.com/en/article/adding-or-updating-cname-records-in-your-wix-account",
    text: "Adding or Updating CNAME Records in Your Wix Account",
  },
];

const DnsRecordsTable = ({
  records,
  onVerify,
}: {
  records: any[];
  onVerify?: () => void;
}) => {
  if (!records || records.length === 0) return null;

  return (
    <Box mt="4">
      <UiText fontSize="sm" fontWeight="semibold" mb="2">
        DNS Records
      </UiText>
      <UiText fontSize="xs" color="gray.500" mb="3">
        Add these records to your domain's DNS settings to verify ownership.
      </UiText>
      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        overflow="hidden"
      >
        <Table.Root size="sm" variant="outline" striped>
          <Table.Header>
            <Table.Row bg="gray.50">
              <Table.ColumnHeader>Type</Table.ColumnHeader>
              <Table.ColumnHeader>Host</Table.ColumnHeader>
              <Table.ColumnHeader>Value</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {records.map((record, index) => (
              <Table.Row key={index}>
                <Table.Cell fontWeight="medium">{record.type}</Table.Cell>
                <Table.Cell fontFamily="mono" fontSize="xs">
                  {record.host}
                </Table.Cell>
                <Table.Cell
                  fontFamily="mono"
                  fontSize="xs"
                  maxW="200px"
                  truncate
                >
                  {record.value}
                </Table.Cell>
                <Table.Cell>
                  <UiBadge
                    status={
                      record.status === "Verified" ||
                      record.status === "Success" ||
                      record.status === "SUCCESS"
                        ? "success"
                        : "pending"
                    }
                  >
                    {record.status}
                  </UiBadge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <Flex justify="flex-end" mt="4">
        <UiButton uiVariant="outline" size="sm" onClick={onVerify}>
          Verify Records
        </UiButton>
      </Flex>
    </Box>
  );
};

const Domain = () => {
  const { shop, updateShop } = useShopStore();
  const { shop_settings } = shop || {};
  const { domain_status, email_status, subdomain_status } = shop_settings || {};

  const [isRefreshBtnDisabled, setIsRefreshBtnDisabled] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(true);
  const [disabledReason, setDisabledReason] = useState("");
  const [registrationKeys, setRegistrationKeys] = useState({
    domainDKIM: [],
    subdomainDKIM: [],
  });
  const [domainSettings, setDomainSettings] = useState({
    email: "",
    reply_to_email: "",
    domain: "",
    subdomain: "",
    senderName: "",
  });

  const [domainSettingErrors, setDomainSettingErrors] = useState({
    email: "",
    reply_to_email: "",
    domain: "",
    subdomain: "",
    senderName: "",
  });

  const [fieldSettings, setFieldSettings] = useState({
    email: { disabled: true, connectedRight: undefined },
    subdomain: { disabled: true, connectedRight: undefined },
    domain: { disabled: true, connectedRight: undefined },
    reply_to_email: { disabled: true, connectedRight: undefined },
    senderName: { disabled: true, connectedRight: undefined },
  });

  const [disabledFields, setDisabledFields] = useState({
    senderName: true,
  });

  const validateFormData = (key, value, prev) => {
    if (value === prev) {
      setDisabledFields((previous) => {
        return {
          ...previous,
          [key]: true,
        };
      });
    } else if (value !== prev) {
      setDisabledFields((previous) => {
        return {
          ...previous,
          [key]: false,
        };
      });
    } else if (value === null || prev === null || value === "" || prev === "") {
      setDisabledFields((previous) => {
        return {
          ...previous,
          [key]: true,
        };
      });
    }
  };

  const handleInputChange = (
    key: keyof typeof domainSettings,
    value: string,
  ) => {
    validateFormData(key, value, shop?.shop_settings?.sender_name);

    setDomainSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (value) {
      let errorText = "";
      if (key === "email" || key === "reply_to_email") {
        const isInvalid = isInvalidEmail(value);
        if (isInvalid) errorText = "Please enter valid email";
        if (!isInvalid && key === "reply_to_email") setIsAddBtnDisabled(false);
      } else if (key === "domain" || key === "subdomain") {
        const isValid = validateDomain(value);
        if (!isValid) errorText = `Please enter valid ${key}`;
      } else {
        errorText = "";
      }

      setDomainSettingErrors((prev) => {
        return {
          ...prev,
          [key]: errorText,
        };
      });
    }
  };

  const checkErrorsOnBlur = (key: keyof typeof domainSettings) => {
    if (!domainSettings[key]) {
      setDomainSettingErrors((prev) => {
        return {
          ...prev,
          [key]: "Field is required",
        };
      });
    }
  };

  const checkAddBtn = (btnType: "add" | "refresh") => {
    if (!shop?.shop_settings) return false;

    const { domain_status, email_status, subdomain_status } =
      shop.shop_settings;

    if (btnType === "add") {
      return [domain_status, email_status, subdomain_status].some((status) => {
        const s = status?.toLowerCase();
        if (s === "notstarted" || s === "not_started" || !s) return true;
        return false;
      });
    }

    if (btnType === "refresh") {
      return [domain_status, email_status, subdomain_status].some((status) => {
        const s = status?.toLowerCase();
        if (s === "pending") return true;
        return false;
      });
    }
    return false;
  };

  const checkIfAddBtnIsClickAble = () => {
    const settingKeys = Object.keys(domainSettings);
    const keys = ["email_status", "domain_status", "subdomain_status"];
    let all_valid_fields = true;
    let has_error = false;
    let all_status_success = false;

    if (shop?.shop_settings) {
      all_status_success = keys.every(
        (key) =>
          verifyDomainStatus.isSuccess(shop?.shop_settings[key]) ||
          verifyDomainStatus.isPending(shop?.shop_settings[key]),
      );
    }

    for (const key of settingKeys) {
      if (domainSettingErrors[key]) {
        has_error = true;
      }

      if (!domainSettings[key]) {
        all_valid_fields = false;
      }
    }

    if (!(all_valid_fields && !has_error && !all_status_success)) {
      setIsAddBtnDisabled(true);
      let reason = "";
      if (!all_valid_fields) {
        reason = "Please fill in all fields";
      } else if (has_error) {
        reason = "Please fix errors in the form";
      } else if (all_status_success) {
        reason = "All domains are already verified or pending";
      }
      setDisabledReason(reason);
    } else {
      setIsAddBtnDisabled(false);
      setDisabledReason("");
    }

    if (shop?.shop_settings) {
      const { email_status, domain_status, subdomain_status } =
        shop.shop_settings;

      // btn will not be disabled only when any oof the status is in pending state
      const statuses = [email_status, domain_status, subdomain_status];
      const settingKeysForRefresh = ["email", "domain", "subdomain"];

      const is_any_pending = statuses.some((status) =>
        verifyDomainStatus.isPending(status),
      );

      const all_has_values = settingKeysForRefresh.every(
        (key) => !!domainSettings[key],
      );

      if (is_any_pending && all_has_values) {
        setIsRefreshBtnDisabled(false);
      } else {
        setIsRefreshBtnDisabled(true);
      }
    }
  };

  const getFulfilledSettings = () => {
    const arr = [domain_status, email_status, subdomain_status];
    let i = 0;
    // if (!opt_in_show) {
    //   ++i;
    // }
    arr.forEach((ar) => {
      if (ar === "SUCCESS") {
        ++i;
      }
    });
    return i;
  };
  const getIconStatus = (key: keyof typeof fieldSettings) => {
    if (!shop?.shop_settings) return undefined;

    const { domain_status, email_status, subdomain_status } =
      shop.shop_settings;
    let status = domain_status;

    if (key === "email") {
      status = email_status;
    } else if (key === "domain") {
      status = domain_status;
    } else if (key === "subdomain") {
      status = subdomain_status;
    }

    if (verifyDomainStatus.isPending(status)) {
      return <UiBadge status="alert">Pending</UiBadge>;
    }

    if (
      verifyDomainStatus.isFailed(status) ||
      verifyDomainStatus.isTemporaryFailed(status) ||
      verifyDomainStatus.isAlreadyExists(status)
    )
      return <UiBadge status="error">Error</UiBadge>;

    if (verifyDomainStatus.isSuccess(status))
      return <UiBadge status="success">Success</UiBadge>;

    return undefined;
  };

  const handleRefreshStatus = async () => {
    try {
      setRefreshLoading(true);
      const resp = await refreshDomainStatus();
      if (resp.success) {
        const data = resp.data as any;
        const { shop: newShop } = data;
        updateShop(newShop);
        toaster.create({
          title: "Success",
          description: "Domain status refreshed",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      toaster.create({
        title: "Error",
        description: "Failed to refresh status",
        type: "error",
      });
    } finally {
      setRefreshLoading(false);
    }
  };

  const handleUpdateSender = async () => {
    try {
      await updateSenderName({ sender_name: domainSettings.senderName });
      toaster.create({
        title: "Updated!",
        description: "Sender name updated successfully",
        type: "success",
      });
    } catch (error) {
      console.error("[ShopAPI] Update sender name request failed:", error);
    }
  };

  const handleAddDomain = async () => {
    try {
      setBtnLoading(true);
      const resp = await registerDomain({
        domain: domainSettings.domain,
        email: domainSettings.email,
        subdomain: domainSettings.subdomain,
        reply_to_email: domainSettings.reply_to_email,
      });
      const data = await resp.json();
      console.log(data);
      toaster.create({
        title: "Updated!",
        description: "Domain registered successfully",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Register domain failed",
        description: "Please check your domain and email address",
        type: "error",
      });
      console.error("[ShopAPI] Register domain request failed:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    setDisabledFields({
      senderName: true,
    });
    if (shop?.shop_settings) {
      const {
        email,
        subdomain,
        domain,
        reply_to_email,
        email_status,
        domain_status,
        subdomain_status,
        registration_keys,
        sender_name,
      } = shop.shop_settings;

      setDomainSettings({
        email,
        domain,
        reply_to_email,
        subdomain:
          domain && subdomain && !subdomain.endsWith(domain)
            ? subdomain + `.${domain}`
            : subdomain || "",
        senderName: sender_name,
      });

      setFieldSettings({
        domain: {
          connectedRight: getIconStatus("domain"),
          disabled:
            verifyDomainStatus.isSuccess(domain_status) ||
            shop?.plan?.type === "free",
        },
        email: {
          connectedRight: getIconStatus("email"),
          disabled:
            verifyDomainStatus.isSuccess(email_status) ||
            shop?.plan?.type === "free",
        },
        reply_to_email: {
          connectedRight: getIconStatus("reply_to_email"),
          disabled:
            verifyDomainStatus.isSuccess(email_status) ||
            shop?.plan?.type === "free",
        },
        subdomain: {
          connectedRight: getIconStatus("subdomain"),
          disabled:
            verifyDomainStatus.isSuccess(subdomain_status) ||
            shop?.plan?.type === "free",
        },
        senderName: {
          connectedRight: "",
          disabled: "",
        },
      });

      let keys = registration_keys;
      if (registration_keys) {
        if (typeof keys === "string") {
          keys = JSON.parse(keys);
        }
        setRegistrationKeys(keys);
      }
    }
  }, [shop]);

  useEffect(() => {
    checkIfAddBtnIsClickAble();
  }, [domainSettingErrors, domainSettings, shop]);

  const cnameColumns: Column[] = [
    {
      header: "DNS/Hosting provider",
      key: "name",
      width: "30%",
      cell: (row: any) => (
        <UiText fontWeight="medium" fontSize="sm">
          {row.name}
        </UiText>
      ),
    },
    {
      header: "Documentation link",
      key: "url",
      cell: (row: any) => (
        <Link
          href={row.url}
          target="_blank"
          color="blue.700"
          fontWeight="medium"
          fontSize="sm"
          _hover={{ textDecoration: "underline", color: "blue.700" }}
        >
          {row.text}
        </Link>
      ),
    },
  ];

  return (
    <Box px="8" py="8" maxW="4xl">
      <UiText variant="heading" mb="6">
        Domain Settings
      </UiText>

      {/* Sender Name Section */}
      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        p="6"
        mb="6"
        bg="white"
      >
        <Stack gap="4">
          <FormField
            label="Sender name"
            value={domainSettings.senderName}
            onChange={(_, val) => handleInputChange("senderName", val)}
            placeholder="Enter sender name"
            error={
              domainSettingErrors.senderName
                ? { message: domainSettingErrors.senderName }
                : undefined
            }
          />
          <Flex justify="flex-end">
            <Button
              p="4"
              bg="black"
              color="white"
              onClick={() => {
                handleUpdateSender();
              }}
            >
              Save
            </Button>
          </Flex>
        </Stack>
      </Box>

      {/* Email Domain Setting Section */}
      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        bg="white"
        overflow="hidden"
      >
        {/* Main Header */}
        <Box p="6" borderBottom="1px solid" borderColor="gray.200">
          <Flex justify="space-between" align="flex-start" mb="2">
            <Box>
              <UiText fontWeight="bold" fontSize="lg" mb="1">
                Email Domain Setting
              </UiText>
              <UiText color="gray.700" fontSize="sm" mb="3">
                Configure and verify your email domain for sending emails.
              </UiText>
              <UiBadge
                status={getFulfilledSettings() === 3 ? "success" : "pending"}
                variant="subtle"
                borderRadius="full"
              >
                {getFulfilledSettings()}/3 Completed
              </UiBadge>
            </Box>
            <IconButton
              aria-label="Expand"
              icon={<FiChevronUp />}
              variant="ghost"
              size="sm"
            />
          </Flex>
        </Box>

        <Box bg="white">
          <Box px="6" py="4">
            <UiText fontSize="md" fontWeight="medium" color="gray.700">
              Domain and email registrations
            </UiText>
          </Box>

          {/* Domain Address */}
          <CollapsibleSection title="Domain Address" defaultOpen>
            <Stack gap="4">
              <FormField
                label="Setup your Email Domain"
                value={domainSettings.domain}
                onChange={(_, val) => handleInputChange("domain", val)}
                description="Enter the domain you want to use for sending emails (e.g., example.com)."
                error={
                  domainSettingErrors.domain
                    ? { message: domainSettingErrors.domain }
                    : undefined
                }
              />

              <DnsRecordsTable records={registrationKeys.domainDKIM} />
            </Stack>
          </CollapsibleSection>

          {/* Sub domain */}
          <CollapsibleSection title="Sub domain" defaultOpen>
            <Stack gap="4">
              <FormField
                label="Setup your Sub Domain"
                value={domainSettings.subdomain}
                onChange={(_, val) => handleInputChange("subdomain", val)}
                description="Recommended for better deliverability."
                error={
                  domainSettingErrors.subdomain
                    ? { message: domainSettingErrors.subdomain }
                    : undefined
                }
              />

              <DnsRecordsTable records={registrationKeys.subdomainDKIM} />
            </Stack>
          </CollapsibleSection>

          {/* Email Address */}
          <CollapsibleSection title="Email Address" defaultOpen>
            <Stack gap="4">
              <FormField
                label="Setup your Email Address"
                value={domainSettings.email}
                onChange={(_, val) => handleInputChange("email", val)}
                placeholder="sender@example.com"
                error={
                  domainSettingErrors.email
                    ? { message: domainSettingErrors.email }
                    : undefined
                }
              />
              <FormField
                label="Reply to Email"
                value={domainSettings.reply_to_email}
                onChange={(_, val) => handleInputChange("reply_to_email", val)}
                placeholder="reply@example.com"
                error={
                  domainSettingErrors.reply_to_email
                    ? { message: domainSettingErrors.reply_to_email }
                    : undefined
                }
              />
              <Flex justify="flex-end" mt="2" gap="2">
                {checkAddBtn("refresh") && (
                  <Button
                    p="4"
                    bg="white"
                    color="black"
                    border="1px solid"
                    borderColor="gray.200"
                    onClick={handleRefreshStatus}
                    loading={refreshLoading}
                    disabled={
                      isRefreshBtnDisabled || refreshLoading || btnLoading
                    }
                  >
                    Refresh Statuses
                  </Button>
                )}
                {checkAddBtn("add") && (
                  <Tooltip
                    content={isAddBtnDisabled ? disabledReason : ""}
                    showArrow
                    placement="top"
                  >
                    <Button
                      bg="black"
                      color="white"
                      px="4"
                      onClick={handleAddDomain}
                      loading={refreshLoading || btnLoading}
                      disabled={isAddBtnDisabled}
                    >
                      Add
                    </Button>
                  </Tooltip>
                )}
              </Flex>
            </Stack>
          </CollapsibleSection>
        </Box>
      </Box>

      {/* How to update CNAME record */}
      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        bg="white"
        p="6"
        mt="6"
      >
        <Tables
          heading="How to update CNAME record"
          columns={cnameColumns}
          rows={DNS_PROVIDERS}
          pagination={false}
        />
      </Box>
    </Box>
  );
};

export default Domain;
