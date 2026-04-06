import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import type { SystemStyleObject } from "@chakra-ui/react";

export interface UiInputProps {
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  type: string;
  alignmentForm?: "vertical" | "horizontal";
  error?: FieldError;
  register: UseFormRegisterReturn;
  onChange?: (name: string, value: string) => void;
  [key: string]: any;
  sx?: SystemStyleObject;
}
