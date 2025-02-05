import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "@/styles/globals.css";
import Head from "next/head";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideLayoutOnPages = ["/login", "/register", "/verify-otp",];
  const shouldHideLayout = hideLayoutOnPages.includes(router.pathname);

  return (
    <div className=" bg-[#010101]">
      <Head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        {/* Font Links */}
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* {!shouldHideLayout && <Navbar />} */}
      <Component {...pageProps} />
      {/* {!shouldHideLayout && <Footer />} */}
    </div>
  );
}
