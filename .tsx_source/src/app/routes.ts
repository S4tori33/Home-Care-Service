import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import BookService from "./pages/BookService";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";
import JobseekerProfile from "./pages/JobseekerProfile";
import ProfileSelector from "./pages/ProfileSelector";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import PlatformAdminDashboard from "./pages/dashboards/PlatformAdminDashboard";
import HRAdminDashboard from "./pages/dashboards/HRAdminDashboard";
import OperationsAdminDashboard from "./pages/dashboards/OperationsAdminDashboard";
import ServiceProviderDashboard from "./pages/dashboards/ServiceProviderDashboard";
import RegularUserDashboard from "./pages/dashboards/RegularUserDashboard";
import CustomerSupportDashboard from "./pages/dashboards/CustomerSupportDashboard";
import ModeratorDashboard from "./pages/dashboards/ModeratorDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/login-success",
    Component: LoginSuccess,
  },
  {
    path: "/book-service",
    Component: BookService,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/profile",
    Component: ProfileSelector,
  },
  {
    path: "/profile/user",
    Component: UserProfile,
  },
  {
    path: "/profile/jobseeker",
    Component: JobseekerProfile,
  },
  // Role-based dashboards
  {
    path: "/dashboard/super-admin",
    Component: SuperAdminDashboard,
  },
  {
    path: "/dashboard/platform-admin",
    Component: PlatformAdminDashboard,
  },
  {
    path: "/dashboard/hr-admin",
    Component: HRAdminDashboard,
  },
  {
    path: "/dashboard/operations-admin",
    Component: OperationsAdminDashboard,
  },
  {
    path: "/dashboard/caregiver",
    Component: ServiceProviderDashboard,
  },
  {
    path: "/dashboard/pet-care",
    Component: ServiceProviderDashboard,
  },
  {
    path: "/dashboard/garden-maintenance",
    Component: ServiceProviderDashboard,
  },
  {
    path: "/dashboard/house-cleaning",
    Component: ServiceProviderDashboard,
  },
  {
    path: "/dashboard/user",
    Component: RegularUserDashboard,
  },
  {
    path: "/dashboard/support",
    Component: CustomerSupportDashboard,
  },
  {
    path: "/dashboard/moderator",
    Component: ModeratorDashboard,
  },
]);
