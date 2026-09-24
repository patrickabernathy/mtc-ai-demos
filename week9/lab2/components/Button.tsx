const colourStyles = {
  green: "bg-green-600 hover:bg-green-700",
  red: "bg-red-600 hover:bg-red-700",
};

const sizeStyles = {
  sm: "text-sm px-2 py-1",
  md: "px-4 py-2",
  lg: "text-lg px-6 py-3",
};

export function Button({
  children,
  colour = "green",
  size = "md",
  onClick,
}: {
  children: React.ReactNode;
  colour?: keyof typeof colourStyles;
  size?: keyof typeof sizeStyles;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`${colourStyles[colour]} ${sizeStyles[size]} text-white rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
