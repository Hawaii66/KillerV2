import React from "react";
import { RuleInfo } from "../Interfaces/Interfaces";

function Info({ data, title }: RuleInfo) {
  return (
    <li className="infowrapper">
      <div>
        <p>{title}</p>
        <div dangerouslySetInnerHTML={{ __html: data?.toString() || "" }}></div>
      </div>
    </li>
  );
}

export default Info;
