import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,300"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <div className="flex">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}
