// State 01 — static. Everything is one inline chunk of JSX, same as the
// plain-HTML version we built in Week 3. Nothing is broken into components
// yet — that starts in state 02.

import { Header, SubHeader } from "@/components/header"
import { Nav } from "@/components/navbar"
import { NavClass } from "@/types/navclass"

const navClass: NavClass[] = [
  { href: "hours.html", text: "Hours" },
  { href: "mailto:ray@cornerstore.com", text: "Email Ray" },
  { href: "tel:8035550100", text: "Call us" },
  { href: "google.com", text: "We're Awesome", endingDot: false },
];

export default function Home() {
  return (
    <div>
      <Header />
      <SubHeader />
      <Nav navClass={navClass} />
    </div>
  );
}
