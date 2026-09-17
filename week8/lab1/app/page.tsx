import type { Album } from "../types/album";

const catalog: Album[] = [
  {
    id: 1,
    title: "Kind of Blue",
    artist: "Miles Davis",
    genre: "Jazz",
    year: 1959,
    price: 24.0,
    description: "Modal jazz, recorded mostly in first or second takes.",
    inStock: true,
  },
  {
    id: 2,
    title: "Blue Train",
    artist: "John Coltrane",
    genre: "Jazz",
    year: 1957,
    price: 22.5,
    description: "One session, one date, Coltrane's only date as leader for Blue Note.",
    inStock: true,
  },
  {
    id: 3,
    title: "Rumours",
    artist: "Fleetwood Mac",
    genre: "Rock",
    year: 1977,
    price: 19.0,
    description: "Written and recorded while the band was breaking up around it.",
    inStock: true,
  },
  {
    id: 4,
    title: "Discovery",
    artist: "Daft Punk",
    genre: "Electronic",
    year: 2001,
    price: 21.0,
    description: "Disco samples chopped and rebuilt into something that hadn't existed before.",
    inStock: false,
  },
  {
    id: 5,
    title: "Blue",
    artist: "Joni Mitchell",
    genre: "Folk",
    year: 1971,
    price: 20.5,
    description: "Ten songs, almost no studio polish, and none needed.",
    inStock: true,
  },
  {
    id: 6,
    title: "Ready to Die",
    artist: "The Notorious B.I.G.",
    genre: "Hip-Hop",
    year: 1994,
    price: 23.0,
    description: "One record, one voice, a whole coast rewritten.",
    inStock: true,
  },
];

export default function Home() {
  return (
    <main>
      <h2>New arrivals</h2>
      <ul className="catalog">
        {catalog.map((album) => (
          <li key={album.id} className="album">
            <div className="album-info">
              <h3>{album.title}</h3>
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
