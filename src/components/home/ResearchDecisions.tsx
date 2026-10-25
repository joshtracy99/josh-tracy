const examples = [
  {
    id: "urgent",
    choice: "An urgent leak",
    need: "Water’s coming through the ceiling.",
    decision: "Make the call the first thing they see.",
    headline: "If it’s leaking, call.",
    action: "See the call route",
    href: "/direction/alderton/emergency",
    link: "See the call route on Alderton’s example website",
  },
  {
    id: "planned",
    choice: "Planned work",
    need: "I’m planning a new bathroom.",
    decision: "Give them room to explain the job.",
    headline: "Planned work.",
    action: "See the quotation form",
    href: "/direction/alderton/contact?intent=quote#quote",
    link: "See the quotation form on Alderton’s example website",
  },
] as const;

/** Native radios keep both examples usable even when JavaScript is unavailable. */
export function ResearchDecisions() {
  return (
    <fieldset className="research-decisions">
      <legend>An Alderton example · fictional plumber</legend>
      <p className="research-invite">Same business. Different customer needs.</p>
      <div className="research-routes">
        {examples.map((example, index) => (
          <span className="research-choice" key={example.id}>
            <input type="radio" name="research-example" id={`research-${example.id}`} value={example.id} defaultChecked={index === 0} />
            <label htmlFor={`research-${example.id}`}>{example.choice}</label>
          </span>
        ))}
        {examples.map((example) => (
          <ol key={example.id} className={`decision-flow decision-${example.id}`} aria-label={`${example.choice}: from customer need to website`}>
            <li>
              <span className="decision-number" aria-hidden="true">01</span>
              <div><h3>The customer needs</h3><p className="decision-need">“{example.need}”</p></div>
            </li>
            <li>
              <span className="decision-number" aria-hidden="true">02</span>
              <div><h3>So we prioritise</h3><p>{example.decision}</p><svg className="decision-trace" viewBox="0 0 160 24" fill="none" aria-hidden="true"><path d="M1 12h151m-8-7 8 7-8 7" stroke="currentColor" strokeWidth="1.5" /></svg></div>
            </li>
            <li>
              <span className="decision-number" aria-hidden="true">03</span>
              <div>
                <h3>On the website</h3>
                <div className="decision-element">
                  <span className="decision-brand">Alderton <span>Plumbing &amp; heating</span></span>
                  <strong>{example.headline}</strong>
                  {example.id === "planned" && <span className="decision-fields" aria-hidden="true"><span>Your job <b>Bathroom plumbing</b></span><span>Your town <b>Godalming</b></span></span>}
                  <a href={example.href} aria-label={example.link}>{example.action}<span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </li>
          </ol>
        ))}
      </div>
      <p className="research-conclusion">We design around your trade, your work and the way your customers get in touch.</p>
    </fieldset>
  );
}
