import { NextResponse } from "next/server";

// A local stand-in for the locked-down menu server, so this demo still works
// when the real one is unreachable. It behaves the same way in the one respect
// that matters: it refuses to answer without the x-auth header.
//
// If the real server is having a bad night, change MENU_URL in page.tsx to
// "/api/menu" and the lesson is identical -- with the bonus that a same-origin
// request needs no CORS preflight, so there is one less thing to go wrong.
//
// Writing endpoints like this one on purpose is Week 11.
const menu = [
  { name: "Espresso", price: 2.5 },
  { name: "Latte", price: 4.0 },
  { name: "Cappuccino", price: 4.0 },
  { name: "Mocha", price: 4.5 },
  { name: "Cold Brew", price: 3.75 },
];

const EXPECTED = "mtc-fall-2026";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const state = params.get("state");
  const delay = Math.min(Number(params.get("delay") ?? 1200) || 0, 8000);

  // A real server on a real network is never instant. This is the wait,
  // faked, so the loading state is something you can actually see.
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // The whole point of demo7. No header, no menu.
  if (request.headers.get("x-auth") !== EXPECTED) {
    return NextResponse.json("Authorization data is wrong!", { status: 403 });
  }

  if (state === "error") {
    return NextResponse.json({ error: "The espresso machine is down." }, { status: 500 });
  }
  if (state === "empty") {
    return NextResponse.json([]);
  }
  return NextResponse.json(menu);
}
