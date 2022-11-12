import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function Home() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const startDate = new Date("2022-11-14 07:00");
    var current = Date.now();
    //current = new Date("2022-11-14 03:00").getTime();
    const diff = startDate.getTime() - current;
    console.log(diff);

    var counter: any = null;

    if (diff >= 0) {
      setTimer(diff);

      counter = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    }

    return () => {
      if (counter !== null) {
        clearInterval(counter);
      }
    };
  });

  const getInfo = () => {
    const date = new Date(timer);

    return {
      days: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
  };

  return (
    <>
      <Header
        title={`KILLER ${new Date(Date.now()).getFullYear()}`}
        description="Killers nya offeciella hemsida. Följ Killer genom hela eventet och missa aldrig nästa sak"
      />
      <div className="home">
        <h2 className="soon">KILLER startar Mån kl 7:00</h2>
        <h5 className="soon small">
          {getInfo().days - 1} Dagar {getInfo().hours - 1} h{" "}
          {getInfo().minutes < 10 ? `0${getInfo().minutes}` : getInfo().minutes}
          :
          {getInfo().seconds < 10 ? `0${getInfo().seconds}` : getInfo().seconds}
        </h5>
      </div>
    </>
  );
}
