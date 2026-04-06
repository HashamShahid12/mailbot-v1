import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import type { SystemStyleObject } from "@chakra-ui/react";

export interface FormFieldProps {
  name?: string;
  label?: string;
  labelmb?: string | number;
  value?: string;
  input?: boolean;
  description?: string;
  fontSize?: string;
  placeholder?: string;
  w?: string | number;
  type?: string;
  alignmentForm?: "vertical" | "horizontal";
  error?: FieldError;
  register?: UseFormRegisterReturn;
  onChange?: (name: string, value: string) => void;
  [key: string]: any;
  sx?: SystemStyleObject;
}
