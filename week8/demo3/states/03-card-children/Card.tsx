// The same card, as a frame. It provides a border and some padding and has
// no opinion whatsoever about what goes inside it. Nine props became none.
export function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

// Used like this -- children is whatever you write between the tags:
//
//   <Card>
//     <h3>Latte</h3>
//     <p>Oat milk · $4.00</p>
//     <button onClick={handleAdd}>Add</button>
//   </Card>
