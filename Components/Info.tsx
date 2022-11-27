import React from "react";
import { RuleInfo } from "../Interfaces/Interfaces";

function Info({ data, title }: RuleInfo) {
  return (
    <li className="infowrapper">
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: `<div><p><b>${title}:</b> ${data?.toString()}</p></div>`,
          }}
        />
      </div>
    </li>
  );
}

export default Info;
