import Image from "next/image";

/** Native controls keep this comparison operable without client JavaScript. */
export function WhyComparison() {
  return (
    <fieldset className="clarity-comparison">
      <legend>Make it easy to see what you do.</legend>
      <div className="clarity-controls">
        <span className="research-choice"><input type="radio" name="clarity" id="clarity-unclear" /><label htmlFor="clarity-unclear">Unclear website</label></span>
        <span className="research-choice"><input type="radio" name="clarity" id="clarity-clear" defaultChecked /><label htmlFor="clarity-clear">Clear website</label></span>
      </div>
      <div className="clarity-canvas">
        <div className="clarity-panel clarity-unclear">
          <div className="clarity-site unclear-site" role="img" aria-label="Illustrative unclear site: a vague welcome, no visible work and contact information buried below the main content.">
            <div className="unclear-nav">Alderton <span>Home · More · Links</span></div>
            <div className="unclear-welcome"><span>Welcome to our website</span><strong>Quality you can trust.</strong><p>For all your requirements.<br />Find out more about what we do.</p><span className="unclear-more">Read more</span></div>
            <div className="unclear-bottom">More information <span>Contact details below ↓</span></div>
          </div>
          <p className="clarity-takeaway">What do they do? Where is their work? How do I get in touch?</p>
        </div>
        <div className="clarity-panel clarity-clear">
          <div className="clarity-site clear-site" role="img" aria-label="Illustrative clear Alderton site: plumbing services, a photograph of bathroom work and an obvious quotation route.">
            <div className="clear-nav"><strong>Alderton</strong><span>Plumbing &amp; heating</span></div>
            <div className="clear-content"><div><span className="clear-location">Godalming &amp; nearby towns</span><strong>Plumbing.<br />Properly done.</strong><p>Leaks. Boilers. Bathrooms.</p><span className="clear-contact">Request a quote <span>↗</span></span></div><div className="clear-photo"><Image src="/example/bathroom.jpg" alt="" fill sizes="(max-width: 759px) 40vw, 260px" /><span>See the work</span></div></div>
          </div>
          <p className="clarity-takeaway">Services, work and a clear way to get in touch. All in view.</p>
        </div>
      </div>
      <p className="clarity-disclosure">Illustrative comparison · same fictional business. <a href="/direction/alderton">Explore Alderton <span aria-hidden="true">↗</span></a></p>
    </fieldset>
  );
}
