import { useState, useMemo } from "react";
import { MailIcon, MessageSquareTextIcon } from "lucide-react";
import mailAndSmsIcon from "@/assets/mailandsmsicon.svg";

export type FlowCard = {
  title: string;
  subtitle: string;
  description: string;
  badgeTitle: string;
  badgeIcon?: string;
  icon: string | React.ComponentType<any>;
  onClick?: () => void;
};

export const useFlowFilters = (allCards: FlowCard[]) => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const getStatusFromIcon = (icon: FlowCard["icon"]): string | null => {
    if (icon === MailIcon) return "email";
    if (icon === MessageSquareTextIcon) return "sms";
    if (icon === mailAndSmsIcon) return "emailAndSms";
    return null;
  };

  const hasFilter =
    Boolean(searchFilter.trim()) ||
    selectedTags.length > 0 ||
    (statusFilter && statusFilter !== "all");

  const filteredCards = useMemo(() => {
    return allCards.filter((item) => {
      const matchesSearch =
        !searchFilter ||
        item.title.toLowerCase().includes(searchFilter.toLowerCase());
      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.includes(item.badgeTitle.toLowerCase());
      const statusMatch =
        !statusFilter ||
        statusFilter === "all" ||
        statusFilter === getStatusFromIcon(item.icon);

      return matchesSearch && tagMatch && statusMatch;
    });
  }, [allCards, searchFilter, selectedTags, statusFilter]);

  return {
    statusFilter,
    setStatusFilter,
    searchFilter,
    setSearchFilter,
    selectedTags,
    setSelectedTags,
    filteredCards,
    hasFilter,
    resetFilters: () => {
      setSearchFilter("");
      setSelectedTags([]);
      setStatusFilter("all");
    },
  };
};
