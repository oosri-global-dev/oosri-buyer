import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const PLACEHOLDER = "/images/placeholder.svg";

/**
 * SafeImage — a drop-in replacement for next/image that:
 * 1. Validates `src` is a non-empty string before rendering
 * 2. Catches client-side load errors and swaps to a local placeholder
 * 3. Intercepts known dead URLs (like via.placeholder.com) to prevent server-side fetch timeouts
 *
 * Accepts all standard next/image props.
 */
export default function SafeImage({ src, alt = "product image", fallback = PLACEHOLDER, ...props }) {
    // Determine the initially safe source
    const getSafeSrc = useCallback((s) => {
        if (!s || typeof s !== "string" || s.trim() === "" || s.includes("via.placeholder.com")) {
            return fallback;
        }
        return s;
    }, [fallback]);

    const [imgSrc, setImgSrc] = useState(getSafeSrc(src));

    // Sync when the src prop changes (e.g. carousel thumbnail selection)
    useEffect(() => {
        setImgSrc(getSafeSrc(src));
    }, [src, getSafeSrc]);

    const handleError = () => {
        setImgSrc(fallback);
    };

    return (
        <Image
            {...props}
            src={imgSrc}
            alt={alt}
            onError={handleError}
        />
    );
}
