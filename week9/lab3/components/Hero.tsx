export function Hero() {
  return (
    <section className="flex items-center gap-12 px-8 py-16">
      <div className="w-1/2">
        <h1 className="text-6xl font-bold mb-6">Your neighbourhood coffee, roasted down the street.</h1>
        <p className="text-xl text-gray-600 mb-8">
          Small-batch beans, a cart on every corner downtown, and a latte ready before the bus comes.
        </p>
        <a href="#" className="bg-amber-900 text-white text-lg px-6 py-3 rounded hover:bg-amber-800">
          See the menu
        </a>
      </div>
      <div className="w-1/2 h-80 bg-amber-200 rounded-xl flex items-center justify-center text-amber-900">
        Photo of the cart goes here
      </div>
    </section>
  );
}
