import { Box, Text, Input, Field } from "@chakra-ui/react";
import type { FormFieldProps } from "@/types/form-field-props";
import { UiText } from "../text";

const FormField: React.FC<FormFieldProps> = ({
  name,
  input = true,
  label,
  labelmb,
  placeholder,
  type = "text",
  w = "full",
  fontSize = "lg",
  error,
  description,
  register,
  alignmentForm = "vertical",
  required,
  disabled,
  onChange,
  rightElement,
  ...rest
}) => {
  return (
    <Field.Root invalid={!!error} w={w}>
      {label && (
        <Field.Label htmlFor={name} mb={labelmb}>
          <UiText variant="body" lineHeight="0.5">
            {label}
          </UiText>
          {required && (
            <Text as="span" fontSize="2xl" color="red.50">
              *
            </Text>
          )}
        </Field.Label>
      )}
      {description && <UiText color="gray.400">{description}</UiText>}
      {input && (
        <Box
          position="relative"
          w="full"
          display="flex"
          alignItems="center"
          border="sm"
          bg="white"
          borderColor="blackAlpha.100"
          borderRadius="md"
          _hover={{ borderColor: "blue.200" }}
          _focusWithin={{
            borderColor: "blue.200",
            outline: "4px solid",
            outlineColor: "blue.600",
          }}
        >
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            _placeholder={{ color: "gray.700" }}
            px="3"
            fontSize={fontSize}
            required
            border="none"
            outline="none"
            disabled={disabled}
            value={rest.value}
            onChange={(e) => {
              if (register?.onChange) register.onChange(e);
              if (onChange) onChange(name || "", e.target.value);
              if (rest.onChange) rest.onChange(e);
            }}
            {...register}
            {...rest}
          />

          {rightElement && (
            <Box
              position="absolute"
              right="0"
              top="half"
              transform="translateY(-half)"
              height="full"
            >
              {rightElement}
            </Box>
          )}
        </Box>
      )}

      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default FormField;
