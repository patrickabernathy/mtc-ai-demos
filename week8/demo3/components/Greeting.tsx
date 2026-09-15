"use client";

// Handed a value, and handed a way to ASK for it to change.
// Values go down as props. Messages come back up as functions.
export function Greeting({
  name,
  onRename,
}: {
  name: string;
  onRename: (next: string) => void;
}) {
  return (
    <div>
      <h2>Hello {name}</h2>
      <button type="button" onClick={() => onRename("Changed!")}>
        Rename
      </button>
    </div>
  );
}
