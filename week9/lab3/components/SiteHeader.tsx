const links = ["Our coffee", "Locations", "Catering", "About"];

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
      <p className="text-2xl font-bold">The Daily Grind</p>
      <nav className="flex items-center gap-8">
        {links.map((link) => (
          <a key={link} href="#" className="text-amber-900 font-semibold hover:underline">
            {link}
          </a>
        ))}
        <a href="#" className="bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-800">
          Order online
        </a>
      </nav>
    </header>
  );
}
