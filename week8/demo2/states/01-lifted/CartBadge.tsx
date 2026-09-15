// No useState any more. It just displays what it is handed.
export function CartBadge({ count }: { count: number }) {
  return <p className="badge">Cart: {count}</p>;
}
