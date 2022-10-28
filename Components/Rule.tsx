import React from "react";
import { RuleInfo } from "../Interfaces/Interfaces";

interface Props {
  rule: RuleInfo;
  index: number;
  isWhite: boolean;
}

function Rule({ index, isWhite, rule }: Props) {
  return (
    <div
      className="rulecolor"
      style={{
        backgroundColor: isWhite ? "white" : "var(--main-green)",
        color: isWhite ? "var(--text-color)" : "var(--text-white)",
      }}
    >
      <div className="rulewrapper">
        <div>
          <p>
            <b>
              {index}. {rule.title}
            </b>
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: rule.data?.toString() || "" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Rule;
