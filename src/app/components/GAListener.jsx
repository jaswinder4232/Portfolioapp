"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function GAListenerContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!window.gtag) return;

        const url =
            pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

        window.gtag("config", "G-R7RDP2W2QZ", {
            page_path: url,
        });
    }, [pathname, searchParams]);

    return null;
}

export default function GAListener() {
    return (
        <Suspense fallback={null}>
            <GAListenerContent />
        </Suspense>
    );
}

