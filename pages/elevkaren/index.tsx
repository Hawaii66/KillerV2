import React from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

function Elevkaren() {
  return (
    <div>
      <Header
        title="Anmälan"
        description="Anmäl dig till Killer, men var beredd. Vem står bakom dig?"
      />
      <div className="elevkarenwrapper">
        <h2>OBS</h2>
        <p>
          Kom ihåg att du <b>måste vara medlem</b> i Enskildas Elevkår för att
          få medverka i KILLER. (Det är gratis)
        </p>
        <br />
        <p>
          {" "}
          (Även <b>tvåor</b> och <b>treor</b> behöver förnya sitt medlemskap,
          klicka på länken.)
        </p>
        <br />
        <p className="medlem">
          Bli medlem i Enskildakåren:{" "}
          <a
            href="https://ebas.gymnasiet.sverigeselevkarer.se/signups/index/351"
            target="_blank"
            rel="noreferrer"
          >
            Klicka här!
          </a>{" "}
        </p>
        <br />
        <p>
          Enskildas Elevkår är en förening som vi elever på skolan har möjlighet
          att vara medlemmar i. Enskildakårens mål är att skapa en så rolig och
          bra skolgång som möjligt för alla elever på skolan och fixar därför en
          rad olika aktiviteter under läsårets gång.
        </p>
        <p>
          Som medlem behöver du inte göra någonting mer än att få vara en del av
          alla härligheter på skolan, tack vare att du och dina vänner är
          medlemmar i Enskildas elevkår har vi i styrelsen möjligheten och
          pengarna till att t.ex. köpa in priser till våra olika tävlingar.{" "}
        </p>
        <p>Tack för att DU är medlem! </p>
        <br />
        <p>Med vänliga hälsningar</p>
        <p>Enskildkårens styrelse</p>
      </div>
    </div>
  );
}

export default Elevkaren;
