export const BASE_URL = "http://127.0.0.1:8000";
// export const BASE_URL = "http://18.214.74.178";
export const apiURL = "/api/v1";

export const endpoint = `${BASE_URL}${apiURL}`;

export const user = `${endpoint}/user`;
export const event = `${endpoint}/event`;
export const sponsor = `${endpoint}/sponsor`;

// Auth endpoints
export const sentOTP = `${user}/signup-send-otp/`;
export const verifyOTP = `${user}/signup-verify-otp/`;
export const loginURL = `${user}/signin/`;
export const signupURL = `${user}/signup/`;
export const profileURL = `${user}/profile/`;
export const passwordResetURL = `${user}/password-reset/`;
export const passwordChangeConfirmURL = `${user}/password-change-confirm/`;
export const passwordChangeURL = (id) => `${user}/password-change/${id}/`;

// Sponsor endpoints
export const SponsorHome = `${event}/company-home-api/`;
export const MyEvents = `${event}/events/`;
export const MyCategories = `${event}/categories/`;
export const MyPackages = `${event}/packages/`;
export const MyTicketPrice = `${event}/ticket-price/`;
export const MyGuards = `${user}/guards/`;
export const GuardSignUp = `${user}/signup-guard/`;
export const InvitationURL = `${sponsor}/generate-invitation-link/`;
export const EventDetailURL = (id) => `${event}/event/${id}/`;
export const EventDeleteURL = (id) => `${event}/event/${id}/`;
export const CategoryDeleteURL = (id) => `${event}/category/${id}/`;
export const PackageDeleteURL = (id) => `${event}/package/${id}/`;
export const PriceDeleteURL = (id) => `${event}/ticket-price/${id}/`;
export const GuardDeleteURL = (id) => `${user}/guard/${id}/`;
