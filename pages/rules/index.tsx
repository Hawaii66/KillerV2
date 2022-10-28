import React from "react";
import Header from "../../Components/Header";
import Info from "../../Components/Info";
import Rule from "../../Components/Rule";
import { RuleInfo } from "../../Interfaces/Interfaces";
import { data } from "../api/static/static";
import howto from "../howto";

function Rules({ rules }: { rules: RuleInfo[] }) {
  return (
    <div>
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
          <p>KILLER-ansvariga har alltid sista ordet i eventuella tvister.</p>
        </div>
        <div>
          <div>
            <p>
              Eventuella frågor tas upp med oss via mail
              (enskildakiller@gmail.com) alternativt Instagram (@enskildakaren).
            </p>
            <p>
              Årets KILLER-ansvariga är Elvin (NA19B), Selma (SA19B), Edwin
              (EK19A) och Alva (NA19A).{" "}
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
