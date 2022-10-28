import Head from "next/head";
import React, { useEffect, useState } from "react";

interface Props {
  title: string;
  description: string;
}

interface Droplet {
  x: number;
  y: number;
}

function Header({ title, description }: Props) {
  return (
    <div className="headerdiv">
      <Head>
        <title>{`${title} | Nyköpings Enskilda Gymnasium`}</title>
        <meta name="description" content={description} />
        <meta name="author" content="HawaiiDev" />
      </Head>
      <h1 className="headertext">{title}</h1>
    </div>
  );
}

export default Header;
