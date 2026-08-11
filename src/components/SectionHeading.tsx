/**
 * The one heading block every section on the page uses, so eyebrow / title /
 * lead sizing and spacing stay identical from top to bottom.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";

  return (
    <header className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-clay-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-stone-600">{lead}</p>
      )}
    </header>
  );
}
