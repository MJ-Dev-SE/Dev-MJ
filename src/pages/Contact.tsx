export default function Contact() {
  return (
    <section className="max-w-xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6">Contact</h2>

      <p className="text-gray-400 mb-6">
        Want to work together or discuss a project? Send me a message below.
      </p>

      <form
        action="https://formsubmit.co/markjerohm@gmail.com"
        method="POST"
        className="space-y-4"
      >
        <input type="hidden" name="_subject" value="New Portfolio Inquiry" />
        <input type="hidden" name="_template" value="table" />

        <div>
          <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <button
          type="submit"
          className="inline-block px-6 py-3 rounded-lg bg-sky-400 text-black font-medium"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
