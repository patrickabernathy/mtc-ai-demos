// A frame. It provides a border and some padding and has no opinion
// whatsoever about what goes inside it. Nine props became none.
export function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}
