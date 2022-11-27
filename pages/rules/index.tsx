import Link from "next/link";
import React from "react";
import Header from "../../Components/Header";
import Rule from "../../Components/Rule";
import { RuleInfo } from "../../Interfaces/Interfaces";
import { data } from "../api/static/static";

function Rules({ rules }: { rules: RuleInfo[] }) {
  return (
    <div style={{ width: "100%" }}>
      <Header
        title="REGLER"
        description="Här står alla regler, följ dessa så blir Killer kul för alla"
      />
      {rules.map((i, index) => {
        return (
          <Rule
            key={index}
            index={index + 1}
            isWhite={index % 2 == 0}
            rule={i}
          />
        );
      })}
      <br />
      <div className="infowrapper">
        <div>
          <div>
            <p>Eventuella frågor tas upp med oss via mail</p>
            <Link href={"mailto:neg_killer@nykopingsenskilda.se"}>
              neg_killer@nykopingsenskilda.se
            </Link>
            <p>
              Årets KILLER-ansvariga är Sebastian (NA21B), Emma S (SA21A), Nilo
              (SA21A)
            </p>
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: "6rem" }} />
    </div>
  );
}

export async function getServerSideProps() {
  const alldata = data;
  const rules = alldata.rules;

  return {
    props: {
      rules,
    },
  };
}

export default Rules;
