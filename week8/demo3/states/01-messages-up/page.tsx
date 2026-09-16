// The fix. A child cannot reach up -- it can only be handed a way to ask.
// Values go down as props. Messages come back up as functions.
"use client";

import { useState } from "react";
import { Greeting } from "../components/Greeting";

export default function Home() {
  const [person, setPerson] = useState("Sam");

  return (
    <main>
      <h1>Props, properly</h1>

      <Greeting name={person} onRename={setPerson} />

      <p>Back in the parent, person is: {person}</p>
    </main>
  );
}
