"use client";

// This child was handed a name and would like a different one.
// It assigns to the prop -- which does something, but not what it looks like.
export function Greeting({ name }: { name: string }) {
  name = "Changed!";

  return <h2>Hello {name}</h2>;
}
