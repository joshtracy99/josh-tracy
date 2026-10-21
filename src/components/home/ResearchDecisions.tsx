const examples = [
  {
    id: "urgent",
    choice: "An urgent leak",
    need: "A plumber in Godalming. A customer has a leak and needs help today.",
    decision: "Make the call easy to find. Show the area covered before asking for details.",
    result: "A clear emergency page, with the call button near the top.",
    headline: "If it’s leaking, call.",
    action: "See the call route",
    href: "/direction/alderton/emergency",
    link: "See the call route on Alderton’s example website",
  },
  {
    id: "planned",
    choice: "Planned work",
    need: "The same plumber. A customer is planning a bathroom and wants to discuss the job.",
    decision: "Give them room to explain the work, their location and how to reach them.",
    result: "A quotation form that asks for the details needed to start a conversation.",
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
              <div><h3>Understand the business</h3><p>{example.need}</p></div>
            </li>
            <li>
              <span className="decision-number" aria-hidden="true">02</span>
              <div><h3>Decide what matters</h3><p>{example.decision}</p></div>
            </li>
            <li>
              <span className="decision-number" aria-hidden="true">03</span>
              <div>
                <h3>Design around those decisions</h3>
                <p>{example.result}</p>
                <div className="decision-element">
                  <span className="decision-brand">Alderton <span>Plumbing &amp; heating</span></span>
                  <strong>{example.headline}</strong>
                  <a href={example.href} aria-label={example.link}>{example.action}<span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </li>
          </ol>
        ))}
      </div>
      <p className="research-conclusion">Your trade, work, area and customers’ questions shape the site.</p>
    </fieldset>
  );
}
