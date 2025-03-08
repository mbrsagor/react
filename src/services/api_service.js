const ENV = import.meta.env.MODE; // Vite automatically sets this

const API_URLS = {
  development: import.meta.env.VITE_DEVELOPMENT_API_URL,
  staging: import.meta.env.VITE_STAGING_API_URL,
  production: import.meta.env.VITE_PRODUCTION_API_URL,
};

export const BASE_URL = API_URLS[ENV] || API_URLS.development;

console.log("Current Environment:", ENV);
console.log("API URL:", BASE_URL);

export const apiURL = "/api/v1";

export const endpoint = `${BASE_URL}${apiURL}`;

export const app = `${endpoint}/app`;
export const user = `${endpoint}/user`;
export const event = `${endpoint}/event`;
export const sponsor = `${endpoint}/sponsor`;
export const ticket = `${endpoint}/ticket`;

// Auth endpoints
export const sentOTP = `${user}/signup-send-otp/`;
export const verifyOTP = `${user}/signup-verify-otp/`;
export const loginURL = `${user}/signin/`;
export const signupURL = `${user}/signup/`;
export const profileURL = `${user}/profile/`;
export const ProfileUpdateURL = (id) => `${user}/profile/${id}/`;
export const passwordResetURL = `${user}/password-reset/`;
export const passwordChangeConfirmURL = `${user}/password-change-confirm/`;
export const passwordChangeURL = (id) => `${user}/change-password/${id}/`;
export const changePhoneNumberURL = (id) => `${user}/change-phone/${id}/`;
export const deleteAccountURL = (id) => `${user}/account-delete/${id}/`;
export const ProfileSwitchURL = (id) => `${user}/change-role/${id}/`;

// Host/Company endpoints
export const SponsorHome = `${event}/company-home-api/`;
export const MyEvents = `${event}/events/`;
export const AssignedEvents = `${event}/assign-events/`;
export const MyCategories = `${event}/categories/`;
export const MyPackages = `${event}/packages/`;
export const FeedBackURL = `${app}/feedback/`;
export const MyTicketPrice = `${event}/ticket-price/`;
export const MyGuards = `${user}/guards/`;
export const GuardSignUp = `${user}/signup-guard/`;
export const InvitationURL = `${sponsor}/generate-invitation-link/`;
export const TransactionURL = `${sponsor}/transaction-history-list/web/`;
export const EventDetailURL = (id) => `${event}/event/${id}/`;
export const EventDeleteURL = (id) => `${event}/event/${id}/`;
export const CategoryDeleteURL = (id) => `${event}/category/${id}/`;
export const PackageDeleteURL = (id) => `${event}/package/${id}/`;
export const PriceDeleteURL = (id) => `${event}/ticket-price/${id}/`;
export const GuardDeleteURL = (id) => `${user}/guard/${id}/`;
export const AssignEventDeleteURL = (id) => `${event}/assign-event/${id}/`;

// Sponsor endpoints
export const SponsorHomeURL = `${sponsor}/sponsor-home/`;
export const SeeMoreEvents = (id) => `${sponsor}/popular-events/?event_type=${id}`;
export const FollowersURL = `${sponsor}/followers/`;
export const UnFollowersURL = (id) => `${sponsor}/follower/${id}/`;
export const SponsorPaymentHistoryURL = `${event}/payment-history/`;
export const FavoriteSavedEventURL = `${event}/favorite-event/`;
export const FavoriteEventURL = `${event}/favorite-event/`;
export const DeleteFavoriteEventURL = (id) => `${event}/favorite-event/${id}/`;
export const EventFilterByHost = `${event}/event-by-host/`;
export const HostDetailsURL = (id) => `${user}/host-profile/${id}/`;
export const purchaseEventDetailURL = (id) => `${sponsor}/purchase-event/${id}/`;
export const PurchaseEventListURL = `${sponsor}/purchase-event/`;
export const HostListURL = `${sponsor}/hosts/`;
export const SponsorGetTicketURL = (event, pkg) => `${sponsor}/tickets/?event=${event}&package=${pkg}`;

// Guard endpoints
export const GuardHomeURL = `${event}/guard-dashboard/`;
export const GuardAssignEvents = `${event}/guard-assign-events/`;
export const VerifyTicket = (eventID, ticket_number) => `${event}/verify-ticket/?event_id=${eventID}&ticket_number=${ticket_number}`;

// Ticket endpoints
export const BulkTicketURL = `${ticket}/bulk-tickets/`;
export const PremiumBulkTicketURL = `${ticket}/premium-bulk-ticket/`;
export const ComplementaryBulkTicketURL = `${ticket}/complementary-bulk-ticket/`;
export const VerifyComplementaryBulkTicketURL = `${ticket}/verify-complementary-ticket/`;
// Payment endpoints
export const AddAccountURL = `${event}/add-bank-card-account/`;
export const MyAccountsURL = (customerID) => `${event}/stripe-customer-accounts/?stripe_customer_id=${customerID}`;
export const RemoveAccountURL = () => `${event}/stripe-delete-account/`;

// New Payment API
export const CreatePaymentIntent = `${event}/create-stripe-payment-intent/`;
export const PurchaseEventPackageURL = `${event}/purchase-event-package/`;
