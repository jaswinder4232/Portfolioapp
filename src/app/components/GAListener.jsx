"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GAListener() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url =
            pathname + (searchParams?.toString() ? `?${searchParams}` : "");

        window.gtag("config", "G-R7RDP2W2QZ", {
            page_path: url,
        });
    }, [pathname, searchParams]);

    return null;
}
