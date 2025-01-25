import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
import Homepage from "./pages/home/home";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import SponsorSignUp from "./pages/signup/sponsorSignUp";
import SendOTP from "./pages/otp/sendOTP";
import VerifyOTP from "./pages/otp/verifyOTP";
import UserType from "./pages/type/userType";
import Layout from "./components/layout";
import NotFound from "./pages/error/not_found";
import Sponsor from "./pages/sponsor/sponsor";
import Guard from "./pages/guard/guards/guard";
import Profile from "./pages/profile/profile";
// Categories all pages
import Categories from "./pages/category/category_lv/categories";
// Prices all pages
import Prices from "./pages/ticket_price/price_lv/prices";
// packages all pages
import PackageList from "./pages/package/package_lv/packages";
// Event all pages
import EventListPage from "./pages/event/event_lv/event_list_page";
import EventDetails from "./pages/event/event_details/event_detail";
import CreateEvent from "./pages/event/create_event/createEvent";
import EventUpdate from "./pages/event/event_update/eventUpdate";
import ChangePassword from "./pages/signin/change_password/changePassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* private route */}
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<ProtectedRoute> <Homepage /></ProtectedRoute>}/>
          <Route path="/prices" element={<ProtectedRoute> <Prices /></ProtectedRoute>}/>
          <Route path="/categories" element={<ProtectedRoute> <Categories /></ProtectedRoute>}/>
          <Route path="/packages" element={<ProtectedRoute> <PackageList /></ProtectedRoute>}/>
          <Route path="/create-event" element={<ProtectedRoute> <CreateEvent /></ProtectedRoute>}/>
          <Route path="/events" element={<ProtectedRoute> <EventListPage /></ProtectedRoute>}/>
          <Route path="/event/:id" element={<ProtectedRoute> <EventDetails /></ProtectedRoute>}/>
          <Route path="/event-update/:id" element={<ProtectedRoute> <EventUpdate /></ProtectedRoute>}/>
          <Route path="/sponsor" element={<ProtectedRoute> <Sponsor /></ProtectedRoute>}/>
          <Route path="profile" element={<Profile />} />
          <Route path="guard" element={<Guard />} />
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
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
