import React, { useEffect, useState, useCallback } from "react";
import SegmentationEditDefinitionHeader from "./segmentation-edit-defination-header";
import { useForm } from "react-hook-form";
import FormField from "../../input";
import UiBox from "../../box";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { FlexibleDropdown } from "../../dropdown";
import { FiTrash2 } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
import { UiSelect } from "../../select";
import { TbFilterPlus } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { UiText } from "../../text";
import type { SegmentationEditDefinitionProps } from "@/types/segmentation-edit-defination-props";
import { TagMultiSelectDropdown } from "../../dropdown/tag-multiselect-dropdown";
import {
  createSegment,
  updateSegment,
  getSegmentById,
  getCountries,
} from "@/api/segments";
import DateTimeInput from "../../date-time-input";
import SkeletonLoader from "@/components/ui/skeletons";
import { useShop } from "@/store/shop-store";
import { toaster } from "@/components/ui/toaster";
import { useNavigate, useSearchParams } from "react-router-dom";

// --- Constants from for_ai.md ---

const SEGMENT_SUBSCRIBER_OPTIONS = [
  { title: "Country", value: "country" },
  { title: "State", value: "state" },
  { title: "City", value: "city" },
  { title: "Tags", value: "tags" },
];

const SEGMENT_EVENT_OPTIONS = [
  { title: "Order Count", value: "orders_count" },
  { title: "Total Spent", value: "total_spent" },
  { title: "First Order Date", value: "first_order_date" },
  { title: "Last Order Date", value: "last_order_date" },
  { title: "Campaign Clicked Date", value: "campaign_clicked_date" },
];

const SEGMENT_OPERATIONS_LIST = [
  { title: "Equal", value: "equals", conditionFor: "subscriber" },
  { title: "Not Equals", value: "not_equals", conditionFor: "subscriber" },
  { title: "Greater Then", value: "greater_then", conditionFor: "event" },
  { title: "Less Then", value: "less_then", conditionFor: "event" },
  { title: "Between", value: "in_between", conditionFor: "event" },
];

const SEGMENT_OPERATIONS = {
  EQUALS: "equals",
  NOT_EQUALS: "not_equals",
  GREATER_THEN: "greater_then",
  LESS_THEN: "less_then",
  IN_BETWEEN: "in_between",
};

const PURCHASE_TYPE_OPTIONS = [
  { title: "Equal to", value: "equals" },
  { title: "Less then", value: "less_then" },
  { title: "Greater then", value: "greater_then" },
];

const CONDITION_TYPES = {
  SUBSCRIBER: "subscriber",
  EVENT: "event",
};

const TAGS_OPERATIONS = [
  { title: "Contains", value: "contains" },
  { title: "Not Contains", value: "not_contains" },
];

// --- Helper Functions ---

const isEventType = (key: string) => {
  return SEGMENT_EVENT_OPTIONS.some((opt) => opt.value === key);
};

const isPurchaseType = (key: string) => {
  return key === "orders_count" || key === "total_spent";
};

const isOrderDateType = (key: string) => {
  return (
    key === "first_order_date" ||
    key === "last_order_date" ||
    key === "campaign_clicked_date"
  );
};

const getCurrentOperations = (
  type: string,
  key: string,
  first: boolean = false,
) => {
  if (first && isPurchaseType(key)) return PURCHASE_TYPE_OPTIONS;
  if (first && isOrderDateType(key))
    return SEGMENT_OPERATIONS_LIST.filter((opt) => opt.conditionFor === type);
  if (first && key === "tags") {
    return TAGS_OPERATIONS;
  }
  // Default filtering based on type
  if (!first && isOrderDateType(key))
    return SEGMENT_OPERATIONS_LIST.filter((opt) => opt.conditionFor === type);

  return SEGMENT_OPERATIONS_LIST.filter((opt) => opt.conditionFor === type);
};

// --- Types ---

interface SegmentCondition {
  id: string;
  key: string;
  conditionType: string;
  operator: string;
  value: any;
  dates?: number[];
}

type SegmentFormValues = {
  name: string;
};

// --- Components ---

const createEmptyCondition = (): SegmentCondition => ({
  id: Math.random().toString(36).slice(2),
  key: SEGMENT_SUBSCRIBER_OPTIONS[0].value,
  conditionType: CONDITION_TYPES.SUBSCRIBER,
  operator: SEGMENT_OPERATIONS.EQUALS,
  value: "",
});

interface SegmentConditionsGroupProps {
  title: string;
  conditions: SegmentCondition[];
  onChange: (conditions: SegmentCondition[]) => void;
  logic: "AND" | "OR";
}

const SegmentConditionsGroup: React.FC<SegmentConditionsGroupProps> = ({
  title,
  conditions,
  onChange,
  logic,
}) => {
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);

  const { shop } = useShop();
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        if (response.data && response.data.countries) {
          setCountries(
            response.data.countries.map((country) => ({
              label: country,
              value: country,
            })),
          );
        }
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await syncCustomerTags();
        if (response.data && response.data.customer_tags) {
          setTags(response.data.customer_tags);
        }
      } catch (error) {
        console.error("Failed to fetch customer tags", error);
      }
    };
    fetchTags();
  }, []);

  const handleAddCondition = () => {
    onChange([...conditions, createEmptyCondition()]);
  };

  const handleConditionChange = (
    index: number,
    updates: Partial<SegmentCondition>,
  ) => {
    const next = conditions.map((condition, idx) => {
      if (idx !== index) return condition;

      const updatedCondition = { ...condition, ...updates };

      // If key changed, reset logic
      if (updates.key) {
        updatedCondition.conditionType = isEventType(updates.key)
          ? CONDITION_TYPES.EVENT
          : CONDITION_TYPES.SUBSCRIBER;
        // Reset operator and value
        const ops = getCurrentOperations(
          updatedCondition.conditionType,
          updatedCondition.key,
          true,
        );
        updatedCondition.operator = ops[0]?.value || "";
        updatedCondition.value = "";
        updatedCondition.dates = [];
      }
      return updatedCondition;
    });
    onChange(next);
  };

  const handleRemoveCondition = (index: number) => {
    const next = conditions.filter((_, idx) => idx !== index);
    onChange(next);
  };

  // Combine options for the first dropdown
  const allOptions = [
    ...SEGMENT_SUBSCRIBER_OPTIONS,
    ...SEGMENT_EVENT_OPTIONS,
  ].map((opt) => ({
    label: opt.title,
    value: opt.value,
    disabled:
      opt.value === "tags" && shop?.customer_tags_synced_status !== "COMPLETED",
  }));

  return (
    <Box mt="6">
      <UiText fontWeight="semibold" mb="3">
        {title}
      </UiText>
      {conditions.map((condition, index) => {
        const operations = getCurrentOperations(
          condition.conditionType,
          condition.key,
          true,
        ).map((op) => ({
          label: op.title,
          value: op.value,
        }));

        return (
          <React.Fragment key={condition.id}>
            {/* Separator */}
            {index > 0 && (
              <Flex align="center" my="3" position="relative">
                <Box height="1px" bg="gray.300" flex="1" />
                <Box
                  px="2"
                  py="1"
                  bg="gray.100"
                  fontSize="xs"
                  fontWeight="bold"
                  color="black.600"
                  borderRadius="md"
                  mx="2"
                >
                  {logic}
                </Box>
                <Box height="1px" bg="gray.300" flex="1" />

                {/* Visual connection lines (optional, kept simple for now) */}
              </Flex>
            )}

            <Flex
              gap="2"
              position="relative"
              align="flex-start" // Align to top in case of multi-line inputs
            >
              <Box minW="12" display="none">
                {/* Simplified visual lines, hiding complex tree lines for now as per 3-field request focus */}
              </Box>

              <Box flex="1">
                <Flex gap="2" align="center" wrap="wrap">
                  {/* Field 1: Segment Option */}
                  <UiSelect
                    width="200px"
                    items={allOptions}
                    selectedItem={condition.key}
                    onItemChange={(value: string) =>
                      handleConditionChange(index, { key: value })
                    }
                  />

                  {/* Field 2: Operator */}
                  <UiSelect
                    width="150px"
                    items={operations}
                    selectedItem={condition.operator}
                    onItemChange={(value: string) =>
                      handleConditionChange(index, { operator: value })
                    }
                  />

                  {/* Field 3: Value */}
                  <Box flex="1" minW="200px">
                    {condition.key === "country" ? (
                      <UiSelect
                        items={countries}
                        selectedItem={condition.value}
                        onItemChange={(value) =>
                          handleConditionChange(index, { value })
                        }
                        placeholder="Select Country"
                      />
                    ) : condition.key === "tags" ? (
                      <TagMultiSelectDropdown
                        options={shop?.customer_tags || []}
                        selected={
                          Array.isArray(condition.value)
                            ? condition.value
                            : condition.value
                              ? [condition.value]
                              : []
                        }
                        onChange={(tags) =>
                          handleConditionChange(index, { value: tags })
                        }
                        placeHolder="Select Tags"
                        buttonWidth="200px"
                      />
                    ) : isOrderDateType(condition.key) ? (
                      <FormField
                        type="date"
                        value={condition.value} // Simplify date handling for now
                        register={{
                          onChange: (e) =>
                            handleConditionChange(index, {
                              value: e.target.value,
                            }),
                          onBlur: () => {},
                          name: `date-${condition.id}`,
                          ref: () => {},
                        }}
                      />
                    ) : (
                      <FormField
                        type="text"
                        placeholder="Value"
                        value={condition.value}
                        register={{
                          onChange: (e) =>
                            handleConditionChange(index, {
                              value: e.target.value,
                            }),
                          onBlur: () => {},
                          name: `val-${condition.id}`,
                          ref: () => {},
                        }}
                      />
                    )}
                  </Box>

                  <Icon
                    as={FiTrash2}
                    _hover={{ bg: "gray.600" }}
                    boxSize="9"
                    rounded="md"
                    p="2"
                    cursor="button"
                    onClick={() => handleRemoveCondition(index)}
                  />
                </Flex>
              </Box>
            </Flex>
          </React.Fragment>
        );
      })}

      <Flex
        justify="space-between"
        borderTop="sm"
        borderColor="gray.600"
        mt="5"
        align="center"
        pt="5"
      >
        <Button
          variant="outline"
          p="1"
          color="black"
          borderColor="blackAlpha.100"
          onClick={handleAddCondition}
        >
          <Icon
            as={IoMdAddCircleOutline}
            boxSize="5"
            rounded="md"
            cursor="button"
            mr="2"
          />
          Add condition
        </Button>
        <Flex gap="2" align="center">
          <Icon as={RiAccountCircleFill} boxSize="5" />
          <UiText>{conditions.length}</UiText>
        </Flex>
      </Flex>
    </Box>
  );
};

const SegmentationEditDefinition: React.FC<SegmentationEditDefinitionProps> = ({
  selectedType,
  onTypeChange,
  initialName,
  initialDefinition,
  onDefinitionChange,
}) => {
  const { register, setValue, watch } = useForm<SegmentFormValues>({
    mode: "onChange",
    defaultValues: {
      name: initialName || "",
    },
  });

  const [andConditions, setAndConditions] = useState<SegmentCondition[]>([
    createEmptyCondition(),
  ]);
  const [orConditions, setOrConditions] = useState<SegmentCondition[]>([
    createEmptyCondition(),
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const segmentId = searchParams.get("id");

  useEffect(() => {
    if (segmentId) {
      setIsLoading(true);
      getSegmentById(segmentId)
        .then((response: any) => {
          if (response.success && response.data?.found_segment) {
            const segment = response.data.found_segment;
            setValue("name", segment.name);

            const mapConditions = (conds: any[]) =>
              Array.isArray(conds)
                ? conds.map((c: any) => ({
                    ...c,
                    id: Math.random().toString(36).slice(2),
                  }))
                : [];

            if (segment.and?.length > 0) {
              setAndConditions(mapConditions(segment.and));
            } else {
              setAndConditions([createEmptyCondition()]);
            }

            if (segment.or?.length > 0) {
              setOrConditions(mapConditions(segment.or));
            } else {
              setOrConditions([createEmptyCondition()]);
            }
          }
        })
        .catch((error) => {
          console.error("Failed to load segment:", error);
          toaster.create({
            title: "Error",
            description: "Failed to load segment data",
            type: "error",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [segmentId, setValue]);

  const handleSave = async () => {
    const name = watch("name");

    if (!name) {
      toaster.create({
        title: "Validation Error",
        description: "Segment name is required",
        type: "error",
      });
      return;
    }

    const processConditions = (conds: SegmentCondition[]) => {
      if (
        conds.length === 1 &&
        conds[0].key === SEGMENT_SUBSCRIBER_OPTIONS[0].value &&
        (conds[0].value === "" ||
          (Array.isArray(conds[0].value) && conds[0].value.length === 0))
      ) {
        return { valid: true, data: [] };
      }

      const validData: SegmentCondition[] = [];
      for (const cond of conds) {
        if (
          !cond.key ||
          !cond.operator ||
          (cond.value === "" && !Array.isArray(cond.value)) ||
          (Array.isArray(cond.value) && cond.value.length === 0)
        ) {
          return { valid: false, data: [] };
        }
        validData.push(cond);
      }
      return { valid: true, data: validData };
    };

    const andResult = processConditions(andConditions);
    const orResult = processConditions(orConditions);

    if (!andResult.valid || !orResult.valid) {
      toaster.create({
        title: "Validation Error",
        description: "Please complete all conditions or remove empty ones",
        type: "error",
      });
      return;
    }

    if (andResult.data.length === 0 && orResult.data.length === 0) {
      toaster.create({
        title: "Validation Error",
        description: "At least one condition is required",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name,
        and: andResult.data.map(({ id, ...rest }) => rest),
        or: orResult.data.map(({ id, ...rest }) => rest),
        // type: "custom",
        // status: "active",
      };

      if (segmentId) {
        await updateSegment(segmentId, payload);
        toaster.create({
          title: "Success",
          description: "Segment updated successfully",
          type: "success",
        });
      } else {
        await createSegment(payload);
        toaster.create({
          title: "Success",
          description: "Segment created successfully",
          type: "success",
        });
      }

      navigate("/list-and-segment");
    } catch (error) {
      console.error("Failed to save segment:", error);
      toaster.create({
        title: "Error",
        description: "Failed to save segment",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialName) {
      setValue("name", initialName);
    }
  }, [initialName, setValue]);

  return (
    <>
      <SegmentationEditDefinitionHeader
        onSave={handleSave}
        isLoading={isLoading}
        isEditMode={!!segmentId}
      />
      <Box p="6">
        <SkeletonLoader
          loading={isLoading && !!segmentId}
          boxHeight="400px"
          showAvatar={false}
        >
          <FormField
            type="text"
            label="Name"
            required
            register={register("name", {
              required: "Name is required",
            })}
          />

          <Flex align="center" mt="6" mb="4" gap="3">
            <UiText fontWeight="medium">
              Subcribers must match the following conditions:
            </UiText>
          </Flex>

          <UiBox borderColor="gray.300" mt="4" mb="6" boxShadow="none">
            <SegmentConditionsGroup
              title="Match all conditions"
              conditions={andConditions}
              onChange={setAndConditions}
              logic="AND"
            />
          </UiBox>
          <UiBox borderColor="gray.300" mt="4" mb="1" boxShadow="none">
            <SegmentConditionsGroup
              title="Match any condition"
              conditions={orConditions}
              onChange={setOrConditions}
              logic="OR"
            />
          </UiBox>
        </SkeletonLoader>
      </Box>
    </>
  );
};

export default SegmentationEditDefinition;
