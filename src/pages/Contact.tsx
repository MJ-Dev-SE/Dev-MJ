export default function Contact() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 p-10 shadow-[0_30px_80px_rgba(2,6,23,0.9)]">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-3">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-amber-200 bg-clip-text text-transparent mb-4">
              Contact
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Want to work together or discuss a project? Send me a message
              below.
            </p>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              There's time that server is shutdown you can message me directly
              in this email: markjerohm@gmail.com
            </p>
            <div className="mx-auto mt-6 h-1 w-1/2 rounded-full bg-gradient-to-r from-amber-500/40 via-amber-400 to-slate-800"></div>
          </div>

          <form
            action="https://formsubmit.co/markjerohm@gmail.com"
            method="POST"
            className="space-y-6"
          >
            <input
              type="hidden"
              name="_subject"
              value="New Portfolio Inquiry"
            />
            <input type="hidden" name="_template" value="table" />

            <div>
              <label
                htmlFor="name"
                className="block text-sm text-amber-200 mb-2 font-medium"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-amber-200 mb-2 font-medium"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm text-amber-200 mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors resize-none"
                placeholder="Tell me about your project or idea..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
