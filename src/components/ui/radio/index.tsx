// import * as React from "react";
// import type { ComponentProps } from "react";
// import {
//   RadioGroup,
//   type RadioGroupItemControlProps,
//   type RadioGroupItemTextProps,
// } from "@chakra-ui/react";

// export interface RadioProps extends Omit<ComponentProps<"label">, "children"> {
//   label?: string;
//   value: string;
//   controlProps?: RadioGroupItemControlProps;
//   labelProps?: RadioGroupItemTextProps;
// }

// const Radio = React.forwardRef<HTMLLabelElement, RadioProps>(
//   ({ label, value, controlProps, labelProps, ...rootProps }) => {
//     const defaultControlStyles: RadioGroupItemControlProps = {
//       border: "sm",
//       borderColor: "gray.300",
//       bg: "white",
//       cursor: "pointer",
//       _hover: {
//         borderColor: "blue.700",
//       },
//       _checked: {
//         bg: "blue.200",
//         borderColor: "blue.700",
//       },
//     };

//     const defaultLabelStyles: RadioGroupItemTextProps = {
//       fontSize: "md",
//       fontWeight: "normal",
//       _hover: {
//         cursor: "pointer",
//       },
//     };

//     return (
//       <RadioGroup.Item value={value} {...rootProps}>
//         <RadioGroup.ItemHiddenInput />
//         <RadioGroup.ItemControl {...defaultControlStyles} {...controlProps} />
//         {label && (
//           <RadioGroup.ItemText {...defaultLabelStyles} {...labelProps}>
//             {label}
//           </RadioGroup.ItemText>
//         )}
//       </RadioGroup.Item>
//     );
//   }
// );

// Radio.displayName = "Radio";

// export default Radio;
