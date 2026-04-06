import {
  Dialog,
  Portal,
  CloseButton,
  DialogBody,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPositioner,
  DialogCloseTrigger,
  DialogFooter,
  type BoxProps,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

interface PrimitiveDialogProps extends BoxProps {
  trigger?: ReactNode;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "cover";
  placement?: "center" | "top" | "bottom";
  motionPreset?:
    | "scale"
    | "none"
    | "slide-in-bottom"
    | "slide-in-top"
    | "slide-in-left"
    | "slide-in-right";
  contentPadding?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  footerPadding?: string;
}

export const PrimitiveDialog: React.FC<PrimitiveDialogProps> = ({
  trigger,
  title,
  children,
  open,
  onOpenChange,
  footer,
  size = "md",
  placement = "center",
  motionPreset = "slide-in-bottom",
  contentPadding = "5",
  footerPadding = "2",
  ...props
}) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => onOpenChange?.(details.open)}
      size={size}
      placement={placement}
      motionPreset={motionPreset}
    >
      {trigger && (
        <Dialog.Trigger asChild _focus={{ outline: "none" }}>
          {trigger}
        </Dialog.Trigger>
      )}
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent {...props} p={contentPadding}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogCloseTrigger
                mr="3"
                mt="2"
                _focus={{ outline: "none" }}
                asChild
              >
                <CloseButton size="md" />
              </DialogCloseTrigger>
            </DialogHeader>

            <DialogBody py="5">{children}</DialogBody>

            {footer && <DialogFooter pt={footerPadding}>{footer}</DialogFooter>}
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </Dialog.Root>
  );
};
