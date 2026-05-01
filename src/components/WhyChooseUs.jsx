export function WhyChooseUs({ items }) {
  return (
    <section className="section why-section">
      <div className="section-heading centered">
        <span className="section-kicker">Por que escolher a gente</span>
        <h2>Processo claro do briefing até a entrega</h2>
      </div>

      <div className="why-grid">
        {items.map((item, index) => (
          <article className="why-card" key={item.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
