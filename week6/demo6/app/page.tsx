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
  // needs them. The cards remember nothing — go Back and the answers are still
  // here, because they were never stored in the card in the first place.
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState<Order>(emptyOrder);
  const [placed, setPlaced] = useState(false);

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

        {/* order goes DOWN, and setOrder goes down too so the card can hand a
            whole new order back UP. That's the entire trick. */}
        {step === 1 && (
          <ContactCard
            order={order}
            onChange={setOrder}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <PickupCard
            order={order}
            onChange={setOrder}
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
