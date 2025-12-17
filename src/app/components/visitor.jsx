"use client";
import { useEffect } from "react";


export default function Home() {

const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    fetch(`${baseurl}api/notify-visit/`, {
      method: "POST",
    });
  }, []);

  return null;
}
