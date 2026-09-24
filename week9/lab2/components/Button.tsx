export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
