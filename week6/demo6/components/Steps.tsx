const labels = ["Your info", "Pickup", "Review"];

// Data only goes DOWN into this one. It has no buttons, so it never needs to
// tell the parent anything.
export function Steps({ current }: { current: number }) {
  return (
    <ol className="steps">
      {labels.map((label, index) => {
        const number = index + 1;
        return (
          <li key={label} className={number === current ? "step active" : "step"}>
            <span className="step-number">{number}</span>
            {label}
          </li>
        );
      })}
    </ol>
  );
}
