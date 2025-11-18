"use client";

//import { useAuthStore } from "@/store/authStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const user = useAuthStore((state) => state.user);

  return (
    <>
      {/* {user && <Header />} */}
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      {/* {user && <Footer />} */}
    </>
  );
}