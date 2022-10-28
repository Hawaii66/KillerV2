import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useWindowSize from "../Hooks/WindowSize";

function Navbar() {
  const size = useWindowSize();
  const [showBottom, setShowBottom] = useState(false);

  if (size.width <= 850) {
    return (
      <>
        <div className="navbar">
          <div>
            <img src="/Images/Logo.jpg" />
            <h1>{`Killer ${new Date(Date.now()).getFullYear()}`}</h1>
          </div>
          <button onClick={() => setShowBottom((o) => !o)}>
            <img className="icon" src="menu.svg" />
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
              <Link href={"/howto"}>Så här fungerar Killer</Link>
            </p>
            <p>
              <Link href={"/elevkaren"}>Elevkåren</Link>
            </p>
          </div>
        )}
      </>
    );
  }

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
          <Link href={"/howto"}>Så här fungerar Killer</Link>
        </p>
        <p>
          <Link href={"/elevkaren"}>Elevkåren</Link>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
