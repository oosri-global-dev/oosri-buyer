const DEFAULT_COOKIE_EXP_DAYS = 7;
const BUYER_SESSION_COOKIE = "buyer_session";
const BUYER_AT_COOKIE = "buyer_at";
const BUYER_RT_COOKIE = "buyer_rt";

const getCookieAttributes = (expDays = DEFAULT_COOKIE_EXP_DAYS) => {
  const attributes = ["path=/", "SameSite=Lax"];

  if (Number.isFinite(expDays)) {
    const date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    attributes.push(`expires=${date.toUTCString()}`);
  }

  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    attributes.push("Secure");
  }

  return attributes.join("; ");
};

export function storeDataInCookie(
  cName,
  cValue,
  expDays = DEFAULT_COOKIE_EXP_DAYS
) {
  if (
    typeof window !== "undefined" &&
    cName &&
    cValue !== undefined &&
    cValue !== null
  ) {
    const encodedValue = encodeURIComponent(String(cValue));
    window.document.cookie = `${cName}=${encodedValue}; ${getCookieAttributes(
      expDays
    )}`;
  }
}

export function getDataInCookie(cName) {
  if (typeof window !== "undefined") {
    const name = cName + "=";
    const cArr = window.document.cookie.split("; ");
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) {
        res = decodeURIComponent(val.substring(name.length));
      }
    });
    return res;
  }
}

export function deleteDataInCookie(cName) {
  if (typeof window !== "undefined") {
    const secureAttribute =
      window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax${secureAttribute}`;
  }
}

export function storeAuthTokens(accessToken, refreshToken) {
  if (typeof window === "undefined") return;

  if (accessToken && typeof accessToken === "string") {
    // Access token matches backend maxAge of 3 days
    storeDataInCookie(BUYER_AT_COOKIE, accessToken, 3);
  }
  if (refreshToken && typeof refreshToken === "string") {
    storeDataInCookie(BUYER_RT_COOKIE, refreshToken, 7);
  }
  if (accessToken || refreshToken) {
    storeDataInCookie(BUYER_SESSION_COOKIE, "1");
  }
}

export function getBuyerAccessToken() {
  return getDataInCookie(BUYER_AT_COOKIE) || null;
}

export function getBuyerRefreshToken() {
  return getDataInCookie(BUYER_RT_COOKIE) || null;
}

export function clearAuthSession() {
  if (typeof window !== "undefined") {
    deleteDataInCookie("_id");
    deleteDataInCookie(BUYER_SESSION_COOKIE);
    deleteDataInCookie(BUYER_AT_COOKIE);
    deleteDataInCookie(BUYER_RT_COOKIE);
  }
}

export function hasBuyerSession() {
  return getDataInCookie(BUYER_SESSION_COOKIE) === "1";
}

export function deleteAllCookie() {
  clearAuthSession();
}
