const BLOCKED_TAGS = [
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "link",
  "meta",
  "base",
  "form",
  "input",
  "button",
  "textarea",
  "select",
  "option",
  "svg",
  "math",
];

const SAFE_URL_PATTERN =
  /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#|\.{1,2}\/)/i;

export function getSafeRedirectPath(targetPath, fallback = "/") {
  if (typeof targetPath !== "string") {
    return fallback;
  }

  const trimmedPath = targetPath.trim();
  if (!trimmedPath || trimmedPath.startsWith("//") || trimmedPath.startsWith("\\")) {
    return fallback;
  }

  if (typeof window === "undefined") {
    return trimmedPath.startsWith("/") ? trimmedPath : fallback;
  }

  try {
    const url = new URL(trimmedPath, window.location.origin);
    if (url.origin !== window.location.origin) {
      return fallback;
    }

    const safePath = `${url.pathname}${url.search}${url.hash}`;
    return safePath.startsWith("/") ? safePath : fallback;
  } catch (_error) {
    return fallback;
  }
}

export function sanitizeHtml(html) {
  if (!html) {
    return "";
  }

  let sanitized = String(html);

  BLOCKED_TAGS.forEach((tag) => {
    const pairedTagPattern = new RegExp(
      `<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`,
      "gi"
    );
    const singleTagPattern = new RegExp(`<${tag}\\b[^>]*\\/?>`, "gi");

    sanitized = sanitized.replace(pairedTagPattern, "");
    sanitized = sanitized.replace(singleTagPattern, "");
  });

  sanitized = sanitized
    .replace(/\s(?:on\w+|srcdoc|formaction)\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\s(?:on\w+|srcdoc|formaction)\s*=\s*[^\s>]+/gi, "")
    .replace(/\sstyle\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\sstyle\s*=\s*[^\s>]+/gi, "")
    .replace(/\s(?:href|src|xlink:href)\s*=\s*(['"])\s*javascript:[^'"]*\1/gi, "")
    .replace(/\s(?:href|src|xlink:href)\s*=\s*(['"])\s*data:[^'"]*\1/gi, "");

  sanitized = sanitized.replace(
    /<(a|img)\b([^>]*)>/gi,
    (fullMatch, tagName, attributes) => {
      let nextAttributes = attributes;

      nextAttributes = nextAttributes.replace(
        /\s(href|src)\s*=\s*(['"])(.*?)\2/gi,
        (attributeMatch, attributeName, quote, value) => {
          const trimmedValue = value.trim();
          if (!SAFE_URL_PATTERN.test(trimmedValue)) {
            return "";
          }
          return ` ${attributeName}=${quote}${trimmedValue}${quote}`;
        }
      );

      if (tagName.toLowerCase() === "a" && /target\s*=\s*(['"])_blank\1/i.test(nextAttributes)) {
        if (!/\srel\s*=/i.test(nextAttributes)) {
          nextAttributes += ' rel="noopener noreferrer"';
        }
      }

      return `<${tagName}${nextAttributes}>`;
    }
  );

  return sanitized;
}
