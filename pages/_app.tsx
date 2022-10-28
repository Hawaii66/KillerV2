import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="flex">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}
