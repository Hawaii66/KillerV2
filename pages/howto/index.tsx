import React from "react";
import Header from "../../Components/Header";
import Info from "../../Components/Info";
import { RuleInfo } from "../../Interfaces/Interfaces";
import { data } from "../api/static/static";

function howto({ howto }: { howto: RuleInfo[] }) {
  return (
    <div>
      <Header title="Begrepp" description="Begrepp i Killer" />
      <br />
      <div className="infowrapper">
        <div>
          <div>
            <p>
              Spelet går ut på att döda ditt specifika offer och ej bli dödad av
              den som ska döda dig. När du dödat ditt offer får du offrets offer
              och kan fortsätta din räd mot finalen.
            </p>
          </div>
        </div>
      </div>
      <br />
      <ul>
        {howto.map((i, index) => {
          return <Info key={index} data={i.data} title={i.title} />;
        })}
      </ul>
      <br />
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
