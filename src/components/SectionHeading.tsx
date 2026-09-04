export function SectionHeading({
  title,
  lead,
  id,
  onCream = false,
}: {
  title: string;
  lead?: string;
  id?: string;
  onCream?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="text-4xl sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-6 max-w-2xl text-lg ${onCream ? "text-[#4c4a40]" : "text-ink-2"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
