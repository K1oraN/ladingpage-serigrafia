export function ContactCTA({ contact, buttonText, whatsappLink }) {
  return (
    <section className="contact-cta" id="contato">
      <div>
        <span className="section-kicker">Orçamento rápido</span>
        <h2>{contact.title}</h2>
        <p>{contact.text}</p>
      </div>
      <a className="primary-button light" href={whatsappLink} target="_blank" rel="noreferrer">
        {buttonText}
      </a>
    </section>
  )
}
