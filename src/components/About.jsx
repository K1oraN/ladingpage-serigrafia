export function About({ about }) {
  return (
    <section className="section about-section" id="sobre">
      <div className="section-heading">
        <span className="section-kicker">Sobre a empresa</span>
        <h2>{about.title}</h2>
      </div>

      <div className="about-grid">
        <p>{about.text}</p>
        <div className="about-highlights" aria-label="Diferenciais em números">
          <div>
            <strong>250+</strong>
            <span>projetos entregues</span>
          </div>
          <div>
            <strong>6</strong>
            <span>linhas de produção</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>orçamento sob medida</span>
          </div>
        </div>
      </div>
    </section>
  )
}
