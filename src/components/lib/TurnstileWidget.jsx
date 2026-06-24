import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const SCRIPT_ID = "cloudflare-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise;

const loadTurnstileScript = () => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile can only run in the browser."));
  }

  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.turnstile), { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.turnstile);
    script.onerror = () => {
      scriptPromise = null;
      document.head.removeChild(script);
      reject(new Error("Turnstile script failed to load."));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
};

const TurnstileWidget = forwardRef(function TurnstileWidget({ action }, ref) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const tokenRef = useRef("");
  const pendingResolveRef = useRef(null);
  const pendingRejectRef = useRef(null);
  const [loadError, setLoadError] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const reset = () => {
    tokenRef.current = "";
    if (window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  useEffect(() => {
    let cancelled = false;

    if (!siteKey) {
      setLoadError("Verification is not configured.");
      return undefined;
    }

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !containerRef.current || widgetIdRef.current !== null) return;

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          size: "flexible",
          callback: (token) => {
            tokenRef.current = token;
            pendingResolveRef.current?.(token);
            pendingResolveRef.current = null;
            pendingRejectRef.current = null;
          },
          "expired-callback": () => {
            tokenRef.current = "";
          },
          "error-callback": () => {
            tokenRef.current = "";
            pendingRejectRef.current?.(new Error("Human verification failed. Please retry."));
            pendingResolveRef.current = null;
            pendingRejectRef.current = null;
          },
        });
      })
      .catch(() => {
        if (!cancelled) setLoadError("Verification could not load. Refresh and try again.");
      });

    return () => {
      cancelled = true;
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [action, siteKey]);

  useImperativeHandle(ref, () => ({
    reset,
    getFreshToken: () => {
      if (loadError) return Promise.reject(new Error(loadError));
      if (!window.turnstile || widgetIdRef.current === null) {
        return Promise.reject(new Error("Verification is still loading. Please retry."));
      }

      tokenRef.current = "";
      return new Promise((resolve, reject) => {
        pendingResolveRef.current = resolve;
        pendingRejectRef.current = reject;
        window.turnstile.reset(widgetIdRef.current);
        window.turnstile.execute(widgetIdRef.current);
      });
    },
  }));

  return (
    <>
      <div ref={containerRef} />
      {loadError ? <p role="alert">{loadError}</p> : null}
    </>
  );
});

export default TurnstileWidget;
