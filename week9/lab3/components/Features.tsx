const features = [
  {
    title: "Roasted Tuesdays",
    body: "Every bag on the cart was roasted this week, three blocks away.",
  },
  {
    title: "Oat milk, no upcharge",
    body: "Any milk you like, same price. It was never worth the extra dollar.",
  },
  {
    title: "Order ahead",
    body: "Pay on your phone, walk up, grab it. No line, no name shouted wrong.",
  },
];

export function Features() {
  return (
    <section className="px-4 md:px-8 py-12">
      <h2 className="text-3xl font-bold mb-8">Why people line up</h2>
      {/* One card per row on a phone, three across from md (768px) up. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {features.map((feature) => (
          <article key={feature.title} className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
