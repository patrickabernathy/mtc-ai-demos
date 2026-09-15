// app/drinks/layout.tsx
//
// A layout wraps every page at or below its own folder. This one wraps
// /drinks, /drinks/hot, /drinks/iced -- and it does NOT touch the home page,
// because the home page is not inside app/drinks/.
//
// children is whatever page is currently being shown underneath it.
export default function DrinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="section">
      <p className="crumb">Menu / Drinks</p>
      {children}
    </div>
  );
}
