"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Album } from "../types/album";

const API_URL = "https://n8n.aseglave.net/webhook/mtc-records";
const API_TOKEN = "mtc-fall-2026";

export function SearchableCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const [albums, setAlbums] = useState<Album[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    const url = q ? `${API_URL}?q=${encodeURIComponent(q)}` : API_URL;

    fetch(url, { headers: { Authorization: `Bearer ${API_TOKEN}` } })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: Album[]) => {
        if (cancelled) return;
        setAlbums(data);
        setStatus("loaded");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [q]);

  function handleSearchChange(value: string) {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (value) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }
    const query = nextParams.toString();
    router.replace(query ? `/?${query}` : "/");
  }

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search title or artist..."
          value={q}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {status === "loading" && <p>Loading&hellip;</p>}
      {status === "error" && (
        <p className="error-box">Couldn&apos;t reach the record store. Try again in a moment.</p>
      )}
      {status === "loaded" && albums.length === 0 && (
        <p>No records match &ldquo;{q}&rdquo;.</p>
      )}
      {status === "loaded" && albums.length > 0 && (
        <ul className="catalog">
          {albums.map((album) => (
            <li key={album.id} className="album">
              <div className="album-info">
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
      )}
    </>
  );
}
