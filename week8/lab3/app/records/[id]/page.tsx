"use client";

import { useParams, notFound } from "next/navigation";
import { catalog } from "../../catalog";

export default function RecordPage() {
  const params = useParams();
  const numericId = Number(params.id);
  const album = catalog.find((a) => a.id === numericId);

  if (!album) notFound();

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
