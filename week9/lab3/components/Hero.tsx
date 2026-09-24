export function Hero() {
  return (
    // Text above the photo on a phone, beside it from md (768px) up.
    <section className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 px-4 md:px-8 py-10 md:py-16">
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Your neighbourhood coffee, roasted down the street.</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Small-batch beans, a cart on every corner downtown, and a latte ready before the bus comes.
        </p>
        <a href="#" className="bg-amber-900 text-white text-lg px-6 py-3 rounded hover:bg-amber-800">
          See the menu
        </a>
      </div>
      <div className="w-full md:w-1/2 h-48 md:h-80 bg-amber-200 rounded-xl flex items-center justify-center text-amber-900">
        Photo of the cart goes here
      </div>
    </section>
  );
}
