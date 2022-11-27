import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useWindowSize from "../Hooks/WindowSize";
import dynamic from "next/dynamic";

function Navbar() {
  const size = useWindowSize();
  const [showBottom, setShowBottom] = useState(false);

  if (size.width < 940) {
    return (
      <>
        <div className="navbar">
          <div>
            <img src="/Images/Logo.jpg" />
            <h1>{`Killer ${new Date(Date.now()).getFullYear()}`}</h1>
          </div>
          <button onClick={() => setShowBottom((o) => !o)}>
            <p>Meny</p>
          </button>
        </div>
        {showBottom && (
          <div>
            <p>
              <Link href={"/"}>Startsida</Link>
            </p>
            <p>
              <Link href={"/stats"}>Statistik</Link>
            </p>
            <p>
              <Link href={"/rules"}>Regler</Link>
            </p>
            <p>
              <Link href={"/howto"}>Begrepp</Link>
            </p>
            <p>
              <Link href={"/profil"}>Profil</Link>
            </p>
            <p>
              <Link href={"/elevkaren"}>Enskildakåren</Link>
            </p>
          </div>
        )}
      </>
    );
  }

  const LoginComp = dynamic(() => import("react-microsoft-login"), {
    ssr: false,
  });

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/Images/Logo.jpg" />
        <h1>{`Killer ${new Date(Date.now()).getFullYear()}`}</h1>
      </div>
      <div className="links">
        <p>
          <Link href={"/"}>Startsida</Link>
        </p>
        <p>
          <Link href={"/stats"}>Statistik</Link>
        </p>
        <p>
          <Link href={"/rules"}>Regler</Link>
        </p>
        <p>
          <Link href={"/howto"}>Begrepp</Link>
        </p>
        <p>
          <Link href={"/profil"}>Profil</Link>
        </p>
        <p>
          <Link href={"/elevkaren"}>Enskildakåren</Link>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
