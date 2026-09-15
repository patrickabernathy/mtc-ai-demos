// Wraps every page at or below app/drinks/ -- so /drinks, /drinks/hot and
// /drinks/3 all get it, and the home page does not.
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
