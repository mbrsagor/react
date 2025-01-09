const BASE_URL = "http://18.214.74.178";
const apiURL = "/api/v1";

export const endpoint = `${BASE_URL}${apiURL}`;

export const user = `${endpoint}/user`;

export const sentOTP = `${user}/signup-send-otp/`;
export const verifyOTP = `${user}/signup-verify-otp/`;
export const loginURL = `${user}/signin/`;
export const signupURL = `${user}/signup/`;
export const passwordResetURL = `${user}/password-reset/`;
export const passwordChangeConfirmURL = `${user}/password-change-confirm/`;
export const passwordChangeURL = (id) => `${user}/password-change/${id}/`;
