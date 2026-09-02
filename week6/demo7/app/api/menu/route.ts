import { NextResponse } from "next/server";

// A local stand-in for the menu server, answering exactly the same way.
//
// If the real server is unreachable -- no wifi, or it is having a bad night --
// change MENU_URL in page.tsx to "/api/menu" and every demo still works.
//
// Writing endpoints like this one on purpose is Week 11.
const menu = [
  { name: "Espresso", price: 2.5 },
  { name: "Latte", price: 4.0 },
  { name: "Cappuccino", price: 4.0 },
  { name: "Mocha", price: 4.5 },
  { name: "Cold Brew", price: 3.75 },
];

// A plain-English line for each status worth demonstrating, so a forced
// failure still comes back with something a page could actually show.
const MESSAGES: Record<number, string> = {
  400: "That request did not make sense.",
  401: "You are not signed in.",
  403: "You are not allowed to see this.",
  404: "There is no menu at that address.",
  418: "I'm a teapot. No coffee.",
  429: "Too many requests. Slow down.",
  500: "The espresso machine is down.",
  502: "The coffee cart is not answering.",
  503: "We are closed for maintenance.",
  504: "The kitchen took too long to reply.",
};

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const state = params.get("state");
  const delay = Math.min(Number(params.get("delay") ?? 1200) || 0, 8000);

  // A real server on a real network is never instant. This is the wait,
  // faked, so the loading state is something you can actually see.
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // ?status=404 forces any status code at all, so you can build the page
  // against a specific failure instead of waiting for one to happen.
  const forced = Number(params.get("status"));
  if (forced >= 200 && forced <= 599) {
    if (forced < 300) {
      return NextResponse.json(menu, { status: forced });
    }
    return NextResponse.json(
      { error: MESSAGES[forced] ?? `The server said ${forced}.`, status: forced },
      { status: forced }
    );
  }

  // Kept because this is what the slides use.
  if (state === "error") {
    return NextResponse.json(
      { error: MESSAGES[500], status: 500 },
      { status: 500 }
    );
  }
  if (state === "empty") {
    return NextResponse.json([]);
  }
  return NextResponse.json(menu);
}
