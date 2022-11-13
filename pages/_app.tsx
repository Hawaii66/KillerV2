import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "../services/msal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <div className="flex">
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
        <Analytics />
      </MsalProvider>
    </>
  );
}
