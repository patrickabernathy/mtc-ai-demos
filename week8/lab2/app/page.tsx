import Link from "next/link";
import { catalog } from "./catalog";

export default function Home() {
  return (
    <main>
      <h2>New arrivals</h2>
      <ul className="catalog">
        {catalog.map((album) => (
          <li key={album.id} className="album">
            <div className="album-info">
              {/* This link goes nowhere yet — there is no page at /records/[id]. */}
              <Link href={`/records/${album.id}`}>
                <h3>{album.title}</h3>
              </Link>
              <p className="artist">
                {album.artist} &middot; {album.genre} &middot; {album.year}
              </p>
            </div>
            <p className="price">${album.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
