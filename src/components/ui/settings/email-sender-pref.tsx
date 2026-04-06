import {
  Box,
  Checkbox,
  HStack,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import UiBox from "../box";
import { UiText } from "../text";
import UiButton from "../button";
import { UiSelect } from "../select";

const DEFAULT_PERIOD = "16";
const DEFAULT_UNIT = "hours";
const DEFAULT_IGNORE_TRANSACTIONAL = false;
const DEFAULT_SUBJECT_PREFIX = "";
const DEFAULT_ENABLE_EMBEDDED_STYLES = false;

const EmailSenderPref = () => {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const [periodUnit, setPeriodUnit] = useState(DEFAULT_UNIT);
  const [ignoreTransactional, setIgnoreTransactional] = useState(
    DEFAULT_IGNORE_TRANSACTIONAL,
  );
  const [subjectPrefix, setSubjectPrefix] = useState(DEFAULT_SUBJECT_PREFIX);
  const [enableEmbeddedStyles, setEnableEmbeddedStyles] = useState(
    DEFAULT_ENABLE_EMBEDDED_STYLES,
  );

  const hasChanges = useMemo(
    () =>
      period !== DEFAULT_PERIOD ||
      periodUnit !== DEFAULT_UNIT ||
      ignoreTransactional !== DEFAULT_IGNORE_TRANSACTIONAL ||
      subjectPrefix !== DEFAULT_SUBJECT_PREFIX ||
      enableEmbeddedStyles !== DEFAULT_ENABLE_EMBEDDED_STYLES,
    [
      period,
      periodUnit,
      ignoreTransactional,
      subjectPrefix,
      enableEmbeddedStyles,
    ],
  );

  const onSave = () => {
    console.log({
      period,
      periodUnit,
      ignoreTransactional,
      subjectPrefix,
      enableEmbeddedStyles,
    });
  };

  return (
    <Stack maxW="720px" gap={4}>
      <HStack justify="space-between" align="start">
        <UiText variant="heading2">Sender preferences</UiText>
        <UiButton uiVariant="solid" disabled={!hasChanges} onClick={onSave}>
          Save
        </UiButton>
      </HStack>

      <UiBox>
        <Stack gap={5}>
          <Box>
            <UiText variant="subheading">Smart Sending</UiText>
            <UiText variant="body" color="gray.400">
              Smart Sending prevents your recipients from receiving too many
              messages if you have many active flows and campaigns.
            </UiText>
          </Box>

          <Box maxW="md">
            <UiText variant="body" mb={2}>
              Smart Sending Period
            </UiText>
            <HStack align="stretch" gap={2}>
              <InputGroup endElement={<UiText px={1}>Hours</UiText>}>
                <Input
                  type="number"
                  min={1}
                  px="3"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  border="sm"
                  borderColor="blackAlpha.100"
                  _hover={{ borderColor: "blue.200" }}
                />
              </InputGroup>
              {/* <Box minW="32">
                <UiSelect
                  width="full"
                  selectedItem={periodUnit}
                  onChange={setPeriodUnit}
                  items={[
                    { label: "hours", value: "hours" },
                    { label: "days", value: "days" },
                  ]}
                />
              </Box> */}
            </HStack>
          </Box>

          <Checkbox.Root
            checked={ignoreTransactional}
            onCheckedChange={(e) => setIgnoreTransactional(!!e.checked)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control
              mt="1"
              border="sm"
              borderColor="blackAlpha.100"
              _checked={{ bg: "blue.200", borderColor: "blue.200" }}
            />
            <Checkbox.Label>
              <UiText variant="body">Ignore transactional messages</UiText>
              <UiText variant="caption" color="gray.400">
                If selected, a recipient would not be skipped due to smart
                sending if they just received a transactional email.
              </UiText>
            </Checkbox.Label>
          </Checkbox.Root>

          <HStack gap={1} color="blue.200" align="center">
            <UiText color="blue.200">
              Learn more about transactional emails.
            </UiText>
            <ExternalLink size={14} />
          </HStack>
        </Stack>
      </UiBox>

      <UiBox>
        <Stack gap={5}>
          <UiText variant="subheading">Preview emails</UiText>

          <Box maxW="md">
            <UiText variant="body" mb={2}>
              Subject prefix
            </UiText>
            <Input
              value={subjectPrefix}
              onChange={(e) => setSubjectPrefix(e.target.value)}
              border="sm"
              borderColor="blackAlpha.100"
              _hover={{ borderColor: "blue.200" }}
            />
          </Box>

          <UiText variant="body" color="gray.400">
            For example, if you set the prefix to <strong>[PREVIEW]</strong> and
            the subject of the email is <strong>Newsletter</strong>, any preview
            emails will have the subject <strong>[PREVIEW] Newsletter</strong>.
          </UiText>
        </Stack>
      </UiBox>

      <UiBox>
        <Stack gap={5}>
          <Box>
            <UiText variant="subheading">CSS optimization</UiText>
            <UiText variant="body" color="gray.400">
              Avoid getting clipped emails in the inbox.
            </UiText>
          </Box>

          <Checkbox.Root
            checked={enableEmbeddedStyles}
            onCheckedChange={(e) => setEnableEmbeddedStyles(!!e.checked)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control
              mt="1"
              border="sm"
              borderColor="blackAlpha.100"
              _checked={{ bg: "blue.200", borderColor: "blue.200" }}
            />
            <Checkbox.Label>
              <UiText variant="body">Enable embedded styles</UiText>
              <UiText variant="caption" color="gray.400">
                Affects all existing and future email sends, exports, and
                previews
              </UiText>
            </Checkbox.Label>
          </Checkbox.Root>

          <UiText variant="body">
            If disabled, inline CSS will be used. Inline CSS may be required by
            less common email clients or certain regional providers, but will
            increase email sizes which may lead to clipping issues. This
            immediately affects all existing and future email sends, exports,
            and previews in your account.
          </UiText>

          <HStack gap={1} color="blue.200" align="center">
            <UiText color="blue.200">Learn more about CSS optimization.</UiText>
            <ExternalLink size={14} />
          </HStack>
        </Stack>
      </UiBox>
    </Stack>
  );
};

export default EmailSenderPref;
