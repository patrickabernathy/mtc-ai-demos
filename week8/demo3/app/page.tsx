"use client";

import { useState } from "react";
import { Greeting } from "../components/Greeting";

export default function Home() {
  const [person, setPerson] = useState("Sam");

  return (
    <main>
      <h1>Props, properly</h1>

      <Greeting name={person} />

      {/* The parent still thinks the name is whatever it was.
          The child scribbled on its own copy. */}
      <p>Back in the parent, person is still: {person}</p>
    </main>
  );
}
