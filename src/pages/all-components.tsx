import { FormField, PopoverMenu, SearchBar } from "@/components/ui";
import { ReusableActionBar } from "@/components/ui/action-bar";
import { UiBadge } from "@/components/ui/badge";
import UiBox from "@/components/ui/box";
import UiButton from "@/components/ui/button";
import { DateRangeDropdown } from "@/components/ui/campaign-dropdown/date-range-dropdown";
import Checkbox from "@/components/ui/check-box";
import { PrimitiveDialog } from "@/components/ui/dailog-model";
import { DrawerWrapper } from "@/components/ui/drawer";
import ActiveSiteDropDown from "@/components/ui/dropdown/active-site-dropdown";
import { NewDropDown } from "@/components/ui/dropdown/new-dropdown";
import { TagMultiSelectDropdown } from "@/components/ui/dropdown/tag-multiselect-dropdown";
import { StatusDropdown } from "@/components/ui/dropdown/status-dropdown";
import UiLink from "@/components/ui/link";
import { UiSelect } from "@/components/ui/select";
import SkeletonLoader from "@/components/ui/skeletons";
import Tables from "@/components/ui/table";
import { UiText } from "@/components/ui/text";
import UiTextLink from "@/components/ui/text-link";
import type { FormValues } from "@/types/signup-formvalue-props";
import { Box, Button, Flex, Icon, Stack } from "@chakra-ui/react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { Bs0CircleFill } from "react-icons/bs";
import { ChevronDown, ChevronRight, EyeOffIcon, ViewIcon } from "lucide-react";
import TagDropdown2 from "@/components/ui/dropdown/tag-dropdown2";
import { LuExternalLink } from "react-icons/lu";

const columns = [
  { header: "Campaign", key: "name", width: "45%" },
  { header: "Type", key: "type", width: "20%" },
  { header: "Open rate", key: "openrate", width: "10%", isNumeric: true },
  {
    header: "Click rate",
    key: "clickrate",
    width: "8%",
    isNumeric: true,
  },
  {
    header: "Active on Site",
    key: "activesite",
    width: "12%",
    isNumeric: true,
  },
];

const messageCategory = [
  {
    label: "Inbox Provider",
    value: "inbox-provider",
  },
  {
    label: "Email Domain",
    value: "email-domain",
  },
];

const fallbackOptions = [
  { label: "Urgent", value: "urgent" },
  { label: "Follow Up", value: "follow-up" },
  { label: "VIP", value: "vip" },
];

const rows = [
  {
    name: "Email Campaign - May 22, 2025, 4:38 PM",
    type: "sms",
    openrate: "100.00%",
    activesite: 0,
    clickrate: "0.00%",
    subtitle: "Sent on May 22, 2025, at 12:45 PM",
    subtitleActiveOnSite: "0.00% of recipients",
  },
];

const items = [
  {
    label: "Email List",
    value: "email",
    description: "WM9Ecj",
  },
  {
    label: "Preview List",
    value: "preview",
    description: "XWyv6b",
  },
  {
    label: "SMS List",
    value: "sms",
    description: "Ruvg2g",
  },
];

const Components = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });
  const id = "abc";
  const [selectRange, setSelectRange] = useState("all");
  const [activeSiteFilter, setActiveSiteFilter] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);

  return (
    <>
      <UiBox m="10">
        <Flex flexDirection="column" gap="2">
          <SkeletonLoader boxHeight="sm" lineCount={3} h="9xs" w="full">
            <UiText variant="heading" textAlign="center">
              Skeleton
            </UiText>
          </SkeletonLoader>
        </Flex>
      </UiBox>
      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Select
        </UiText>
        <Flex gap="5" flexDirection="column">
          <UiSelect width="full" items={items} />
          <Flex gap="5" justify="center" align="end">
            <UiSelect width="5xs" items={items} />
            <UiSelect
              width="5xs"
              items={messageCategory}
              showLabel
              label="Message category"
              defaultValue="inbox-provider"
              bgTrigger="white"
            />
            <UiSelect
              width="3xs"
              showLabel
              label="Message category"
              defaultValue="inbox-provider"
              bgTrigger="white"
              searchBar
            >
              <UiText p="2" borderTop="sm" borderColor="gray.300">
                No results available
              </UiText>
            </UiSelect>
          </Flex>
        </Flex>
      </UiBox>
      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Badges
        </UiText>
        <Flex gap="5">
          <UiBadge status="error">Error</UiBadge>
          <UiBadge status="pending">Pending</UiBadge>
          <UiBadge status="success">Success</UiBadge>
          <UiBadge status="info">Info</UiBadge>
          <UiBadge status="alert">Alert</UiBadge>
          <UiBadge status="plain">Plain</UiBadge>
          <UiBadge status="achievement">Achievement</UiBadge>
          <UiBadge status="new">New</UiBadge>
        </Flex>
      </UiBox>
      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Links
        </UiText>
        <Flex gap="5">
          <UiLink>Primary Link</UiLink>
          <UiLink uiVariant="secondary">Secondary Link</UiLink>
        </Flex>
      </UiBox>
      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Button
        </UiText>
        <Flex gap="5">
          <UiButton>Default Plain</UiButton>
          <UiButton uiVariant="solid">Solid</UiButton>
          <UiButton uiVariant="outline">Outline</UiButton>
        </Flex>
      </UiBox>

      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Flexible dropdown
        </UiText>
        <Flex gap="5">
          <NewDropDown
            buttonTitle={<Bs0CircleFill />}
            icon
            links={[
              {
                title: "Internal Link",
                href: "/campaigns",
              },
              {
                title: "External Link",
                href: "https://www.google.com/",
              },
              {
                title: "Custom Action",
                onClick: () => {
                  setIsDrawerOpen(true);
                },
              },
            ]}
          />
          <StatusDropdown
            label="Single Select"
            selected={statusFilter}
            onChange={setStatusFilter}
          />
          <TagMultiSelectDropdown
            placeHolder="Multi Select"
            selected={selectedTags}
            onChange={setSelectedTags}
            options={fallbackOptions}
          />
          <TagDropdown2
            placeholder="Select tags in label"
            options={[{ label: "Shopify", value: "shopify" }]}
            selectedTags={selectTags}
            onTagsChange={setSelectTags}
          />
          <DateRangeDropdown
            range={selectedDateRange}
            selectRange={selectRange}
            setSelectRange={setSelectRange}
            onChange={(range) => {
              setSelectedDateRange(range);
            }}
          />
          <ActiveSiteDropDown
            selected={activeSiteFilter}
            onChange={setActiveSiteFilter}
          />
        </Flex>
      </UiBox>
      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Text Link
        </UiText>
        <Flex gap="5">
          <UiTextLink value="Text Link" />
        </Flex>
      </UiBox>

      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Text Size
        </UiText>
        <Flex flexDirection="column" gap="2">
          <UiText variant="heading">Heading (36px sans-serif)</UiText>
          <UiText variant="heading2">Heading 2 (24px Helvetica Neue)</UiText>
          <UiText variant="subheading">Sub-Heading (20px sans-serif)</UiText>
          <UiText variant="body">Body (16px sans-serif)</UiText>
          <UiText variant="caption">Caption (14px sans-serif)</UiText>
        </Flex>
      </UiBox>

      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Searchbar
        </UiText>
        <Flex flexDirection="column" gap="5">
          <SearchBar />
          <Box m="auto">
            <SearchBar w="lg" />
          </Box>
        </Flex>
      </UiBox>
      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Arrow
        </UiText>
        <Flex flexDirection="column" gap="5">
          <LuExternalLink />
          <Icon
            as={ChevronRight}
            boxSize="6"
            transition="transform 0.2s ease"
            // transform={open ? "rotate(180deg)" : "rotate(0deg)"}
          />
          <Icon as={ChevronDown} boxSize="6" />
        </Flex>
      </UiBox>
      <UiBox p="10" maxW="lg" m="auto">
        <UiText variant="heading" textAlign="center">
          Login and Signup FormField
        </UiText>
        <form>
          <Stack gap="4">
            <UiText textAlign="center" fontSize="sm">
              Already have an account?{" "}
              <UiTextLink value="Log in." href="/login" />
            </UiText>

            {/* Email */}
            <FormField
              label="Email"
              type="email"
              required
              placeholder="Enter your email"
              register={register("email", {
                required: "Email is required",
              })}
              error={errors.email}
            />

            {/* Password */}
            <FormField
              label="Password"
              required
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              register={register("password", {
                required: "Password is required",
              })}
              error={errors.password}
              rightElement={
                <Button
                  size="sm"
                  variant="ghost"
                  height="full"
                  borderLeftRadius="0"
                  onClick={() => setShowPassword(!showPassword)}
                  _hover={{
                    bg: "gray.600",
                  }}
                  border="none"
                  borderLeft="sm"
                  borderColor="blackAlpha.100"
                >
                  {showPassword ? <EyeOffIcon /> : <ViewIcon />}
                </Button>
              }
            />

            {/* { Company Name } */}
            <FormField
              label="Company Name"
              type={"text"}
              required
              placeholder="Company name"
              register={register("companyName", {
                required: "Company name is required",
              })}
              error={errors.companyName}
            />

            {/* {Company Website} */}
            <FormField
              label="Company website"
              type={"text"}
              required
              placeholder="Company website"
              register={register("website", {
                required: "Website is required",
              })}
              error={errors.website}
            />

            {/* {Phone Number} */}
            <FormField
              label="Phone number"
              type={"number"}
              required
              placeholder="Phone number"
              register={register("phone", {
                required: "Phone Number is required",
              })}
              error={errors.phone}
            />

            <Checkbox label="Mailbot has a newsletter? Sign me up!*" />
            <Checkbox label="I would like a demo/consultation" />

            <Box border="1px solid #ccc" rounded="md" p={4} textAlign="center">
              <UiText variant="caption">[reCAPTCHA widget placeholder]</UiText>
            </Box>

            <Button maxW="fit-content" p="4" m="auto" type="submit">
              Get started
            </Button>
            <UiText fontSize="sm" mb="3">
              By submitting this form, you agree to{" "}
              <UiTextLink value="the terms of service" /> and{" "}
              <UiTextLink value="privacy policy." href="#" />
              <br />
              <br />* By checking the box and entering your email address above,
              you consent to receive marketing emails (such as newsletters, blog
              posts, webinars, event invitations and new product updates) from
              Klaviyo from time to time. You can unsubscribe at any time by
              clicking on the “Unsubscribe” link at the bottom of our emails.
              For more information on how we process your personal information
              and what rights you have in this respect, please see our{" "}
              <UiTextLink value="privacy policy." href="#" />
            </UiText>
          </Stack>
        </form>
      </UiBox>

      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Dialog Model
        </UiText>
        <PrimitiveDialog
          trigger={<UiButton uiVariant="solid">Create Dashboard</UiButton>}
          title="Create Dashboard"
          footer={
            <>
              <UiButton uiVariant="solid">Create</UiButton>
            </>
          }
        >
          <SearchBar />
        </PrimitiveDialog>
      </UiBox>

      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Drawer
        </UiText>
        <UiButton
          uiVariant="solid"
          onClick={(e) => {
            e.preventDefault();
            setIsDrawerOpen(true);
          }}
        >
          Drawer
        </UiButton>
        <Flex gap="2">
          <DrawerWrapper
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            title="Drawer"
            footer={[
              <UiButton
                key="cancel"
                uiVariant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDrawerOpen(false);
                }}
              >
                Cancel
              </UiButton>,
            ]}
          >
            <UiText>cakcvasjhcvja</UiText>
          </DrawerWrapper>
        </Flex>
      </UiBox>
      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Popover
        </UiText>
        <Flex gap="2">
          <PopoverMenu
            placement="right-end"
            contentProps={{
              minW: "sm",
              minH: "sm",
            }}
            trigger={<UiButton uiVariant="solid">Popover</UiButton>}
          >
            casas
          </PopoverMenu>
        </Flex>
      </UiBox>
      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Checkbox Action-Bar
        </UiText>
        <Flex gap="2">
          <Checkbox
            checked={selectedIds.includes(id)}
            onChange={(e) => {
              const isChecked = (e.target as HTMLInputElement).checked;
              setSelectedIds((prev) =>
                isChecked ? [...prev, id] : prev.filter((i) => i !== id)
              );
            }}
          />

          <ReusableActionBar
            itemCount={selectedIds.length}
            checked={selectedIds.length > 0}
            onReset={() => setSelectedIds([])}
            onDelete={() => setSelectedIds([])}
          />
        </Flex>
      </UiBox>
      <UiBox m="10">
        <UiText variant="heading" textAlign="center">
          Table
        </UiText>
        <Tables columns={columns} rows={rows} pagePerRow pagination />
      </UiBox>
    </>
  );
};

export default Components;
