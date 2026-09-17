"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import type { Album } from "../../../types/album";

const API_URL = "https://n8n.aseglave.net/webhook/mtc-records";
const API_TOKEN = "mtc-fall-2026";

type Status = "loading" | "loaded" | "error" | "not-found";

export default function RecordPage() {
  const params = useParams();
  const numericId = Number(params.id);

  const [album, setAlbum] = useState<Album | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (Number.isNaN(numericId)) {
      setStatus("not-found");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    fetch(`${API_URL}?id=${numericId}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    })
      .then((res) => {
        if (res.status === 404) {
          if (!cancelled) setStatus("not-found");
          return null;
        }
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: Album | null) => {
        if (cancelled || !data) return;
        setAlbum(data);
        setStatus("loaded");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [numericId]);

  // Called during render, not inside the fetch callback above — that's what
  // lets Next's own not-found page take over from here.
  if (status === "not-found") notFound();

  if (status === "loading") {
    return (
      <main>
        <p>Loading&hellip;</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main>
        <p className="error-box">Couldn&apos;t reach the record store. Try again in a moment.</p>
      </main>
    );
  }

  if (!album) return null;

  return (
    <main>
      <div className="record-detail">
        <h2>{album.title}</h2>
        <p className="artist">
          {album.artist} &middot; {album.genre} &middot; {album.year}
        </p>
        <p>{album.description}</p>
        <p className="price">${album.price.toFixed(2)}</p>
        {!album.inStock && <p className="out-of-stock">Out of stock</p>}
      </div>
    </main>
  );
}
