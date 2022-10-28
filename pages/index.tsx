import Head from "next/head";
import Image from "next/image";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function Home() {
  const title = `KILLER ${new Date(Date.now()).getFullYear()}`;

  return (
    <>
      <Header
        title={`KILLER ${new Date(Date.now()).getFullYear()}`}
        description="Killers nya offeciella hemsida. Följ Killer genom hela eventet och missa aldrig nästa sak"
      />
      <div className="home">
        <h2 className="soon">KILLER startar snart...</h2>
        <h5 className="soon small">Medan du väntar kan du anmäla dig nedan</h5>
        <a href="https://forms.office.com/r/4dZWTE7nd2" target="_blank">
          Anmäl dig till killer här 👈
        </a>
      </div>
    </>
  );
}
