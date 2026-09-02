"use client";

import { useState } from "react";
import { emptyOrder, type Order } from "../types/order";
import { Header } from "../components/Header";
import { Steps } from "../components/Steps";
import { ContactCard } from "../components/ContactCard";
import { PickupCard } from "../components/PickupCard";
import { ReviewCard } from "../components/ReviewCard";

export default function Home() {
  // Both pieces of state live HERE, in the parent, because more than one card
  // needs them. The cards themselves remember nothing — step back and the
  // answers are still there.
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState<Order>(emptyOrder);
  const [placed, setPlaced] = useState(false);

  // Data coming BACK UP from a card. The card says "phone changed to 555...",
  // and the parent is the one that actually updates the order.
  function updateField(field: keyof Order, value: string) {
    setOrder((prev) => ({ ...prev, [field]: value }));
  }

  if (placed) {
    return (
      <div>
        <Header />
        <main>
          <p className="success">
            Thanks, {order.name}! We'll have it ready at {order.pickup}.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <Steps current={step} />

        {step === 1 && (
          <ContactCard
            order={order}
            onChange={updateField}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <PickupCard
            order={order}
            onChange={updateField}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <ReviewCard
            order={order}
            onBack={() => setStep(2)}
            onPlace={() => setPlaced(true)}
          />
        )}
      </main>
    </div>
  );
}
