import React from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

function Elevkaren() {
  return (
    <div>
      <Header
        title="Enskilda Kåren"
        description="Anmäl dig till Killer, men var beredd. Vem står bakom dig?"
      />
      <div className="elevkarenwrapper">
        <h2></h2>
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
