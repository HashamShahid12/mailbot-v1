import { FormField } from "@/components/ui";
import { SelectableCardGroup } from "@/components/ui/selectable-card-group";
import { UiText } from "@/components/ui/text";
import { Flex } from "@chakra-ui/react";
import type React from "react";
import { useForm } from "react-hook-form";

export interface FormValues {
  couponDescription: string;
  couponCode: string;
}
export interface AudianceFormCouponOfferProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}
const AudianceFormCouponOffer: React.FC<AudianceFormCouponOfferProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  const {
    register,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });

  return (
    <>
      <Flex direction="column" maxW="xl" m="auto" mt="12">
        <UiText mb="3" variant="heading2">
          Offer a coupon for signing up
        </UiText>
        <UiText mb="3" color="gray.400">
          Offering a discount or free shipping can increase sign-up rates.
        </UiText>
        <SelectableCardGroup
          value={selectedOption}
          onChange={setSelectedOption}
          options={[
            {
              value: "offer",
              label: "Offer a coupon",
              badge: "Higher conversion",
            },
            {
              value: "dontoffer",
              label: "Don't offer a coupon",
            },
          ]}
        />
        {selectedOption === "offer" && (
          <Flex direction="column" gap="8" mt="3">
            <Flex direction="column">
              <FormField
                label="Coupon Code"
                description="Add an existing coupon code from your ecommerce platform."
                placeholder="Add coupon code"
                register={register("couponCode", {
                  required: "Add a coupon code",
                })}
                error={errors.couponCode}
              />
            </Flex>
            <Flex direction="column">
              <FormField
                label="Coupon description"
                description="This content displays on your form. You can change it later."
                placeholder="Example: Get 15% off"
                register={register("couponDescription", {
                  required: "Enter a coupon description",
                })}
                error={errors.couponDescription}
              />
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default AudianceFormCouponOffer;
