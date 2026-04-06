import {
  type CheckboxRootProps,
  type CheckboxLabelProps,
  type CheckboxControlProps,
} from "@chakra-ui/react";

export interface CheckboxProps extends CheckboxRootProps {
  label?: React.ReactNode;
  subtitle?: string;
  labelProps?: CheckboxLabelProps;
  controlProps?: CheckboxControlProps;
  indeterminate?: boolean;
  badge?: string;
  checkbox?: boolean;
}
