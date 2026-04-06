import type { SidebarItem } from "@/types/side-bar-item";
import {
  FiHome,
  FiSend,
  FiGitBranch,
  FiFileText,
  FiTrendingUp,
  FiUsers,
  FiBookOpen,
  FiPieChart,
  FiMessageSquare,
  FiGrid,
  FiCreditCard,
} from "react-icons/fi";

export const sidebarLinks: SidebarItem[] = [
  { label: "Home", icon: FiHome, path: "/dashboard" },
  { label: "Plans", icon: FiCreditCard, path: "/plans" },
  { label: "Campaigns", icon: FiSend, path: "/campaigns" },
  { label: "Flows", icon: FiGitBranch, path: "/flows" },
  // { label: "Sign-up forms", icon: FiFileText, path: "/form" },
  // {
  //   label: "Growth strategies",
  //   icon: FiTrendingUp,
  //   path: "/growth-strategies",
  // },
  {
    label: "Audience",
    icon: FiUsers,
    children: [
      // { label: "Growth tools", path: "/growth-tools" },
      { label: "Lists & Segments", path: "/list-and-segment" },
      { label: "Profiles", path: "/profiles" },
    ],
  },
  {
    label: "Content",
    icon: FiBookOpen,
    children: [
      { label: "Templates", path: "/templates" },
      // { label: "Universal content", path: "/universal-content" },
      // { label: "Products", path: "/products" },
      // { label: "Images & brand", path: "/images-brands" },
      // { label: "Objects", path: "/objects" },
    ],
  },
  {
    label: "Analytics",
    icon: FiPieChart,
    children: [
      { label: "Dashboards", path: "/analytics/dashboard" },
      // { label: "Experiments", path: "/experiments" },
      // { label: "Metrics", path: "/analytics/metrics" },
      // { label: "Benchmarks", path: "/benchmarks" },
      // { label: "Deliverability", path: "/deliverability" },
      // { label: "Custom reports", path: "/custom-reports" },
    ],
  },
  {
    label: "Settings",
    icon: FiMessageSquare,
    children: [
      // { label: "Inbox", path: "/inbox" },
      { label: "Store Info", path: "/store-info" },
      { label: "Email Footer Configuration", path: "/footer-config" },
      { label: "Popups", path: "/popups" },
      { label: "Domain", path: "/domain" },
      { label: "Theme Extension", path: "/theme-extension" },
      // { label: "Popup Settings", path: "/popup-settings" },
    ],
  },
  { label: "Integrations", icon: FiGrid, path: "/integrations" },
  { label: "Components", icon: FiSend, path: "/all-components" },
  { label: "Rules", icon: FiSend, path: "/rules" },
];
