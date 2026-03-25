const DEFAULT_COOKIE_EXP_DAYS = 7;

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
  storeDataInCookie("access_token", accessToken);
  storeDataInCookie("refresh_token", refreshToken);

  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem("refresh_token");
  }
}

export function clearAuthSession() {
  if (typeof window !== "undefined") {
    deleteDataInCookie("_id");
    deleteDataInCookie("access_token");
    deleteDataInCookie("refresh_token");
    window.sessionStorage.removeItem("refresh_token");
  }
}

export function deleteAllCookie() {
  clearAuthSession();
}
