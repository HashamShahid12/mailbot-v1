import React, { useState } from "react";
import { PrimitiveDialog } from "@/components/ui/dailog-model";
import UiButton from "@/components/ui/button";
import { UiText } from "@/components/ui/text";
import { useAuthStore } from "@/store/auth-store";
import { refreshSession } from "@/api/client";

export const SessionExpiredModal: React.FC = () => {
  const { isSessionExpired } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await refreshSession();
    } catch (error) {
      console.error("Failed to refresh session from modal", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isSessionExpired) return null;

  return (
    <PrimitiveDialog
      open={isSessionExpired}
      onOpenChange={() => {}}
      title="Session Expired"
      size="md"
      footer={
        <UiButton uiVariant="solid" onClick={handleRefresh} loading={loading}>
          Refresh Session
        </UiButton>
      }
    >
      <UiText>
        Your session has expired. Please refresh your session to continue.
      </UiText>
    </PrimitiveDialog>
  );
};
