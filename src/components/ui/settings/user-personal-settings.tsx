import { Box, Button, HStack, Stack, VStack } from "@chakra-ui/react";
import UiBox from "../box";
import { UiText } from "../text";
import FormField from "../input";
import { useState } from "react";
import UiButton from "../button";
import { EyeOffIcon, GitBranchIcon, HouseIcon, ViewIcon } from "lucide-react";
import { SelectableCardGroup } from "../selectable-card-group";
import PersonalLanguageSet from "./personal-language-set";

interface UserPersonalInfo {
  firstName: string;
  lastName: string;
}

interface LoginEmailInfo {
  email: string;
  currentPassword: string;
}

interface LoginPasswordInfo {
  currentPassword: string;
  newPassword: string;
  verifyNewPassword: string;
}

const UserPersonalSettings = () => {
  const defaultLandingPage = "home";
  const [personalInfo, setPersonalInfo] = useState<UserPersonalInfo>({
    firstName: "",
    lastName: "",
  });
  const [loginEmailInfo, setLoginEmailInfo] = useState<LoginEmailInfo>({
    email: "",
    currentPassword: "",
  });
  const [loginPasswordInfo, setLoginPasswordInfo] = useState<LoginPasswordInfo>(
    {
      currentPassword: "",
      newPassword: "",
      verifyNewPassword: "",
    },
  );
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showCurrentLoginPassword, setShowCurrentLoginPassword] =
    useState(false);
  const [showNewLoginPassword, setShowNewLoginPassword] = useState(false);
  const [showVerifyLoginPassword, setShowVerifyLoginPassword] = useState(false);
  const [landingPage, setLandingPage] = useState(defaultLandingPage);

  const onInfoSave = () => {
    console.log(personalInfo);
  };

  const onLoginEmailSave = () => {
    console.log(loginEmailInfo);
  };

  const onLoginPasswordSave = () => {
    console.log(loginPasswordInfo);
  };

  const onLandingPageSave = () => {
    console.log({ landingPage });
  };

  return (
    <Stack maxW={"720px"} gap={4}>
      <Box>
        <UiText variant="heading2">Personal</UiText>
        <UiText variant="caption">
          Your email is currently <strong>email@email.com</strong> Your role is
          currently
          <strong> Owner.</strong>
        </UiText>
      </Box>

      <UiBox
        heading="Information"
        actions={
          <>
            <UiButton
              disabled={
                personalInfo.firstName.trim() === "" ||
                personalInfo.lastName.trim() === ""
              }
              uiVariant="solid"
              onClick={onInfoSave}
            >
              Save
            </UiButton>
          </>
        }
        showLayout={true}
      >
        <HStack>
          <FormField
            label="First name"
            name="firstName"
            required
            onChange={(name, value) => {
              setPersonalInfo((prev) => {
                return {
                  ...prev,
                  [name]: value,
                };
              });
            }}
            // error={errors.email}
          />
          <FormField
            label="Last name"
            name="lastName"
            required
            onChange={(name, value) => {
              setPersonalInfo((prev) => {
                return {
                  ...prev,
                  [name]: value,
                };
              });
            }}
          />
        </HStack>
      </UiBox>

      <PersonalLanguageSet />

      <UiBox
        heading="Login email"
        description="Verify your password to make changes to your email."
        actions={
          <UiButton
            disabled={
              loginEmailInfo.email.trim() === "" ||
              loginEmailInfo.currentPassword.trim() === ""
            }
            uiVariant="solid"
            onClick={onLoginEmailSave}
          >
            Save
          </UiButton>
        }
        showLayout={true}
      >
        <VStack align="start" gap={6} w="full" maxW="md">
          <FormField
            label="Email"
            name="email"
            type="email"
            required
            value={loginEmailInfo.email}
            onChange={(name, value) => {
              setLoginEmailInfo((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
          />
          <FormField
            label="Current password"
            name="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            required
            value={loginEmailInfo.currentPassword}
            onChange={(name, value) => {
              setLoginEmailInfo((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
            rightElement={
              <Button
                size="sm"
                variant="ghost"
                height="full"
                borderLeftRadius="0"
                border="none"
                borderLeft="sm"
                borderColor="blackAlpha.100"
                _hover={{ bg: "gray.600" }}
                onClick={() => setShowCurrentPassword((prev) => !prev)}
              >
                {showCurrentPassword ? <EyeOffIcon /> : <ViewIcon />}
              </Button>
            }
          />
        </VStack>
      </UiBox>

      <UiBox
        heading="Login password"
        actions={
          <UiButton
            disabled={
              loginPasswordInfo.currentPassword.trim() === "" ||
              loginPasswordInfo.newPassword.trim() === "" ||
              loginPasswordInfo.verifyNewPassword.trim() === "" ||
              loginPasswordInfo.newPassword !==
                loginPasswordInfo.verifyNewPassword
            }
            uiVariant="solid"
            onClick={onLoginPasswordSave}
          >
            Save
          </UiButton>
        }
        showLayout={true}
      >
        <VStack align="start" gap={6} w="full" maxW="md">
          <FormField
            label="Current password"
            name="currentPassword"
            type={showCurrentLoginPassword ? "text" : "password"}
            required
            value={loginPasswordInfo.currentPassword}
            onChange={(name, value) => {
              setLoginPasswordInfo((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
            rightElement={
              <Button
                size="sm"
                variant="ghost"
                height="full"
                borderLeftRadius="0"
                border="none"
                borderLeft="sm"
                borderColor="blackAlpha.100"
                _hover={{ bg: "gray.600" }}
                onClick={() => setShowCurrentLoginPassword((prev) => !prev)}
              >
                {showCurrentLoginPassword ? <EyeOffIcon /> : <ViewIcon />}
              </Button>
            }
          />
          <FormField
            label="New password"
            name="newPassword"
            type={showNewLoginPassword ? "text" : "password"}
            description="Create a password between 12-64 characters."
            required
            value={loginPasswordInfo.newPassword}
            onChange={(name, value) => {
              setLoginPasswordInfo((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
            rightElement={
              <Button
                size="sm"
                variant="ghost"
                height="full"
                borderLeftRadius="0"
                border="none"
                borderLeft="sm"
                borderColor="blackAlpha.100"
                _hover={{ bg: "gray.600" }}
                onClick={() => setShowNewLoginPassword((prev) => !prev)}
              >
                {showNewLoginPassword ? <EyeOffIcon /> : <ViewIcon />}
              </Button>
            }
          />
          <FormField
            label="Verify new password"
            name="verifyNewPassword"
            type={showVerifyLoginPassword ? "text" : "password"}
            required
            value={loginPasswordInfo.verifyNewPassword}
            onChange={(name, value) => {
              setLoginPasswordInfo((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
            rightElement={
              <Button
                size="sm"
                variant="ghost"
                height="full"
                borderLeftRadius="0"
                border="none"
                borderLeft="sm"
                borderColor="blackAlpha.100"
                _hover={{ bg: "gray.600" }}
                onClick={() => setShowVerifyLoginPassword((prev) => !prev)}
              >
                {showVerifyLoginPassword ? <EyeOffIcon /> : <ViewIcon />}
              </Button>
            }
          />
        </VStack>
      </UiBox>

      <UiBox
        heading="Landing page"
        description="Choose a landing page to personalize your experience."
        actions={
          <UiButton
            disabled={landingPage === defaultLandingPage}
            uiVariant="solid"
            onClick={onLandingPageSave}
          >
            Save
          </UiButton>
        }
        showLayout={true}
      >
        <SelectableCardGroup
          value={landingPage}
          onChange={setLandingPage}
          options={[
            {
              value: "home",
              icon: HouseIcon,
              label: "Home",
              description:
                "Most helpful if you are a marketer or using Klaviyo primarily as a marketing tool",
            },
            {
              value: "developer_dashboard",
              icon: GitBranchIcon,
              label: "Developer Dashboard",
              description:
                "Most helpful if you are a developer or using Klaviyo primarily to build integrations",
            },
          ]}
        />
      </UiBox>

      <UiBox
        heading="Create a new account"
        description="Create a new account
Set up an additional Mailbot account using your existing login information. You will be able to easily toggle between your accounts while logged in."
        actions={
          <UiButton uiVariant="solid" onClick={() => {}}>
            Create Account
          </UiButton>
        }
        showLayout={true}
      ></UiBox>
    </Stack>
  );
};

export default UserPersonalSettings;
