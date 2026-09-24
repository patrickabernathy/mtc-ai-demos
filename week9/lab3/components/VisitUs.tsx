const hours = [
  { days: "Mon – Fri", time: "6:30am – 6pm" },
  { days: "Saturday", time: "8am – 4pm" },
  { days: "Sunday", time: "9am – 2pm" },
];

export function VisitUs() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4 md:px-8 py-12 bg-amber-50">
      <div>
        <h2 className="text-3xl font-bold mb-4">Hours</h2>
        <ul className="text-lg">
          {hours.map((row) => (
            <li key={row.days} className="flex justify-between py-1 border-b border-amber-200">
              <span>{row.days}</span>
              <span>{row.time}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-4">Find the cart</h2>
        <p className="text-lg">Corner of 5th and Main, right outside the library.</p>
        <div className="h-48 mt-4 bg-amber-200 rounded-xl flex items-center justify-center text-amber-900">
          Map goes here
        </div>
      </div>
    </section>
  );
}
