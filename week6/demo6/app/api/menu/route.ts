import { NextResponse } from "next/server";

// The same four replies the n8n server gives us, but served from this machine.
// If the real server is having a bad night, change MENU_URL in page.tsx to
// "/api/menu" and every demo tonight still works.
//
// Writing endpoints like this one on purpose is Week 11. Tonight it is just a
// stunt double, so read it if you are curious and ignore it if you are not.
const menu = [
  { "name": "Espresso", "price": 2.5 },
  { "name": "Latte", "price": 4.0 },
  { "name": "Cappuccino", "price": 4.0 },
  { "name": "Mocha", "price": 4.5 },
  { "name": "Cold Brew", "price": 3.75 },
];

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const state = params.get("state");
  const delay = Math.min(Number(params.get("delay") ?? 1200) || 0, 8000);

  // A real server on a real network is never instant. This is the wait,
  // faked, so the loading state is something you can actually see.
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  if (state === "error") {
    return NextResponse.json({ error: "The espresso machine is down." }, { status: 500 });
  }
  if (state === "empty") {
    return NextResponse.json([]);
  }
  return NextResponse.json(menu);
}
