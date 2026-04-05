const TOKEN_KEY = "sms_access_token";
const REFRESH_TOKEN_KEY = "sms_refresh_token";

export const authStorage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setTokens(access, refresh) {
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },
};
