import React from "react";
import { UiBadge } from "../badge";

interface TableStatusProps {
  status: string;
}

const statusConfig: Record<string, React.ReactNode> = {
  draft: <UiBadge status="pending">Draft</UiBadge>,
  sent: <UiBadge status="success">Active</UiBadge>,
  failed: <UiBadge status="error">Error</UiBadge>,
  pending: <UiBadge status="warning">Pending</UiBadge>,
  archived: <UiBadge status="info">Archived</UiBadge>,
  active: <UiBadge status="success">Active</UiBadge>,
  synced: <UiBadge status="success">Synced</UiBadge>,
  processing: <UiBadge status="pending">Processing</UiBadge>,
  completed: <UiBadge status="success">Completed</UiBadge>,
};

export const TableStatus: React.FC<TableStatusProps> = ({ status }) => {
  const displayStatus = status
    ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
    : "Draft";

  return (
    statusConfig[status?.toLowerCase?.()] ?? (
      <UiBadge status="plain">{displayStatus}</UiBadge>
    )
  );
};
