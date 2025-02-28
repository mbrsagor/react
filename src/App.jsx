import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
// Theme context
// import ThemeContextProvider from "./context/ThemeContext";
// Main home page
import Homepage from "./pages/home/host_home/home";
import SponsorHome from "./pages/home/sponsor_home/sponsorHome";
// Auth
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import SponsorSignUp from "./pages/signup/sponsorSignUp";
import SendOTP from "./pages/otp/sendOTP";
import VerifyOTP from "./pages/otp/verifyOTP";
import UserType from "./pages/type/userType";
// Main base layout
import Layout from "./components/layout";
// Page not found
import NotFound from "./pages/error/not_found";
// Sponsor
import Sponsor from "./pages/sponsor/sponsor";
// Guard
import GuardHome from "./pages/home/guard_home/guardHome";
import Guard from "./pages/guard/guards/guard";
import GuardAssignEvent from "./pages/guard/assign_task/assignTask";
import ScanTicket from "./pages/guard/scan_ticket/scanTicket";
// Profile
import Profile from "./pages/profile/profile";
import ProfileUpdate from "./pages/profile/profile_update/profileUpdate";
// Categories all pages
import BulkRegistration from "./pages/bulk_reg/bulkRegistration";
// import QRScanner from "./pages/bulk_reg/QRScanner";
// Categories all pages
import Categories from "./pages/category/category_lv/categories";
// Bulk ticket page
import BulkTicket from "./pages/ticket/bulk_ticket/bulkTicket";
// Sponsor tickets
import EventTicket from "./pages/ticket/event_ticket/eventTicket";
// Prices all pages
import Prices from "./pages/ticket/price_lv/prices";
// packages all pages
import PackageList from "./pages/package/package_lv/packages";
// Sponsor Payment history
import SponsorPaymentHistory from "./pages/host/payment_history/SponsorPaymentHistory";
// Host/company Payment history
import PaymentHistoryLv from "./pages/payment_history/paymentHistoryLv";
// Event all pages
import EventListPage from "./pages/event/event_lv/event_list_page";
import SponsorEventList from "./pages/event/event_lv/sponsorEventList";
import EventGenericLv from "./pages/event/event_lv/eventGenericLv";
import EventDetails from "./pages/event/event_details/event_detail";
import PurchaseEventDetail from "./pages/event/event_details/purchaseEventDetail";
import SponsorEventDetails from "./pages/home/sponsor_home/sponsorEventDetail";
import PurchaseSuccess from "./pages/event/event_details/purchaseSuccess";
import CreateEvent from "./pages/event/create_event/createEvent";
import EventUpdate from "./pages/event/event_update/eventUpdate";
import FavoriteEvent from "./pages/event/favorite_event/FavoriteEvent";
import AssignEvent from "./pages/event/assign_event/assignEvent";
// App Settings
import Settings from "./pages/settings/settings";
// Feedback Settings
import Feedback from "./pages/settings/feedback/feedback";
// Payment settings
import PaymentSetting from "./pages/settings/payment_setting/paymentSetting";
// Sponsor Host
import MyHosts from "./pages/host/myHos";
import HostDetails from "./pages/host/hostDetails";
import AllHostListView from "./pages/host/allHost";
// Change password
import ChangePassword from "./pages/signin/change_password/changePassword";

export default function App() {
  return (
    // <ThemeContextProvider>
    <BrowserRouter>
      <Routes>
        {/* private route */}
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<ProtectedRoute> <Homepage /></ProtectedRoute>}/>
          <Route path="/sponsor-home" element={<ProtectedRoute> <SponsorHome /></ProtectedRoute>}/>
          <Route path="/guard-home" element={<ProtectedRoute> <GuardHome /></ProtectedRoute>}/>
          <Route path="/sponsor-purchase-events" element={<ProtectedRoute> <SponsorEventList /></ProtectedRoute>}/>
          <Route path="/purchase-event-detail/:id" element={<ProtectedRoute> <PurchaseEventDetail /></ProtectedRoute>}/>
          <Route path="/prices" element={<ProtectedRoute> <Prices /></ProtectedRoute>}/>
          <Route path="/categories" element={<ProtectedRoute> <Categories /></ProtectedRoute>}/>
          <Route path="/bulk-reg" element={<ProtectedRoute> <BulkRegistration /></ProtectedRoute>}/>
          <Route path="/bulk-ticket" element={<ProtectedRoute> <BulkTicket /></ProtectedRoute>}/>
          <Route path="/event-ticket" element={<ProtectedRoute> <EventTicket /></ProtectedRoute>}/>
          <Route path="/packages" element={<ProtectedRoute> <PackageList /></ProtectedRoute>}/>
          <Route path="/create-event" element={<ProtectedRoute> <CreateEvent /></ProtectedRoute>}/>
          <Route path="/assign-events" element={<ProtectedRoute> <AssignEvent /></ProtectedRoute>}/>
          <Route path="/events" element={<ProtectedRoute> <EventListPage /></ProtectedRoute>}/>
          <Route path="/generic-events" element={<ProtectedRoute> <EventGenericLv /></ProtectedRoute>}/>
          <Route path="/event/:id" element={<ProtectedRoute> <EventDetails /></ProtectedRoute>}/>
          <Route path="/sponsor-event/:id" element={<ProtectedRoute> <SponsorEventDetails /></ProtectedRoute>}/>
          <Route path="/event-update/:id" element={<ProtectedRoute> <EventUpdate /></ProtectedRoute>}/>
          <Route path="/favorite-event" element={<ProtectedRoute> <FavoriteEvent /></ProtectedRoute>}/>
          <Route path="/sponsor" element={<ProtectedRoute> <Sponsor /></ProtectedRoute>}/>
          <Route path="/guard" element={<ProtectedRoute> <Guard /></ProtectedRoute>}/>
          <Route path="/assign-event/:id" element={<ProtectedRoute> <GuardAssignEvent /></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>}/>
          <Route path="/profile_update/:id" element={<ProtectedRoute> <ProfileUpdate /></ProtectedRoute>}/>
          <Route path="/payment-history" element={<ProtectedRoute> <PaymentHistoryLv /></ProtectedRoute>}/>
          <Route path="/sponsor-payment-history" element={<ProtectedRoute> <SponsorPaymentHistory /></ProtectedRoute>}/>
          <Route path="/settings" element={<ProtectedRoute> <Settings /></ProtectedRoute>}/>
          <Route path="/scan-qr/:event_id" element={<ProtectedRoute> <ScanTicket /></ProtectedRoute>}/>
          <Route path="/payment-setting" element={<ProtectedRoute> <PaymentSetting /></ProtectedRoute>}/>
          <Route path="/feedback" element={<ProtectedRoute> <Feedback /></ProtectedRoute>}/>
          <Route path="/hosts" element={<ProtectedRoute> <MyHosts /></ProtectedRoute>}/>
          <Route path="/purchase-success" element={<ProtectedRoute> <PurchaseSuccess /></ProtectedRoute>}/>
          <Route path="/host/:host" element={<ProtectedRoute> <HostDetails /></ProtectedRoute>}/>
          <Route path="/all-hosts" element={<ProtectedRoute> <AllHostListView /></ProtectedRoute>}/>
        </Route>
        {/* public route */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="sponsor-signup" element={<SponsorSignUp />} />
        <Route path="sent-otp" element={<SendOTP />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="user-type" element={<UserType />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    // </ThemeContextProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
