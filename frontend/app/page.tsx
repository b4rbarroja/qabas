"use client";
import Hero from "./components/main/hero/Hero";
import AboutPage from "./components/main/about/About";
import ContactUs from "./components/main/contact/Contact";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const cookieCheck = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          router.push("/dashboard");
        } else {
          return;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };
    cookieCheck();
  }, []);

  return (
    <>
      <Hero />
      <AboutPage />
      <ContactUs />
    </>
  );
}
