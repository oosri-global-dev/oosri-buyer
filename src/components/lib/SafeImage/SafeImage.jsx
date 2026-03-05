import Image from "next/image";
import { useState, useEffect } from "react";

const PLACEHOLDER = "/images/placeholder.svg";

/**
 * SafeImage — a drop-in replacement for next/image that:
 * 1. Validates `src` is a non-empty string before rendering
 * 2. Catches client-side load errors and swaps to a local placeholder
 * 3. Never causes the Next.js server-side image optimizer to fetch dead URLs
 *
 * Accepts all standard next/image props.
 */
export default function SafeImage({ src, alt = "product image", fallback = PLACEHOLDER, ...props }) {
    const validSrc = src && typeof src === "string" && src.trim() !== "" ? src : fallback;
    const [imgSrc, setImgSrc] = useState(validSrc);

    // Sync when the src prop changes (e.g. carousel thumbnail selection)
    useEffect(() => {
        setImgSrc(src && typeof src === "string" && src.trim() !== "" ? src : fallback);
    }, [src, fallback]);

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
