import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { buttonPress } from "./motion";

const fieldClass =
  "w-full rounded-lg border border-beige-300 bg-white px-4 py-3 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-400/40";

const labelClass = "mb-2 block text-sm font-medium text-stone-700";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        lead="Have a project in mind, or just want to compare notes? Send a message and I'll reply."
      />

      <div className="mt-10 rounded-2xl border border-beige-200 bg-beige-50 p-6 shadow-sm md:p-8">
        <form
          action="https://formsubmit.co/markjerohm@gmail.com"
          method="POST"
          className="space-y-5"
        >
          <input type="hidden" name="_subject" value="New Portfolio Inquiry" />
          <input type="hidden" name="_template" value="table" />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={fieldClass}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={fieldClass}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className={`${fieldClass} resize-none`}
              placeholder="What are you building, and where does it stand?"
            />
          </div>

          <motion.button
            type="submit"
            {...buttonPress}
            className="w-full rounded-lg bg-clay-700 px-6 py-3 text-sm font-semibold text-azure shadow-sm transition-colors hover:bg-clay-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-2 focus-visible:ring-offset-beige-50 sm:w-auto"
          >
            Send message
          </motion.button>
        </form>
      </div>

      <p className="mt-5 text-center text-sm text-stone-500">
        The form runs on a free service, so if it ever goes quiet, email me
        directly at{" "}
        <a
          href="mailto:markjerohm@gmail.com"
          className="font-medium text-clay-700 underline-offset-4 transition-colors hover:underline"
        >
          markjerohm@gmail.com
        </a>
        .
      </p>
    </section>
  );
}
