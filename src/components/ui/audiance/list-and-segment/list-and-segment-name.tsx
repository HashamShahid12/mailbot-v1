import React, { useState } from "react";
import { Flex, Link } from "@chakra-ui/react";
import { StarToggleButton } from "@/components/ui/star-toggle-button";
import type { ListAndSegmentNameCellProps } from "@/types/list-and-segment-name-props";

const updateStarredStatus = async (id: string, starred: boolean) => {
  // await fetch("/api/star", { method: "POST", body: JSON.stringify({ id, starred }) });
  console.log(`Updated ID: ${id} → starred: ${starred}`);
};

export const ListAndSegmentName: React.FC<ListAndSegmentNameCellProps> = ({
  row,
  col,
  onClick,
}) => {
  const [isStarred, setIsStarred] = useState(row.starred ?? false);
  const isSegment = row.listandsegmenttype !== "List";
  const name = row[col.key];
  const label = isSegment
    ? isNaN(Number(name))
      ? name
      : `Engaged (${name} Days)`
    : `${name} List`;

  const handleToggle = async () => {
    const newStar = !isStarred;
    setIsStarred(newStar);
    await updateStarredStatus(row.id, newStar);
  };
  return (
    <Flex flexDirection="row" align="center">
      <StarToggleButton isActive={isStarred} onToggle={handleToggle} />
      <Link
        href="#"
        color="blue.200"
        onClick={() => onClick?.(label)}
        _hover={{
          color: "blue.100",
          textDecoration: "underline",
        }}
        _focus={{
          outline: "none",
        }}
      >
        {label}
      </Link>
    </Flex>
  );
};
