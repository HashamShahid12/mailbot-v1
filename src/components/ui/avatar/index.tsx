import { Avatar, AvatarGroup } from "@chakra-ui/react";
import React from "react";

type AvatarSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

interface UiAvatar {
  name: string;
  src?: string;
  size?: AvatarSize;
}

export const UiAvatar: React.FC<UiAvatar> = ({ name, src, size = "xl" }) => {
  return (
    <AvatarGroup>
      <Avatar.Root shape="full" size={size} pt="1">
        <Avatar.Fallback name={name} />
        <Avatar.Image src={src} />
      </Avatar.Root>
    </AvatarGroup>
  );
};
