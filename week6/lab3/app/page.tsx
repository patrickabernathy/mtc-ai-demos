"use client";

import { useEffect, useState } from "react";
import type { CartLine, MenuItem } from "../types/coffee";
import type { Review } from "../types/review";
import { Header } from "../components/Header";
import { MenuList } from "../components/MenuList";
import { CartList } from "../components/CartList";
import { ReviewList } from "../components/ReviewList";

// This one is behind a door too, same idea as demo8 -- except this server
// wants an Authorization: Bearer header instead of x-auth.
const REVIEWS_URL = "https://n8n.aseglave.net/webhook/mtc-reviews-auth";
const REVIEWS_AUTH = "Bearer mtc-fall-2026";

export default function Home() {
  const [cart, setCart] = useState<CartLine[]>([]);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState("");

  // Pulled out of the effect so the Try again button can call the same code.
  async function loadReviews() {
    setReviewsLoading(true);
    setReviewsError("");
    try {
      const res = await fetch(REVIEWS_URL, {
        headers: { Authorization: REVIEWS_AUTH },
      });

      // fetch does NOT throw on a 403 or a 500 -- the round trip worked as
      // far as fetch is concerned. We have to look at the answer ourselves.
      if (!res.ok) {
        throw new Error("The server said " + res.status + ".");
      }

      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      setReviewsError("We could not load the reviews. That one is on us, not you.");
    } finally {
      setReviewsLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAdd(item: MenuItem, qty: number) {
    setCart((prev) => {
      const existing = prev.find((line) => line.name === item.name);
      if (existing) {
        return prev.map((line) =>
          line.name === item.name ? { ...line, qty: line.qty + qty } : line
        );
      }
      return [...prev, { name: item.name, price: item.price, qty }];
    });
  }

  function handleRemove(name: string) {
    setCart((prev) => prev.filter((line) => line.name !== name));
  }

  return (
    <div>
      <Header />
      <main>
        <MenuList onAdd={handleAdd} />
        <CartList cart={cart} onRemove={handleRemove} />
      </main>
      <ReviewList
        reviews={reviews}
        loading={reviewsLoading}
        error={reviewsError}
        onRetry={loadReviews}
      />
    </div>
  );
}
