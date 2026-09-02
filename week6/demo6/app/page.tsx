import { Header } from "../components/Header";
import { Steps } from "../components/Steps";
import { ContactCard } from "../components/ContactCard";
import { PickupCard } from "../components/PickupCard";
import { ReviewCard } from "../components/ReviewCard";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Steps />
        <ContactCard />
        <PickupCard />
        <ReviewCard />
      </main>
    </div>
  );
}
