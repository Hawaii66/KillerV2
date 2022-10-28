import Link from "next/link";
import React from "react";

function Error() {
  return (
    <div>
      <h1>Nu hittade du på något konstigt :D</h1>
      <p>Den här länken finns inte</p>
      <Link href="/">Gå tillbaka till start</Link>
    </div>
  );
}

export default Error;
