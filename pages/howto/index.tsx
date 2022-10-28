import React from "react";
import Header from "../../Components/Header";
import Info from "../../Components/Info";
import { RuleInfo } from "../../Interfaces/Interfaces";
import { data } from "../api/static/static";

function howto({ howto }: { howto: RuleInfo[] }) {
  return (
    <div>
      <Header
        title="KILLER guiden"
        description="Så här fungerar killer, lär dig snabbt och enkelt om Killer i stora drag"
      />
      <br />
      <div className="infowrapper">
        <div>
          <div>
            <p>
              Spelet går ut på att döda ditt specifika offer och ej bli dödad av
              den som ska döda dig. När du dödat ditt offer får du offrets offer
              och kan fortsätta din räd mot finalen.{" "}
            </p>
          </div>
        </div>
      </div>
      <br />
      <ul>
        {howto.map((i) => {
          return <Info data={i.data} title={i.title} />;
        })}
      </ul>
      <br />
      <div className="infowrapper">
        <div>
          <p>
            <b>Kreativitet och mål</b>
          </p>
          <div>
            <p>
              Vissa är med i KILLER för att ha kul, andra för att vinna. För att
              lyckas så bra som möjligt är det viktigt att tänka utanför boxen.
              Det är tillåtet och uppmuntras att använda sig av nya metoder för
              att hitta och döda sina offer, så länge de inte bryter mot
              reglerna. Lycka till!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const alldata = data;
  const howto = alldata.howto;

  return {
    props: {
      howto,
    },
  };
}

export default howto;
