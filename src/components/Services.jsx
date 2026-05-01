export function Services({ services }) {
  return (
    <section className="section services-section" id="servicos">
      <div className="section-heading centered">
        <span className="section-kicker">O que fazemos</span>
        <h2>Soluções para marcas, eventos e empresas</h2>
      </div>

      <div className="cards-grid">
        {services.map((service, index) => (
          <article className="service-card" key={`${service}-${index}`}>
            <span className="service-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{service}</h3>
            <p>Produção personalizada com visual consistente e acabamento profissional.</p>
          </article>
        ))}
      </div>
    </section>
  )
}
