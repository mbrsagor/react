import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./services/ProtectedRoute";
import Dashboard from "./pages/dashboard/dashboard";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import SponsorSignUp from "./pages/signup/sponsorSignUp";
import SendOTP from "./pages/otp/sendOTP";
import VerifyOTP from "./pages/otp/verifyOTP";
import UserType from "./pages/type/userType";
import AnimationSkeleton from './components/skeleton'
import Layout from "./components/layout";
import NotFound from "./pages/error/not_found";
import Sponsor from "./pages/sponsor/sponsor";
import Guard from "./pages/guard/guard";
import EventListPage from "./pages/event/event_list_page";
import ChangePassword from "./pages/signin/change_password/changePassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* private route */}
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
          <Route path="/skeleton" element={<ProtectedRoute> <AnimationSkeleton /></ProtectedRoute>}/>
          <Route path="/events" element={<ProtectedRoute> <EventListPage /></ProtectedRoute>}/>
          <Route path="/guard" element={<ProtectedRoute> <Guard /></ProtectedRoute>}/>
          <Route path="/sponsor" element={<ProtectedRoute> <Sponsor /></ProtectedRoute>}/>
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
