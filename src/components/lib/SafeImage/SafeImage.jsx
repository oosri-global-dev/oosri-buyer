import Image from "next/image";
import { useState, useEffect } from "react";

const PLACEHOLDER = "/images/placeholder.svg";

/**
 * SafeImage — a drop-in replacement for next/image that:
 * 1. Validates `src` is a non-empty string before rendering
 * 2. Catches client-side load errors and swaps to a local placeholder
<<<<<<< HEAD
 * 3. Never causes the Next.js server-side image optimizer to fetch dead URLs
=======
 * 3. Intercepts known dead URLs (like via.placeholder.com) to prevent server-side fetch timeouts
>>>>>>> dadac6ae3e42be6c348c3808c1c5b93e79b835f9
 *
 * Accepts all standard next/image props.
 */
export default function SafeImage({ src, alt = "product image", fallback = PLACEHOLDER, ...props }) {
<<<<<<< HEAD
    const validSrc = src && typeof src === "string" && src.trim() !== "" ? src : fallback;
    const [imgSrc, setImgSrc] = useState(validSrc);

    // Sync when the src prop changes (e.g. carousel thumbnail selection)
    useEffect(() => {
        setImgSrc(src && typeof src === "string" && src.trim() !== "" ? src : fallback);
=======
    // Determine the initially safe source
    const getSafeSrc = (s) => {
        if (!s || typeof s !== "string" || s.trim() === "" || s.includes("via.placeholder.com")) {
            return fallback;
        }
        return s;
    };

    const [imgSrc, setImgSrc] = useState(getSafeSrc(src));

    // Sync when the src prop changes (e.g. carousel thumbnail selection)
    useEffect(() => {
        setImgSrc(getSafeSrc(src));
>>>>>>> dadac6ae3e42be6c348c3808c1c5b93e79b835f9
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
