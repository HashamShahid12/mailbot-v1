import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Campaigns } from "@/pages/campaign/campaign";
import { AuthLayout } from "@/layout/auth/auth-layout";
import { DashboardLayout } from "../layout/dashboard/dashboard-layout";
import AuthGuard from "@/guards/auth-guard";
import ShopConnectionGuard from "@/guards/shop-connection-guard";
import { useAuthStore } from "@/store/auth-store";
import AppLoader from "@/components/ui/loadings/app-loader";
import GrowthTools from "@/pages/audience/growth-tools";
import Profiles from "@/pages/audience/profile";
import ListAndSegment from "@/pages/audience/list-and-segment";
import CreateCampaignByType from "@/pages/campaign/[type]";
import CampaignWizard from "@/pages/campaign/create";
import AnalyticsDashboards from "@/pages/analytics";
import DashboardDetails from "@/pages/analytics/dashboard";
import { Metrics } from "@/pages/analytics/metrics/Metrics";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { onboardingFlow } from "@/onboarding/OnboardingFlow";
import OnboardingSectionPage from "@/components/onboarding/OnboardingSectionPage";
import SegmentationEditDefinition from "@/components/ui/audiance/list-and-segment/segmentation-edit-definition";
import Components from "@/pages/all-components";
import WooIntegrationPage from "@/pages/integration/woo-integration-page";
import LoginForm from "@/pages/auth/login";
import RegisterForm from "@/pages/auth/signup";
import VerifyEmail from "@/pages/auth/verify-email";
import { TwoFactorAuth } from "@/pages/auth/mfa";
import Dashboard from "@/pages/dashboard/dashboard";
import { Experiments } from "@/pages/analytics/experiments/experiments";
import { Forms } from "@/pages/forms/forms";
import CreateFlow from "@/pages/flows/create-flow";
import Flows from "@/pages/flows/flows";
import IndexCreateFlowRoute from "@/components/ui/flows/index-create-flow-route";
import PreventLostSales from "@/components/ui/flows/prevent-lost-sales";
import NurtureSubScribers from "@/components/ui/flows/nurture-subscribers";
import { Rules } from "@/pages/content/rules";
import { GrowthStrategies } from "@/pages/growth-strategies/growth-strategies";
import { CreateForm } from "@/pages/forms/create-forms";
import BuildCustomerLoyalty from "@/components/ui/flows/build-customer-loyalty";
import ReminderPeoplePurchase from "@/components/ui/flows/reminder-people-purchase";
import EncourageRepeatPurchases from "@/components/ui/flows/encourage-repeat-purchases";
import SendOrderUpdates from "@/components/ui/flows/send-order-updates";
import Benchmarks from "@/pages/analytics/benchmarks/benchmarks";
import CustomReports from "@/pages/analytics/custom-reports/custom-reports";
import Deliverability from "@/pages/analytics/deliverability/deliverability";
import Automation from "@/pages/conversations/automation/automation";
import Integration from "@/pages/integrations/integration";
import Sftp from "@/pages/integrations/sftp";
import UploadCsv from "@/pages/integrations/upload-csv";
import DeveloperTools from "@/pages/integrations/developer-tools";
import ManageApps from "@/pages/integrations/manage-apps";
import Objects from "@/pages/content/objects";
import ImagesBrand from "@/pages/content/images-brand";
import Products from "@/pages/content/products";
import UniversalContent from "@/pages/content/universal-content";
import Templates from "@/pages/content/templates";
import ConnectShop from "@/pages/shop/connect-shop";
import EditorPage from "@/pages/editor/editor-page";
import PlansPage from "@/pages/plans/plans-page";
import FlowBuilderPage from "@/pages/flows/flow-builder-page";
import StoreInfo from "@/pages/settings/store-info";
import FooterConfig from "@/pages/settings/footer-config";
import Popups from "@/pages/settings/popups";
import Domain from "@/pages/settings/domain";
import ThemeExtension from "@/pages/settings/theme-extension";
import { Settings } from "@/pages/settings-v2/settings";
import MonitorSettingsAlertLog from "@/pages/settings-v2/monitor-settings-alert-log";
import Downloads from "@/pages/downloads/downloads";

export const AppRoutes = () => {
  const { isLoading } = useAuthStore();

  if (isLoading) return <AppLoader />;

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/twofactor" element={<TwoFactorAuth />} />
      </Route>

      <Route
        element={
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        }
      >
        <Route path="/editor" element={<EditorPage />} />
      </Route>

      <Route
        element={
          <AuthGuard>
            {/* <DashboardLayout /> */}
            <ShopConnectionGuard>
              <DashboardLayout />
            </ShopConnectionGuard>
          </AuthGuard>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/growth-tools" element={<GrowthTools />} />
        <Route path="/list-and-segment" element={<ListAndSegment />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/all-components" element={<Components />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/objects" element={<Objects />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/analytics/dashboard" element={<DashboardDetails />} />
        {/* <Route
          path="/analytics/dashboards/:id"
          element={}
        /> */}
        <Route
          path="/segmentation-edit-definition"
          element={
            <SegmentationEditDefinition
              selectedType="All Types"
              onTypeChange={(type) => console.log("Selected type:", type)}
            />
          }
        />
        <Route path="/store-info" element={<StoreInfo />} />
        <Route path="/footer-config" element={<FooterConfig />} />
        <Route path="/popups" element={<Popups />} />
        <Route path="/domain" element={<Domain />} />
        <Route path="/theme-extension" element={<ThemeExtension />} />

        <Route path="/experiments" element={<Experiments />} />
        <Route path="analytics/metrics" element={<Metrics />} />
        <Route path="/connect-shop" element={<ConnectShop />} />
        <Route path="/benchmarks" element={<Benchmarks />} />
        <Route path="/custom-reports" element={<CustomReports />} />
        <Route path="/deliverability" element={<Deliverability />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/flows" element={<Flows />} />
        <Route path="/integrations" element={<Integration />} />
        <Route path="/sftp" element={<Sftp />} />
        <Route path="/monitor-alert" element={<MonitorSettingsAlertLog />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/developer-tools" element={<DeveloperTools />} />
        <Route path="/manage-apps" element={<ManageApps />} />
        <Route path="/images-brands" element={<ImagesBrand />} />
        <Route path="/products" element={<Products />} />
        <Route path="/universal-content" element={<UniversalContent />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/createflow" element={<CreateFlow />}>
          <Route index element={<IndexCreateFlowRoute />} />
        </Route>
        <Route path="/createflow/create" element={<FlowBuilderPage />} />

        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<Navigate to="setup-your-account" />} />
          {onboardingFlow.map((section) => (
            <Route
              key={section.id}
              path={section.path}
              element={<OnboardingSectionPage section={section} />}
            />
          ))}
        </Route>
        <Route
          path="/integration/woocommerce"
          element={<WooIntegrationPage />}
        />
        <Route path="/form" element={<Forms />} />
        <Route path="/forms/create" element={<CreateForm />} />
        <Route path="/growth-strategies" element={<GrowthStrategies />} />
        <Route path="/new-campaign" element={<CampaignWizard />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/settings/account" element={<>fff</>} /> */}
        {/* </Route> */}
      </Route>
      <Route
        element={
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        }
      >
        <Route path="/integration/upload-csv" element={<UploadCsv />} />

        {/* <Route path="/inbox" element={<Inbox />} /> */}
        <Route
          path="/campaign/create/:type"
          element={<CreateCampaignByType />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
