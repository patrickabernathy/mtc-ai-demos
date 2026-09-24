export function Signup() {
  return (
    <section className="px-8 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Free drink on your birthday</h2>
      <p className="text-gray-600 mb-6">Join the list. One email a month, tops.</p>
      <form className="flex gap-2 w-96 mx-auto">
        <input
          type="email"
          placeholder="you@example.com"
          className="flex-1 border border-gray-300 rounded px-4 py-2"
        />
        <button type="button" className="bg-amber-900 text-white px-6 py-2 rounded hover:bg-amber-800">
          Sign up
        </button>
      </form>
    </section>
  );
}
