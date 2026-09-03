export type Review = {
  id: number;
  author: string;
  rating: number;
  text: string;
};

// A few reviews typed in by hand, so the section has something to show before
// you wire up the real fetch. Once useEffect is loading these from the
// server, this array stops being used for anything but a fallback to compare
// against.
export const sampleReviews: Review[] = [
  { id: 1, author: "Alex P.", rating: 5, text: "The sourdough is unreal." },
  { id: 2, author: "Morgan T.", rating: 4, text: "Cozy spot, gets busy at 8am." },
];
