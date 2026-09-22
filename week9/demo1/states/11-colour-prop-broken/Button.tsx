export function Button({
  children,
  colour,
  onClick,
}: {
  children: React.ReactNode;
  colour: string;
  onClick?: () => void;
}) {
  return (
    // Tailwind reads this file as text and never sees a whole class name here,
    // so any colour not written out in full somewhere else gets no rule at all.
    <button type="button" className={`bg-${colour}-600 text-white px-4 py-2 rounded`} onClick={onClick}>
      {children}
    </button>
  );
}
