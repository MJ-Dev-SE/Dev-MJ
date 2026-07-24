export default function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.4em] uppercase text-clay-600 mb-3">
          Get In Touch
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-stone-800 mb-4">
          Contact
        </h2>
        <p className="text-stone-600 text-lg">
          Want to work together or discuss a project? Send me a message
          below.
        </p>
        <p className="text-stone-600 text-lg">
          There's time that server is shutdown you can message me directly
          in this email: markjerohm@gmail.com
        </p>
        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-clay-500" />
      </div>

      <div className="rounded-3xl border border-beige-200 bg-beige-50 p-8 shadow-sm md:p-10">
        <form
          action="https://formsubmit.co/markjerohm@gmail.com"
          method="POST"
          className="space-y-6"
        >
          <input type="hidden" name="_subject" value="New Portfolio Inquiry" />
          <input type="hidden" name="_template" value="table" />

          <div>
            <label
              htmlFor="name"
              className="block text-sm text-clay-700 mb-2 font-medium"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-beige-300 bg-white px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-clay-400 focus:border-clay-500 transition-colors"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm text-clay-700 mb-2 font-medium"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-beige-300 bg-white px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-clay-400 focus:border-clay-500 transition-colors"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm text-clay-700 mb-2 font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full rounded-lg border border-beige-300 bg-white px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-clay-400 focus:border-clay-500 transition-colors resize-none"
              placeholder="Tell me about your project or idea..."
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-block px-8 py-3 rounded-lg bg-clay-700 hover:bg-clay-800 text-azure font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
