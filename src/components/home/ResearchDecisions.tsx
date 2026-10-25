const examples = [
  {
    id: "urgent",
    label: "Urgent help",
    need: "Water’s coming through the ceiling.",
    headline: "If it’s leaking, call.",
    action: "See the call route",
    href: "/direction/alderton/emergency",
    link: "See the call route on Alderton’s example website",
  },
  {
    id: "planned",
    label: "Planned work",
    need: "I’m planning a new bathroom.",
    headline: "Tell us about the job.",
    action: "See the quotation form",
    href: "/direction/alderton/contact?intent=quote#quote",
    link: "See the quotation form on Alderton’s example website",
  },
] as const;

/** Both practical outcomes belong in the normal reading order. */
export function ResearchDecisions() {
  return (
    <div className="research-decisions">
      <p className="research-intro">Different jobs. Different ways to get in touch.</p>
      <div className="research-examples">
        {examples.map((example) => (
          <article className="research-example" key={example.id} aria-labelledby={`research-${example.id}-title`}>
            <div className="research-situation">
              <h3 id={`research-${example.id}-title`}>{example.label}</h3>
              <p className="decision-need">“{example.need}”</p>
            </div>
            <div className="decision-element">
              <span className="decision-brand">Alderton <span>Plumbing &amp; heating</span></span>
              <strong>{example.headline}</strong>
              <a href={example.href} aria-label={example.link}>{example.action}<span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </div>
      <p className="research-disclosure">Alderton · fictional example</p>
    </div>
  );
}
