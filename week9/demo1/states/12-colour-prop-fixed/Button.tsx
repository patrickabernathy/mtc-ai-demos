// Every class Tailwind should make is written out in full, so it finds all of them.
// The code still picks one when it runs; it just picks from whole names.
const colours = {
  green: "bg-green-600 hover:bg-green-700",
  red: "bg-red-600 hover:bg-red-700",
};

export function Button({
  children,
  colour,
  onClick,
}: {
  children: React.ReactNode;
  colour: "green" | "red";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`${colours[colour]} text-white px-4 py-2 rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
