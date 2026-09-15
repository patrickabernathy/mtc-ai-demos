"use client";

// Handed a value, and handed a way to ask for it to change.
// Every onAdd / onRemove / onChange you have written is this shape.
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
