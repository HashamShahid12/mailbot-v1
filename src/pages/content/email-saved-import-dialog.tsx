import { FormField, SearchBar } from "@/components/ui";
import UiButton from "@/components/ui/button";
import { PrimitiveDialog } from "@/components/ui/dailog-model";
import type React from "react";

interface EmailSavedImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailSavedImportDialog: React.FC<EmailSavedImportDialogProps> = ({
  onClose,
  isOpen,
}) => {
  return (
    <>
      <PrimitiveDialog
        title="Import template"
        open={isOpen}
        size="xl"
        onOpenChange={onClose}
        footer={
          <>
            <UiButton uiVariant="solid">Import template</UiButton>
          </>
        }
      >
        <FormField label="sd" description="csaca" />
      </PrimitiveDialog>
    </>
  );
};

export default EmailSavedImportDialog;
